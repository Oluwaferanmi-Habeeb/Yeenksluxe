# Storefront redesign handoff

## Experience changes

- Replaced the competing hero sliders with one campaign-led hero.
- Moved product discovery directly below the hero.
- Added search, category filtering, sorting and progressive catalogue loading.
- Simplified cards to one active currency, short product names and clear option selection.
- Added secondary product imagery, colour and size controls, fit help and product accordions.
- Rebuilt the shopping bag and clarified free delivery and availability messaging.
- Reworked checkout around the active WhatsApp ordering flow.
- Removed the fake email discount confirmation and replaced it with a real WhatsApp VIP action.
- Added editorial, community, trust and FAQ components.
- Added delivery, returns, size-guide, privacy and terms pages.

## Technical changes

- Removed broken unused NextAuth, Prisma and Paystack scaffolding.
- Replaced the legacy stylesheet with a compact responsive design system.
- Added keyboard-accessible controls, focus styles, reduced-motion support and dialog semantics.
- Added richer metadata, social preview configuration, structured organization data and robots rules.
- Updated the project documentation and lockfile.

## Verification

- `npm run lint` passes with no errors or warnings.
- `npm run build` passes and all app routes are statically generated.

## Owner decisions required before launch

- Confirm the free nationwide delivery claim and delivery windows.
- Confirm the seven-day exchange policy.
- Supply exact garment measurements and product-specific care information.
- Confirm official colour names for each SKU.
- Add the production domain to the metadata configuration.
