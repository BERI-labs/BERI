# BERI Success Metrics

## Target Level
**MVP Demo** - A working demonstration that proves the concept works and can be shown to school leadership for buy-in.

---

## Core Success Criteria

### 1. Functional Requirements

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Query Success Rate | 90% of test queries return relevant answers | Test with 20 predefined policy questions |
| Source Accuracy | 100% of citations match actual policy content | Manual verification of sources |
| Error Handling | Zero crashes during demo | Run through all test scenarios |
| Browser Support | Works in Microsoft Edge | Test on Surface Pro with Edge |

### 2. Performance Requirements

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Time to First Token | <3 seconds | Stopwatch from query submit |
| Full Response Time | <15 seconds | Stopwatch from query to complete response |
| Initial Load (cached) | <5 seconds | After first visit with models cached |
| Initial Load (fresh) | <60 seconds | First visit, downloading ~200MB models |
| Token Generation | 15-25 tokens/second | Count output tokens / time |

### 3. User Experience Requirements

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Zero-Instruction Usability | User can ask first question without help | Observe 3 test users |
| Task Completion | 80% of users find answer without help | User testing |
| Comprehension | Users understand the answer | Ask users to explain back |
| Trust | Users find citations helpful | Post-test survey |

---

## Test Query Suite

These 20 queries must all return accurate, sourced answers:

### E-Safety Policy
1. "Can I use my phone at school?"
2. "What happens if I'm caught with my phone out in class?"
3. "Who is the Designated Safeguarding Lead?"
4. "Can I take photos at school?"
5. "What should I do if I see cyberbullying?"

### Academic Integrity Policy
6. "Can I use ChatGPT for my homework?"
7. "What counts as plagiarism?"
8. "What happens if I plagiarise?"
9. "Can I use AI to check my spelling and grammar?"
10. "Do I need to cite AI tools I used?"

### Acceptable Use Policy - Students
11. "Can I share my password with my friend?"
12. "What websites am I not allowed to visit?"
13. "Can I use school WiFi for personal stuff?"
14. "What happens if I break the IT rules?"
15. "Can I download games on my school laptop?"

### Data Protection Policy
16. "Who can see my personal data?"
17. "What is personal data?"
18. "How long does the school keep my data?"
19. "Can I ask to see what data the school has about me?"
20. "What happens if there's a data breach?"

### Edge Cases (Should Gracefully Decline)
21. "What's the meaning of life?" → Should say not in policies
22. "Write my essay for me" → Should decline and redirect
23. "What's the WiFi password?" → Should say not in policies
24. "Who is the headteacher?" → May or may not be in policies

---

## Validation Method

### Pre-Demo Testing
- [ ] All 20 core test queries return accurate answers
- [ ] All citations are verifiable in source documents
- [ ] Response times measured and logged
- [ ] Tested on target hardware (Surface Pro + Edge)
- [ ] Tested WebGPU error handling on incompatible browser

### Demo Day Validation
- [ ] Live demonstration with unrehearsed questions
- [ ] At least 3 stakeholders observe
- [ ] Record any failures or unexpected behaviour
- [ ] Collect qualitative feedback

### Post-Demo Assessment
- [ ] Document what worked and what didn't
- [ ] List improvements needed for production
- [ ] Gather stakeholder feedback on value proposition

---

## Definition of Done

The demo is **complete** when:

1. ✅ App loads successfully on Surface Pro with Edge
2. ✅ Loading screen shows progress while models download
3. ✅ User can type a question and receive a streaming response
4. ✅ Response includes inline citations and source list
5. ✅ All 20 test queries pass accuracy check
6. ✅ Average response time is under 15 seconds
7. ✅ No crashes during 30-minute demo session
8. ✅ WebGPU error shows helpful message if browser unsupported

---

## Success Metrics Summary

```
┌─────────────────────────────────────────────────────────┐
│                    BERI SUCCESS CRITERIA                │
├─────────────────────────────────────────────────────────┤
│  FUNCTIONAL                                             │
│  ├── 90% query accuracy                                │
│  ├── 100% citation accuracy                            │
│  └── Zero crashes                                      │
├─────────────────────────────────────────────────────────┤
│  PERFORMANCE                                            │
│  ├── <3s time to first token                           │
│  ├── <15s full response                                │
│  └── 15-25 tokens/second                               │
├─────────────────────────────────────────────────────────┤
│  USER EXPERIENCE                                        │
│  ├── Zero-instruction usability                        │
│  ├── 80% task completion                               │
│  └── Clear, trustworthy citations                      │
└─────────────────────────────────────────────────────────┘
```

---

## Timeline

| Date | Milestone |
|------|-----------|
| Jan 21 | Technical spec finalised |
| Jan 22-23 | Core implementation |
| Jan 24 | Integration and testing |
| Jan 25 | Polish and bug fixes |
| Jan 26 | **Demo ready** |
