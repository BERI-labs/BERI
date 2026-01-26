# Competitive Analysis & Design Patterns

## Existing Solutions Analysed

### 1. Microsoft Copilot (Current Habs Solution)
**What it does well:**
- Familiar Microsoft interface
- Integrates with Office 365
- Good general knowledge

**What it does poorly:**
- No access to school-specific policies
- Requires internet connection
- Data sent to external servers
- Can hallucinate policy information

**Key insight:** Copilot is good for general tasks but cannot be trusted for school-specific queries.

---

### 2. ChatGPT / Claude (General AI Assistants)
**What it does well:**
- Excellent natural language understanding
- Can follow complex instructions
- Good at summarisation

**What it does poorly:**
- No access to private documents
- Hallucination risk without RAG
- Requires API/subscription
- Privacy concerns for school data

**Key insight:** The conversation quality is excellent, but grounding in specific documents is essential for trust.

---

### 3. Traditional Search (Ctrl+F in PDFs)
**What it does well:**
- Exact match searching
- No hallucination - shows actual text
- Works offline
- Zero cost

**What it does poorly:**
- Requires knowing exact keywords
- Can't answer conceptual questions
- No synthesis across documents
- Poor user experience

**Key insight:** Keyword search is trustworthy but limited. RAG combines the trustworthiness of retrieval with the flexibility of natural language.

---

### 4. RAG-Based Enterprise Solutions (e.g., Glean, Notion AI)
**What it does well:**
- Grounds answers in actual documents
- Provides citations
- Natural language queries

**What it does poorly:**
- Requires server infrastructure
- Expensive enterprise pricing
- Data leaves the organisation
- Complex setup

**Key insight:** RAG is the right approach, but existing solutions are too expensive and complex for a school.

---

## Design Patterns to Adopt

### From ChatGPT/Claude
1. **Conversational interface** - Simple chat-style interaction
2. **Streaming responses** - Show tokens as they generate
3. **Markdown rendering** - Format responses nicely

### From Notion AI
1. **Source citations** - Always show where information comes from
2. **Contextual suggestions** - Help users know what to ask

### From Search Engines
1. **Instant results** - Fast response times
2. **Snippet previews** - Show relevant text excerpts

### From Mobile Apps
1. **Quick actions** - Suggested questions as buttons
2. **Simple onboarding** - No instructions needed

---

## Design Patterns to Avoid

### Complexity
- ❌ Multiple configuration options
- ❌ User accounts or login
- ❌ Settings pages
- ❌ File upload (policies are pre-loaded)

### Poor UX
- ❌ Loading spinners without progress
- ❌ Error messages without guidance
- ❌ Technical jargon in UI
- ❌ Tiny tap targets on mobile

### Trust Issues
- ❌ Answers without citations
- ❌ Overconfident responses
- ❌ Mixing facts with opinions

---

## Opportunity Gap

**What none of these tools do well:**

1. **Privacy + Natural Language** - Existing RAG tools require cloud processing. BERI runs entirely locally.

2. **School-Specific + Trustworthy** - General AI can't be trusted for policies. BERI only answers from verified documents.

3. **Free + Capable** - Enterprise solutions are expensive. BERI uses free, open-source models.

4. **Simple + Powerful** - Most AI tools have steep learning curves. BERI is just "type and ask".

---

## UI/UX Reference

### Colour Palette
```
Primary: #1e3a5f (Habs Navy)
Accent:  #c9a227 (Habs Gold)
Background: #f8fafc (Light gray)
Text: #1f2937 (Dark gray)
```

### Typography
```
Font: Inter (Google Fonts)
Heading: 600 weight
Body: 400 weight
```

### Layout
```
Mobile-first
Max width: 800px for content
Generous padding: 16-24px
```

### Interaction Patterns
```
- Single tap to submit
- Enter key sends message
- Suggested questions as pills
- Auto-scroll to new messages
- Visible loading states
```

---

## Screenshots Reference

For implementation, reference these UI patterns:

1. **ChatGPT** - Message bubble styling, streaming cursor
2. **Notion** - Citation styling, clean typography
3. **Arc Browser** - Minimal chrome, focus on content
4. **Linear** - Loading states, subtle animations
