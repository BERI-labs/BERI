# Deploy Command

Prepare and deploy BERI: $ARGUMENTS

## Pre-Deployment Checklist

### Code Quality
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No console.log statements in production code
- [ ] All TODO comments resolved
- [ ] Error handling in place

### Functionality
- [ ] All 20 test queries work correctly
- [ ] Loading states display properly
- [ ] Error states display properly
- [ ] WebGPU fallback message works

### Performance
- [ ] Production build completes: `npm run build`
- [ ] Build size is reasonable (check dist/ folder)
- [ ] Initial load time acceptable

### Assets
- [ ] BERI logo in place (`public/beri-logo.png`)
- [ ] Favicon set
- [ ] Meta tags configured in index.html

## Build Commands

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

## GitHub Pages Deployment

### Option 1: Manual
1. Build the project: `npm run build`
2. Copy `dist/` contents to GitHub Pages branch
3. Push to repository

### Option 2: GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Option 3: Vite GitHub Pages Plugin
Add to `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/beri/', // Replace with your repo name
  // ... rest of config
})
```

## Post-Deployment Verification

- [ ] Site loads at deployed URL
- [ ] Models download successfully
- [ ] Queries return results
- [ ] Mobile view works
- [ ] No console errors

## Rollback Plan

If deployment fails:
1. Revert to previous commit: `git revert HEAD`
2. Redeploy previous version
3. Investigate issue in development

## Environment Notes

### GitHub Pages Limitations
- Static files only (no server-side code) ✓ BERI is fully static
- Custom headers not supported without workarounds
- HTTPS enforced (good for security)

### CORS Considerations
Models are loaded from CDN (MLC AI / Hugging Face) which have proper CORS headers. No additional configuration needed.

### SharedArrayBuffer
Some ML libraries require SharedArrayBuffer. If you see related errors:
1. This requires specific headers that GitHub Pages doesn't support
2. Consider using Vercel, Netlify, or Cloudflare Pages instead
3. Or use a service worker to add required headers
