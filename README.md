BERI Instructions for Claude Code 

This folder is the source-of-truth instruction set to build BERI (Bespoke Education Retrieval Infrastructure): a fully browser-based, on-device RAG chatbot that answers questions about Haberdashers’ Schools policies with source citations. 

File Structure 

beri-instructions/ 

├── README.md                 # This file 

├── 0_vision.md               # Project purpose and north star 

├── 1_user_profile.md         # Target user definition 

├── 2_success_metrics.md      # Success criteria and test queries 

├── 3_technical_spec.md       # Architecture and technical details 

├── 4_implementation_guide.md # Step-by-step build instructions 

├── CLAUDE.md                 # AI behaviour rules for Claude Code 

└── commands/                 # Reusable prompt templates 

    ├── test.md               # Generate tests 

    ├── debug.md              # Debug issues 

    ├── refactor.md           # Refactor code 

    ├── component.md          # Create new components 

    ├── feature.md            # Implement new features 

    └── deploy.md             # Deploy the application 

 

Read order for instructions 

Read these files in order and treat them as authoritative: 

1. `0_vision.md` — purpose, principles, non-goals 

2. `1_user_profile.md` — target user, primary use cases 

3. `2_success_metrics.md` — definition of done, evaluation queries 

4. `3_technical_spec.md` — architecture, data flow, components 

5. `CLAUDE.md` — behavioural rules (must follow) 

6. `4_implementation_guide.md` — step-by-step build plan 

  

If any files conflict: 

1) `CLAUDE.md` overrides behaviour/process rules 

2) `3_technical_spec.md` overrides architecture decisions 

3) `4_implementation_guide.md` overrides build steps 

4) `2_success_metrics.md` overrides acceptance criteria 

Start building following the implementation guide 

 

Working protocols (follow exactly) 

For any task: 

1. Restate the change in one sentence. 

2. List impacted components/files. 

3. Implement the smallest viable change. 

4. Run/execute the relevant checks described in `2_success_metrics.md`. 

5. Report results with: what changed, how tested, what remains. 

  

When you add or change functionality, update documentation: 

- If architecture changes → update `3_technical_spec.md` 

- If build steps change → update `4_implementation_guide.md` 

- If success criteria change → update `2_success_metrics.md` 

 

Using Commands 

Use these command templates as needed (located in `commands/`): 

/test [what to test] 

/debug [issue description] 

/refactor [what to refactor] 

/component [component name and description] 

/feature [feature description] 

/deploy [deployment target] 

 

Prefer `/test` before marking anything as complete. 

 

Project Overview 

BERI is a fully browser-based RAG chatbot that: 

Answers questions about Habs school policies 

Runs entirely on the user's device (no backend) 

Uses WebLLM for local language model inference 

Provides source citations for all answers 

 

Non-negotiable constraints 

Zero backend (fully client-side) 

Zero API calls after model download 

Privacy-first: no data leaves device during normal use 

Target environment: Microsoft Edge on Surface Pro 

Typical response time target: < 15 seconds 

Every answer must provide source citations (or explicitly say when it cannot) 

 

Token efficiency rules: 

 

To minimise token usage and keep diffs clean: 

Do not add new code comments (inline, block, or docstrings) unless a comment is strictly necessary to prevent misuse or clarify a non-obvious invariant. 

Do not “commentary refactor” (adding explanatory comments without changing behaviour). 

Prefer self-explanatory naming (functions, variables, components) over comments. 

Prefer small, focused functions and clear structure over annotated logic. 

If documentation is needed, update the relevant markdown files in this folder (e.g., 3_technical_spec.md or 4_implementation_guide.md) instead of adding comments in code. 

Exception (allowed): 

Short, essential comments for security/privacy invariants, non-obvious edge cases, or interop constraints where misunderstanding would cause defects. 

 

Timeline 

Date 

Milestone 

Jan 21 

Spec finalised ✓ 

Jan 22-23 

Core implementation 

Jan 24 

Integration and testing 

Jan 25 

Polish and bug fixes 

Jan 26 

Demo ready 

Getting Help 

If you get stuck: 

Check 4_implementation_guide.md for troubleshooting 

Use /debug [issue] command 

Review error messages carefully 

Check browser console for details 

Authors 

Ravjoth Brar 

Énora Hauduc 

 

Project for Haberdashers' Schools - Centre for Innovation 