# New Component Command

Create a new React component: $ARGUMENTS

## Component Template

```typescript
import { useState, useCallback } from 'react'

interface ComponentNameProps {
  // Define all props with types
  prop1: string
  prop2?: number
  onAction?: (value: string) => void
}

/**
 * ComponentName - Brief description
 * 
 * @param prop1 - Description
 * @param prop2 - Description (optional)
 * @param onAction - Callback description
 */
export function ComponentName({ 
  prop1, 
  prop2 = defaultValue, 
  onAction 
}: ComponentNameProps) {
  // State declarations
  const [state, setState] = useState<Type>(initialValue)
  
  // Callbacks
  const handleAction = useCallback(() => {
    // Implementation
    onAction?.(value)
  }, [onAction])
  
  // Render
  return (
    <div className="...">
      {/* Component content */}
    </div>
  )
}
```

## Requirements Checklist

### Structure
- [ ] Interface defined for all props
- [ ] Default values for optional props
- [ ] JSDoc comment explaining purpose
- [ ] Functional component with hooks

### Styling
- [ ] Tailwind CSS classes only
- [ ] Mobile-first responsive design
- [ ] Uses `habs` colour palette where appropriate
- [ ] Consistent spacing with rest of app

### Accessibility
- [ ] Proper semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Focus states visible

### BERI Design System
- Primary colour: `habs-navy` (#1e3a5f)
- Accent colour: `habs-gold` (#c9a227)
- Font: Inter (via Tailwind sans)
- Border radius: `rounded-lg` or `rounded-xl`
- Shadows: `shadow-md` for cards, `shadow-sm` for buttons
- Animations: `animate-fade-in`, `animate-slide-up`

## File Location
Save to: `src/components/ComponentName.tsx`

## After Creation
1. Export from component (already done with named export)
2. Import in parent component
3. Test rendering
4. Verify no TypeScript errors
