# Debug Command

Investigate and fix: $ARGUMENTS

## Debugging Protocol

### Step 1: Reproduce
- Identify exact steps to reproduce the issue
- Note any error messages in console
- Check network tab for failed requests

### Step 2: Hypothesise
Generate 3-5 hypotheses for what might be causing the issue:
1. [Hypothesis 1]
2. [Hypothesis 2]
3. [Hypothesis 3]

### Step 3: Investigate
For each hypothesis:
- Read ALL related code files thoroughly
- Check for obvious issues (typos, wrong imports, missing awaits)
- Add console.log statements to trace execution flow
- Verify data shapes match expected types

### Step 4: Root Cause
Identify the actual root cause, not just symptoms.

### Step 5: Fix
Implement the fix with:
- Minimal changes to existing code
- Proper error handling
- No side effects on working functionality

### Step 6: Verify
- Confirm the fix resolves the issue
- Test related functionality still works
- Check for any new console errors

## Common BERI Issues

### WebGPU
- `navigator.gpu` is undefined → Browser doesn't support WebGPU
- `requestAdapter()` returns null → No GPU available or drivers outdated

### Models
- Model ID mismatch → Check exact string matches
- Download fails → Network or CORS issues

### Retrieval
- No chunks returned → Check similarity threshold
- Wrong chunks returned → Verify embeddings are correct

### UI
- Component not updating → Check state updates correctly
- Infinite loop → Check useEffect dependencies
