# SoftBridge Case-Specific Details — Type Fix

Fixed Vercel TypeScript error:

Type 'string' is not assignable to type '{ label: string; image: string; }'

The profile data now correctly defines service rows as `string[]`.
`buildCaseContent()` continues converting each string into:
- label
- image

No layout, animation, content, or visual structure was changed.
