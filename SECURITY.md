# Security policy

## Supported deployment

The supported production deployment is the latest commit on `main`, hosted by Netlify over HTTPS at `https://yeenksluxe.com`.

## Operational checklist

- Keep two-factor authentication enabled on GitHub, Netlify and the domain registrar.
- Keep GitHub and Netlify recovery codes offline and private.
- Restrict collaborator access to people who actively maintain the store.
- Enable Dependabot security updates and secret scanning alerts on GitHub.
- Run `npm audit --omit=dev`, `npm run lint` and `npm run build` before deployment.
- Enable DNSSEC in Namecheap after the domain is connected and stable.
- Do not buy a separate SSL certificate for this deployment; Netlify provisions and renews HTTPS certificates after DNS verification completes.
- Never place passwords, private API keys or payment secrets in variables prefixed with `NEXT_PUBLIC_`.

## Customer data

The storefront does not process card payments or send checkout details to a website backend. Delivery details are placed into a WhatsApp message only after the customer submits the checkout form. The form is not persisted to local storage.

YNL Account profile data is stored by Netlify Identity. The client never receives an Identity operator token and no application database is currently connected, so there is no SQL query layer to inject into. Customer profile values are normalised, length-limited and stripped of markup before they are stored or included in the WhatsApp order summary.

## Growth guardrails

- Saved pieces are capped at 80 per account to prevent unbounded Identity metadata growth.
- Netlify's CDN serves immutable Next.js build assets; each deploy invalidates the cached release.
- If the store moves to real order history, inventory or an admin product system, use a server-side database with row-level permissions. Do not store those records in Identity metadata.

## Reporting a problem

Do not publish suspected vulnerabilities in a public GitHub issue. Contact the store owner privately with the affected page, reproduction steps and screenshots where appropriate.
