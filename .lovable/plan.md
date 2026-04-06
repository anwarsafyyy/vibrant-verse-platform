

# Plan: Upgrade Portfolio Manager with Categories & Rich Text Editor

## What We're Building

1. **Category System** — Add a "type" field (`mobile_app` or `website`) to each portfolio item, with a dropdown selector in admin instead of free text
2. **Category Tabs on Public Site** — Add filter tabs ("الكل" / "تطبيقات الجوال" / "مواقع ومنصات") in the PortfolioSection so visitors can browse each type separately
3. **Rich Text Editor for Descriptions** — Replace plain Textarea with a TipTap rich text editor supporting bold, italic, lists, headings, and inline image uploads
4. **Additional Data Fields** — Add `logo_url`, `technologies`, and `is_active` fields to the admin form (currently missing from the manager but referenced in the public section)

## Technical Details

### Files to Create
- **`src/components/admin/RichTextEditor.tsx`** — TipTap-based rich text editor component with toolbar (bold, italic, headings, lists, image upload via Firebase Storage), outputs HTML string

### Files to Modify

- **`src/components/admin/PortfolioManager.tsx`**
  - Change `category` field from free text Input to a Select dropdown with two options: `mobile_app` (تطبيقات جوال) and `website` (مواقع ومنصات)
  - Replace description Textareas with the new RichTextEditor component
  - Add `logo_url` field with ImageUploader
  - Add `technologies` field (comma-separated input)
  - Add `is_active` toggle switch
  - Show category badge on each item card in the list
  - Add filter tabs at the top to filter admin list by category

- **`src/components/PortfolioSection.tsx`**
  - Add filter tabs ("الكل" / "تطبيقات الجوال" / "مواقع ومنصات") above the carousel
  - Filter `portfolioItems` based on selected tab
  - Render description using `dangerouslySetInnerHTML` to support rich text HTML content
  - Show category badge on each product card

### New Dependency
- Install `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image` for the rich text editor

### Data Migration
- Existing items with `category` as free text will be mapped to the new values during edit (admin can re-save each item with the correct category)
- Existing plain text descriptions will continue to render correctly since they contain no HTML tags

