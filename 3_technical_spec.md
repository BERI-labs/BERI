# BERI Technical Specification

## Architecture Overview

BERI is a **fully client-side RAG (Retrieval-Augmented Generation) application** that runs entirely in the browser with zero backend dependencies.

```
┌────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │   React UI   │───▶│  Retrieval   │───▶│   WebLLM     │     │
│  │              │    │   Engine     │    │   (SmolLM2)  │     │
│  └──────────────┘    └──────────────┘    └──────────────┘     │
│         │                   │                    │             │
│         │            ┌──────▼──────┐             │             │
│         │            │ Transformers│             │             │
│         │            │     .js     │             │             │
│         │            │ (Embeddings)│             │             │
│         │            └─────────────┘             │             │
│         │                   │                    │             │
│         │            ┌──────▼──────┐             │             │
│         └───────────▶│  IndexedDB  │◀────────────┘             │
│                      │  (Chunks)   │                           │
│                      └─────────────┘                           │
│                                                                │
└────────────────────────────────────────────────────────────────┘
                              │
                              │ First load only (~200MB)
                              ▼
                    ┌──────────────────┐
                    │   CDN / Cache    │
                    │  (Model Files)   │
                    └──────────────────┘
```

---

## Data Flow

```
USER QUERY: "Can I use ChatGPT for homework?"
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: EMBED QUERY                                         │
│   Transformers.js (all-MiniLM-L6-v2)                        │
│   Input: "Can I use ChatGPT for homework?"                  │
│   Output: [0.023, -0.145, 0.089, ...] (384 dimensions)      │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: RETRIEVE CHUNKS                                     │
│   For each chunk in IndexedDB:                              │
│     score = cosineSimilarity(queryVector, chunkVector)      │
│   Sort by score, return top 4 chunks                        │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: BUILD PROMPT                                        │
│   System: "You are BERI..."                                 │
│   User: "CONTEXT: [chunk1] [chunk2] [chunk3] [chunk4]       │
│          QUESTION: Can I use ChatGPT for homework?"         │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: GENERATE RESPONSE                                   │
│   WebLLM (SmolLM2-360M-Instruct)                            │
│   Stream tokens back to UI                                  │
│   Display with source citations                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.3.0 | Type safety |
| Vite | 5.0.0 | Build tool |
| Tailwind CSS | 3.4.0 | Styling |

### AI/ML Libraries
| Technology | Version | Purpose | Size |
|------------|---------|---------|------|
| @mlc-ai/web-llm | 0.2.46 | Browser LLM inference | - |
| @xenova/transformers | 2.17.0 | Embeddings | ~22MB |
| SmolLM2-360M-Instruct | q4f16_1 | Language model | ~200MB |
| all-MiniLM-L6-v2 | - | Embedding model | ~22MB |

### Storage
| Technology | Purpose |
|------------|---------|
| IndexedDB (via idb) | Chunk storage and caching |
| Browser Cache | Model file caching |

### Why These Choices?

**SmolLM2-360M-Instruct** (not Qwen2.5-0.5B):
- Smaller download (~200MB vs ~360MB)
- Faster time-to-first-token
- Sufficient quality for RAG (model just rephrases context)
- Optimised for instruction following

**all-MiniLM-L6-v2** for embeddings:
- Excellent quality/size tradeoff
- 384 dimensions (good balance)
- Fast inference
- Well-tested with Transformers.js

**Pre-embedded chunks** (not runtime embedding):
- Policies are static - no need to embed at runtime
- Faster initial load
- Smaller runtime memory footprint
- Simpler architecture

---

## File Structure

```
beri/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
│
├── public/
│   └── beri-logo.png              # BERI logo (user provides)
│
├── src/
│   ├── main.tsx                   # Entry point
│   ├── App.tsx                    # Main app component
│   ├── index.css                  # Global styles
│   ├── vite-env.d.ts              # Vite type declarations
│   │
│   ├── components/
│   │   ├── Header.tsx             # App header with logo
│   │   ├── ChatContainer.tsx      # Message list container
│   │   ├── MessageBubble.tsx      # Individual message component
│   │   ├── InputArea.tsx          # Query input and send button
│   │   ├── SuggestedQuestions.tsx # Quick-ask buttons
│   │   └── LoadingScreen.tsx      # Initial loading UI
│   │
│   ├── lib/
│   │   ├── constants.ts           # Config, prompts, suggested questions
│   │   ├── storage.ts             # IndexedDB operations
│   │   ├── embeddings.ts          # Transformers.js wrapper
│   │   ├── llm.ts                 # WebLLM wrapper
│   │   └── retrieval.ts           # Cosine similarity search
│   │
│   ├── data/
│   │   └── chunks.json            # Pre-embedded policy chunks
│   │
│   └── types/
│       └── index.ts               # TypeScript interfaces
│
├── scripts/
│   └── preprocess.ts              # One-time chunking script
│
└── policies/                      # Raw policy text files
    ├── e-safety.txt
    ├── data-protection.txt
    ├── acceptable-use.txt
    └── academic-integrity.txt
