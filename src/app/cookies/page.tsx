import InfoPageShell from '../../components/InfoPageShell';

export const metadata = { title: 'Cookie Policy | YEENKSLUXE' };

export default function CookiePolicyPage() {
  return (
    <InfoPageShell eyebrow="Legal" title="Cookies">
      <p>Last updated: 8 September 2026</p>

      <h2>Our current use of cookies</h2>
      <p>YEENKSLUXE does not currently use advertising, analytics or personalisation cookies on this storefront. Because no optional cookies are placed by us, the site does not display a cookie-consent banner.</p>

      <h2>Browser storage</h2>
      <p>The storefront uses local storage in your browser to remember the contents of your shopping bag and your selected currency. Local storage is not a cookie and this information remains on your device until you clear your browser data.</p>

      <h2>Third-party services</h2>
      <p>Links to WhatsApp, Instagram and TikTok take you to services operated by other companies. Those services may use cookies under their own policies after you leave this website.</p>

      <h2>Future changes</h2>
      <p>If analytics, advertising or another feature that uses optional cookies is introduced, this policy will be updated and an appropriate consent choice will be added before those cookies are used.</p>

      <h2>Contact</h2>
      <p>For questions about browser storage or privacy, contact YEENKSLUXE through the official WhatsApp link on this website.</p>
    </InfoPageShell>
  );
}
