# Security policy

## Supported deployment

The supported production deployment is the latest commit on `main`, hosted by Vercel over HTTPS.

## Operational checklist

- Keep two-factor authentication enabled on GitHub, Vercel and the domain registrar.
- Keep GitHub and Vercel recovery codes offline and private.
- Restrict collaborator access to people who actively maintain the store.
- Enable automatic dependency update alerts on GitHub.
- Run `npm audit --omit=dev`, `npm run lint` and `npm run build` before deployment.
- Enable DNSSEC in Namecheap after the domain is connected and stable.
- Do not buy a separate SSL certificate for this deployment; Vercel provisions and renews HTTPS certificates.
- Never place passwords, private API keys or payment secrets in variables prefixed with `NEXT_PUBLIC_`.

## Customer data

The storefront does not process card payments or send checkout details to a website backend. Delivery details are placed into a WhatsApp message only after the customer submits the checkout form. The form is not persisted to local storage.

## Reporting a problem

Do not publish suspected vulnerabilities in a public GitHub issue. Contact the store owner privately with the affected page, reproduction steps and screenshots where appropriate.
