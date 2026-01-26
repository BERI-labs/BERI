# Refactor Command

Refactor the following: $ARGUMENTS

## Refactoring Principles

### Before Starting
1. Ensure all tests pass (if they exist)
2. Commit current state
3. Understand the full context of the code

### During Refactoring

#### Code Quality Checks
- [ ] Remove unused imports
- [ ] Remove unused variables
- [ ] Remove commented-out code
- [ ] Simplify complex conditionals
- [ ] Extract repeated code into functions
- [ ] Ensure consistent naming conventions

#### Performance Checks
- [ ] Avoid unnecessary re-renders in React
- [ ] Memoize expensive calculations
- [ ] Check for memory leaks (event listeners, subscriptions)

#### Type Safety Checks
- [ ] No `any` types unless absolutely necessary
- [ ] All function parameters typed
- [ ] All return types explicit

#### Readability Checks
- [ ] Functions are < 50 lines
- [ ] Components are < 150 lines
- [ ] Complex logic has comments explaining "why"
- [ ] Variable names are descriptive

### After Refactoring
1. Run TypeScript compiler - no errors
2. Run the app - verify functionality unchanged
3. Run tests if available
4. Review the diff to ensure changes are minimal

## BERI-Specific Refactoring

### Common Improvements
- Extract WebGPU check into reusable utility
- Consolidate error handling patterns
- Simplify state management in App.tsx
- Improve loading state granularity

### Do Not Change
- Model IDs (must match exactly)
- Chunk format (preprocessing depends on it)
- IndexedDB schema (would break existing caches)
- Public API of lib/ functions (components depend on them)
