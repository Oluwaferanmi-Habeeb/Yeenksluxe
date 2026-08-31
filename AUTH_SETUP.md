NextAuth setup (quick)

1) Install:

```bash
npm install next-auth
```

2) Required env vars (.env.local):

- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=<generate-a-long-random-secret>
- EMAIL_SERVER=smtp://USER:PASSWORD@smtp.example.com:587
- EMAIL_FROM="Yeenksluxe" <noreply@yourdomain.com>

3) Sign-in page:

NextAuth will redirect to `/signin` as configured. Create a simple sign-in page at `src/app/signin/page.tsx` or let NextAuth default UI be used by not creating the page.

4) Notes:

- Magic-link email requires a working SMTP server.
- Alternatively, configure an OAuth provider (Google/GitHub) and set provider credentials.
- After installing, run the app and visit `/api/auth/signin` to try the flow.

5) Post-setup:

- Ensure `NEXTAUTH_SECRET` is set in production.
- Protect the Paystack flow by requiring a valid session before initiating payment (code already guards this in `CheckoutForm`).
