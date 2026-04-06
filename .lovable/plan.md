

# Fix Admin Panel UI — Make Everything Readable

## Problem
The global CSS theme sets `--card` to dark purple (`262 45% 35%`), which means every `Card` component in the admin panel has a purple background. All admin text is `text-black`, making it nearly invisible on purple. The sidebar, form cards, and dashboard cards are all affected.

## Solution
Override the admin panel's color scheme so it uses a clean white/light-gray theme instead of the purple site theme. This is the cleanest approach — one change in the layout wrapper rather than touching every admin component.

## Changes

### 1. `src/components/admin/AdminLayout.tsx`
- Wrap the admin layout in a `div` with CSS custom properties overriding the card, background, and foreground colors to white/light values
- This scopes the fix to admin-only pages without affecting the public site

### 2. `src/index.css`
- Add an `.admin-theme` class that overrides CSS variables:
  - `--card: 0 0% 100%` (white)
  - `--card-foreground: 220 20% 20%` (dark text)
  - `--background: 220 15% 96%` (light gray page bg)
  - `--foreground: 220 20% 20%` (dark text)
  - `--border: 220 15% 88%`
  - `--muted: 220 15% 92%`
  - Keep `--primary` as purple for buttons/active states

### 3. `src/components/admin/AdminSidebar.tsx`
- Change sidebar background from `bg-card` to explicit `bg-white` with a right border
- Ensure nav items use proper contrast colors
- Add scrollable overflow for long menu lists

### 4. `src/components/admin/PortfolioManager.tsx`
- Remove `variant="light"` from Badge (invalid variant causing potential issues)
- Ensure inputs and selects have explicit white backgrounds

### 5. `src/components/admin/RichTextEditor.tsx`
- Already uses `bg-white` — no changes needed

### 6. `src/components/admin/AdminHome.tsx`
- Cards will automatically inherit the white theme from the admin wrapper
- No changes needed

## Result
- All admin cards will be white with dark text
- Sidebar will be white with clear navigation
- Forms, inputs, and editors will all be clearly visible
- Public site remains unchanged (purple theme intact)

