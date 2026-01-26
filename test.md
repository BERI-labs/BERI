# Test Generation Command

Generate comprehensive tests for: $ARGUMENTS

## Test Categories Required

### 1. Unit Tests
- Core utility functions (cosineSimilarity, formatContext, extractSources)
- Storage operations
- Embedding generation
- Type validation

### 2. Component Tests
- Each component renders without errors
- Props are handled correctly
- User interactions work (clicks, input)
- Loading and error states display

### 3. Integration Tests
- Full query flow: input → embed → retrieve → generate → display
- WebGPU detection and error handling
- Model initialisation sequence

### 4. Edge Cases
- Empty query handling
- No relevant chunks found
- Network errors during model load
- Very long queries
- Special characters in queries

## Test Query Suite
Use these queries to verify RAG functionality:
1. "Can I use my phone at school?"
2. "Can I use ChatGPT for my homework?"
3. "What happens if I plagiarise?"
4. "Who can see my personal data?"
5. "What's the meaning of life?" (should gracefully decline)

## Output Format
- Use Jest or Vitest syntax
- Include setup and teardown
- Add meaningful test descriptions
- Group related tests
