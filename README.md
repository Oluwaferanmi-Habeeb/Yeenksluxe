# YEENKSLUXE storefront

A responsive Next.js storefront for YEENKSLUXE, a Lagos-born streetwear label. The current checkout flow prepares an order and opens it with the official YEENKSLUXE WhatsApp account; the website does not collect payment.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify a release

```bash
npm run lint
npm run build
```

## Store data

Products live in `src/data/products.ts`. Before publishing a new drop, verify:

- product name and category;
- price and available sizes;
- official colour names;
- front, back, detail and styled images;
- product-specific fit, fabric and care details.

Empty categories should not be added to the navigation.

## Customer flow

1. Browse or search the collection.
2. Open a product, select colour and size, and add it to the bag.
3. Enter delivery details at checkout.
4. Continue to WhatsApp to send the prepared order request.
5. YEENKSLUXE confirms stock, delivery and payment details in the chat.

## Important launch checks

- Confirm the delivery and exchange copy with the business owner.
- Replace approximate size guidance with exact garment measurements.
- Set the production domain as `metadataBase` in `src/app/layout.tsx`.
- Verify the Instagram, TikTok and WhatsApp links.
- Review the privacy and terms pages with appropriate local professional guidance.

See `DESIGN_SYSTEM.md` for visual and content rules.
