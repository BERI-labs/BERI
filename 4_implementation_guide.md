# BERI Implementation Guide

> **For Claude Code**: This document provides step-by-step implementation instructions. Follow each step in order. Confirm completion of each major step before proceeding.

---

## Pre-Implementation Checklist

Before starting, ensure you have:
- [ ] Read `0_vision.md` - Understand the project purpose
- [ ] Read `1_user_profile.md` - Know who you're building for
- [ ] Read `2_success_metrics.md` - Know what success looks like
- [ ] Read `3_technical_spec.md` - Understand the architecture
- [ ] Read `CLAUDE.md` - Follow the coding standards

---

## Phase 1: Project Setup

### Step 1.1: Create Vite Project
```bash
npm create vite@latest beri -- --template react-ts
cd beri
```

### Step 1.2: Install Dependencies
```bash
npm install @mlc-ai/web-llm @xenova/transformers idb
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

### Step 1.3: Create Configuration Files

Create/update these files with the content from `3_technical_spec.md`:
- `package.json`
- `vite.config.ts`
- `tailwind.config.js`
- `tsconfig.json`
- `tsconfig.node.json`
- `postcss.config.js`
- `index.html`

### Step 1.4: Create Directory Structure
```bash
mkdir -p src/components src/lib src/types src/data scripts policies public
```

**Checkpoint**: Run `npm run dev` - should start without errors (may show blank page).

---

## Phase 2: Core Types and Constants

### Step 2.1: Create Type Definitions
Create `src/types/index.ts` with interfaces for:
- `Chunk` and `ChunkMetadata`
- `ScoredChunk`
- `Message` and `MessageSource`
- `LoadingState`

### Step 2.2: Create Constants
Create `src/lib/constants.ts` with:
- Model names (`EMBEDDING_MODEL`, `LLM_MODEL`)
- Retrieval settings (`TOP_K_CHUNKS`, `SIMILARITY_THRESHOLD`)
- Generation settings (`MAX_TOKENS`, `TEMPERATURE`)
- Suggested questions array
- Default system prompt (placeholder - user will provide custom)

### Step 2.3: Create Vite Environment Types
Create `src/vite-env.d.ts` for JSON module declarations.

**Checkpoint**: TypeScript should compile without errors.

---

## Phase 3: Core Libraries

### Step 3.1: Storage Layer
Create `src/lib/storage.ts`:
- `initStorage()` - Initialize IndexedDB
- `loadChunksFromJSON()` - Load chunks from bundled JSON
- `getAllChunks()` - Retrieve all chunks

### Step 3.2: Embeddings Layer
Create `src/lib/embeddings.ts`:
- `initEmbeddings(onProgress)` - Load Transformers.js model
- `embed(text)` - Generate embedding for query

### Step 3.3: LLM Layer
Create `src/lib/llm.ts`:
- `initLLM(onProgress)` - Load WebLLM model
- `generate(systemPrompt, context, query, onToken)` - Stream response

### Step 3.4: Retrieval Layer
Create `src/lib/retrieval.ts`:
- `cosineSimilarity(a, b)` - Calculate similarity
- `retrieveContext(query)` - Find relevant chunks
- `formatContext(chunks)` - Format for prompt
- `extractSources(chunks)` - Extract citation info

**Checkpoint**: All library files should compile without errors.

---

## Phase 4: React Components

### Step 4.1: LoadingScreen Component
Create `src/components/LoadingScreen.tsx`:
- Shows BERI branding
- Progress bar with percentage
- Current loading stage text
- Error state with retry button
- Browser requirement note

### Step 4.2: Header Component
Create `src/components/Header.tsx`:
- BERI logo (with fallback)
- Title and subtitle
- Status indicator (ready/loading)

### Step 4.3: SuggestedQuestions Component
Create `src/components/SuggestedQuestions.tsx`:
- Buttons for each suggested question
- Disabled state during streaming
- Calls onSelect when clicked

### Step 4.4: MessageBubble Component
Create `src/components/MessageBubble.tsx`:
- User messages (right-aligned, navy)
- Assistant messages (left-aligned, white)
- Streaming cursor indicator
- Source citations below assistant messages
- Timestamp

### Step 4.5: ChatContainer Component
Create `src/components/ChatContainer.tsx`:
- Empty state with welcome message and suggested questions
- Scrollable message list
- Auto-scroll on new messages

### Step 4.6: InputArea Component
Create `src/components/InputArea.tsx`:
- Text input field
- Send button
- Disabled state during streaming
- Enter key submission
- Loading spinner in button

**Checkpoint**: All components should render without errors when imported.

---

## Phase 5: Main Application

### Step 5.1: Create App Component
Create `src/App.tsx`:
1. WebGPU compatibility check
2. Initialisation sequence:
   - Check WebGPU
   - Init storage
   - Load chunks
   - Init embeddings
   - Init LLM
3. Message state management
4. Query submission handler:
   - Add user message
   - Retrieve context
   - Stream response
   - Update with sources
5. Render loading screen or chat UI

### Step 5.2: Create Entry Point
Create `src/main.tsx`:
- Render App in StrictMode

### Step 5.3: Create Global Styles
Create `src/index.css`:
- Import Inter font
- Tailwind directives
- Custom scrollbar styles

**Checkpoint**: App should load, show loading screen, and (with placeholder data) show chat UI.

---

## Phase 6: Placeholder Data

### Step 6.1: Create Placeholder Chunks
Create `src/data/chunks.json` with minimal placeholder:
```json
[
  {
    "id": "placeholder-0",
    "content": "This is placeholder content. Run preprocessing to generate real chunks.",
    "embedding": [0.1, 0.2, 0.3],
    "metadata": {
      "source": "Placeholder",
      "section": "Getting Started",
      "chunkIndex": 0
    }
  }
]
```

**Checkpoint**: App should fully load and be interactive (with placeholder responses).

---

## Phase 7: Preprocessing Script

### Step 7.1: Create Preprocessing Script
Create `scripts/preprocess.ts`:
1. Read policy text files from `./policies/`
2. Split into sections by headers
3. Chunk into ~500 char segments with 100 char overlap
4. Generate embeddings using Transformers.js
5. Save to `src/data/chunks.json`

**Checkpoint**: Script should run and generate chunks.json when policy files are present.

---

## Phase 8: Final Integration

### Step 8.1: Add Assets
- Place `beri-logo.png` in `public/`

### Step 8.2: Add Policy Files
Create text files in `policies/`:
- `e-safety.txt`
- `data-protection.txt`
- `acceptable-use.txt`
- `academic-integrity.txt`

### Step 8.3: Run Preprocessing
```bash
npm run preprocess
```

### Step 8.4: Test Full Flow
```bash
npm run dev
```

Test all 20 queries from `2_success_metrics.md`.

---

## Phase 9: Build and Deploy

### Step 9.1: Production Build
```bash
npm run build
```

### Step 9.2: Test Production Build
```bash
npm run preview
```

### Step 9.3: Deploy
Deploy `dist/` folder to GitHub Pages or static host.

---

## Verification Checklist

### Functional
- [ ] Loading screen shows progress
- [ ] WebGPU error shows if unsupported
- [ ] Models download and cache
- [ ] Welcome screen with suggested questions
- [ ] User messages display correctly
- [ ] Responses stream token by token
- [ ] Sources shown below responses
- [ ] Session memory works within tab

### Performance
- [ ] Cached load < 5 seconds
- [ ] Time to first token < 3 seconds
- [ ] Full response < 15 seconds

### Compatibility
- [ ] Works in Microsoft Edge
- [ ] Works on Surface Pro
- [ ] Responsive on different screen sizes

---

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| WebGPU not available | Use Edge/Chrome 113+, update graphics drivers |
| Model download fails | Check network, clear cache, retry |
| TypeScript errors | Run `npm install`, check paths |
| Slow responses | Verify WebGPU active, check RAM |
| Chunks not loading | Run preprocessing script |
| CORS errors | Add headers to vite.config.ts |
