This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Payment & Backend Setup (Supabase + Paystack)

This project includes a basic Paystack integration and optional Supabase/Postgres persistence for orders.

1. Copy `.env.example` to `.env.local` and fill values from your CEO / ops person:

```bash
cp .env.example .env.local
# edit .env.local and add keys
```

Required values:
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` (client-side public key)
- `PAYSTACK_SECRET_KEY` (server-side secret key)
- `SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (if using Supabase)

2. Install dependencies and Prisma (if using Supabase/Postgres):

```bash
npm install
npx prisma generate
```

3. If you plan to use Supabase/Postgres with Prisma, set `DATABASE_URL` in your environment and run:

```bash
npx prisma migrate dev --name init
```

4. Run the dev server:

```bash
npm run dev
```

5. To test Paystack locally:
- Use Paystack test keys (pk_test..., sk_test...)
- Checkout in the app and complete a test payment. Orders will be written to `src/data/orders.json` by default.

Notes:
- The project includes `src/lib/supabaseServer.ts` and `prisma/schema.prisma` to help migrate to Supabase/Postgres.
- Webhooks: configure your Paystack webhook URL to point to `/api/paystack/webhook` in production. For local testing use ngrok.