```

---

## Chunking Strategy

### Configuration
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Chunk size | 500 characters | Balances context richness vs. retrieval precision |
| Chunk overlap | 100 characters | Prevents information loss at boundaries |
| Top-K retrieval | 4 chunks | Enough context without overwhelming the prompt |
| Similarity threshold | 0.3 | Filters out irrelevant chunks |

### Chunking Rules
1. **Respect section boundaries** - Don't split mid-section when possible
2. **Preserve headers** - Keep section titles with their content
3. **Break at sentences** - Prefer sentence boundaries over character limits
4. **Maintain metadata** - Track source document, section, and position

### Pre-processing Pipeline
```
Policy PDF → Extract Text → Split by Sections → Chunk → Embed → Save JSON
```

The output `chunks.json` contains:
```typescript
interface Chunk {
  id: string                    // "e-safety-policy-0"
  content: string               // "Students must not use mobile phones..."
  embedding: number[]           // [0.023, -0.145, ...] (384 dims)
  metadata: {
    source: string              // "E-Safety Policy"
    section: string             // "Mobile Phone Rules"
    chunkIndex: number          // 0
  }
}
```

---

## Browser Requirements

### Minimum Requirements
| Requirement | Specification |
|-------------|---------------|
| Browser | Chrome 113+ or Edge 113+ |
| WebGPU | Required for GPU acceleration |
| RAM | 4GB minimum |
| Storage | ~500MB for cached models |

### Compatibility Matrix
| Browser | WebGPU | Status |
|---------|--------|--------|
| Edge 113+ | ✅ | **Primary target** |
| Chrome 113+ | ✅ | Supported |
| Firefox | ⚠️ | Requires flag, experimental |
| Safari | ❌ | Not supported |
| Mobile browsers | ⚠️ | Limited WebGPU support |

### Fallback Behaviour
If WebGPU is unavailable:
1. Check `navigator.gpu` exists
2. Attempt to get adapter with `requestAdapter()`
3. If fails, show descriptive error message
4. Do NOT attempt CPU fallback (too slow for demo)

---

## Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial load (fresh) | <60s | First visit with model download |
| Initial load (cached) | <5s | Subsequent visits |
| Time to first token | <3s | From query submit to first character |
| Full response | <15s | From query submit to complete response |
| Token rate | 15-25 tok/s | During generation |

### Optimisation Strategies

1. **Pre-embedded chunks** - No runtime embedding of documents
2. **Warm-up embedding model** - Run dummy embed on init
3. **Streaming responses** - Show tokens as they generate
4. **IndexedDB caching** - Chunks loaded once, reused
5. **Model caching** - Browser caches model files after first download

---

## Security & Privacy

### Data Flow
- ✅ All processing happens in user's browser
- ✅ No data sent to external servers after initial model download
- ✅ No analytics or telemetry
- ✅ No user data collection
- ✅ Chat history not persisted (session only)

### Model Downloads
- Models downloaded from CDN (MLC AI / Hugging Face)
- Cached in browser storage
- No school data leaves the device

### Content Safety
- BERI only responds based on provided policy context
- Cannot generate arbitrary content
- Will decline questions outside policy scope

---

## Dependencies

### Production Dependencies
```json
{
  "@mlc-ai/web-llm": "^0.2.46",
  "@xenova/transformers": "^2.17.0",
  "idb": "^8.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.10.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0",
  "@vitejs/plugin-react": "^4.2.0",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.3.0",
  "vite": "^5.0.0"
}
```

---

## Deployment

### Target Platform
GitHub Pages (static hosting) or any static file server.

### Build Output
```bash
npm run build
# Outputs to dist/ folder
# Can be deployed to any static host
```

### Environment Requirements
- No environment variables required
- No server-side configuration
- Works from any HTTP server that can serve static files

### CORS Headers (if self-hosting)
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```
These may be needed for SharedArrayBuffer used by some ML libraries.
