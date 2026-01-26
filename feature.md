# Feature Implementation Command

Implement feature: $ARGUMENTS

## Feature Development Protocol

### Step 1: Understand Requirements
Before writing any code:
1. What is the user trying to accomplish?
2. What does success look like?
3. What are the acceptance criteria?
4. Are there edge cases to consider?

### Step 2: Plan Implementation
Outline the approach:
1. Which files need to be modified?
2. Which new files need to be created?
3. What is the order of changes?
4. What could go wrong?

### Step 3: Implement Incrementally
Build in small, testable pieces:
1. Start with the simplest working version
2. Test after each change
3. Add complexity only when needed
4. Commit at logical checkpoints

### Step 4: Verify
- [ ] Feature works as expected
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Existing functionality still works
- [ ] Mobile responsive (if UI change)

## Feature Categories

### UI Features
- Follow existing component patterns
- Use Tailwind CSS
- Match BERI design system
- Ensure accessibility

### Logic Features
- Add to appropriate lib/ file
- Maintain type safety
- Handle errors gracefully
- Add comments for complex logic

### Performance Features
- Measure before and after
- Don't optimise prematurely
- Consider mobile devices

## BERI-Specific Guidance

### Adding New Policy Documents
1. Add text file to `policies/` folder
2. Update preprocessing script if needed
3. Run `npm run preprocess`
4. Update suggested questions if relevant

### Modifying System Prompt
1. Edit `src/lib/constants.ts`
2. Test with various queries
3. Check citation format still works

### Adding New Suggested Questions
1. Edit `SUGGESTED_QUESTIONS` in constants.ts
2. Ensure questions are answered by current policies
3. Keep to 4-5 questions max

### Improving Retrieval
1. Adjust `TOP_K_CHUNKS` or `SIMILARITY_THRESHOLD`
2. Test with edge case queries
3. Balance precision vs recall

## Output Format

After implementing, provide:
1. Summary of changes made
2. Files modified/created
3. How to test the feature
4. Any known limitations
