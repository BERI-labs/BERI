# CLAUDE.md - Project Guidelines for Claude Code

## Project Overview
BERI (Bespoke Education Retrieval Infrastructure) is a fully browser-based RAG chatbot for querying Haberdashers' School policies. It runs entirely client-side with zero backend dependencies.

## Target User
Secondary school students (ages 11-18) and staff who need quick answers to policy questions. Users expect speed, simplicity, and trustworthy answers with clear source citations.

## Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Embeddings**: @xenova/transformers (all-MiniLM-L6-v2)
- **LLM**: @mlc-ai/web-llm (SmolLM2-360M-Instruct-q4f16_1-MLC)
- **Storage**: IndexedDB via idb library
- **Target Browser**: Microsoft Edge with WebGPU

## Coding Standards

### TypeScript
- Use TypeScript for ALL files (no `.js` files)
- Define interfaces for all data structures in `src/types/index.ts`
- Use strict mode (`"strict": true` in tsconfig)
- Prefer `const` over `let`, never use `var`
- Use explicit return types for functions

### React
- Use functional components exclusively (no class components)
- Use hooks for state management (useState, useEffect, useCallback, useRef)
- Keep components small and focused (max ~150 lines)
- Separate business logic from UI components
- Use the `@/` path alias for imports

### Styling
- Use Tailwind CSS utility classes exclusively
- Follow mobile-first responsive design
- Use the custom `habs` colour palette defined in tailwind.config.js
- No inline styles or separate CSS files (except index.css for base styles)

### Naming Conventions
- **Components**: PascalCase (e.g., `MessageBubble.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `useEmbeddings.ts`)
- **Types/Interfaces**: PascalCase (e.g., `interface Message`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_TOKENS`)
- **Files**: Match the default export name

### Comments
- Add comments for complex business logic
- Document "why" not "what"
- Add JSDoc comments for exported functions
- No commented-out code in final implementation

## Architecture Principles

### Separation of Concerns
```
src/
├── components/     # UI only - no business logic
├── lib/            # Business logic - no UI
├── types/          # Type definitions only
└── data/           # Static data (chunks.json)
```

### Error Handling
- Wrap async operations in try-catch
- Show user-friendly error messages
- Log technical details to console
- Never let the app crash - always recover gracefully

### State Management
- Use React state for UI state
- Use IndexedDB for persistent data (chunks)
- Keep state as local as possible
- Lift state only when necessary

## AI Instructions

### Code Generation
- Always generate complete, working code blocks (no placeholders like `// ... rest of code`)
- Include all imports at the top of files
- Ensure code compiles without TypeScript errors
- Test that components render without runtime errors

### Problem Solving
- Start with the simplest solution that works
- Only add complexity when specifically requested
- Highlight potential issues or edge cases
- Suggest testing approaches for new features

### When Modifying Existing Code
- Read the entire file before making changes
- Maintain existing patterns and styles
- Don't change unrelated code
- Preserve all existing functionality unless told otherwise

### Communication
- Explain architectural decisions briefly
- Ask clarifying questions if requirements are ambiguous
- Flag when you're making assumptions
- Offer alternatives when multiple approaches exist

## Constraints

### Must Do
- All processing must happen in the browser (no backend calls)
- Use British English in all user-facing text (colour, behaviour, organisation)
- Responses must cite source documents
- Handle WebGPU unavailability gracefully with clear error messages

### Must NOT Do
- No external API calls after initial model download
- No data collection, analytics, or telemetry
- No localStorage for sensitive data
- No dependencies not listed in package.json
- No polyfills or IE/legacy browser support

### Performance Requirements
- Time to first token: <3 seconds
- Full response: <15 seconds
- Initial load (cached): <5 seconds

## Testing Requirements

### Manual Testing Checklist
- [ ] Loading screen shows progress
- [ ] WebGPU error displays correctly
- [ ] Suggested questions work
- [ ] User messages appear correctly
- [ ] Assistant responses stream properly
- [ ] Sources display after response
- [ ] Works in Microsoft Edge

### Test Queries to Verify
1. "Can I use my phone at school?"
2. "Can I use ChatGPT for my homework?"
3. "What happens if I plagiarise?"
4. "Who can see my personal data?"

## File Templates

### New Component Template
```typescript
interface Props {
  // Define props here
}

export function ComponentName({ prop1, prop2 }: Props) {
  return (
    <div className="...">
      {/* Component content */}
    </div>
  )
}
```

### New Utility Template
```typescript
/**
 * Description of what this function does
 * @param param - Description of parameter
 * @returns Description of return value
 */
export async function utilityName(param: Type): Promise<ReturnType> {
  // Implementation
}
```

## Common Gotchas

### WebLLM
- Model ID must match exactly: `SmolLM2-360M-Instruct-q4f16_1-MLC`
- Always check `navigator.gpu` before initialising
- Use streaming for better UX

### Transformers.js
- Exclude from Vite optimizeDeps: `exclude: ['@xenova/transformers']`
- Warm up with a dummy embed call after loading

### IndexedDB
- Always check if database is initialised before operations
- Handle missing data gracefully

### Vite
- Use `esnext` build target for WebGPU compatibility
- May need CORS headers for SharedArrayBuffer

## Questions to Ask Before Starting

If any of these are unclear, ask before implementing:
1. What is the exact expected behaviour?
2. What should happen in error cases?
3. Are there performance constraints?
4. Does this affect other components?
5. Is there a specific design requirement?
