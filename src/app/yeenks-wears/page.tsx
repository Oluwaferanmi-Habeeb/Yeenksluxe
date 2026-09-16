import InfoPageShell from '../../components/InfoPageShell';

export const metadata = {
  title: 'Yeenks Wears | YEENKSLUXE',
  description: 'Yeenks Wears is part of YEENKSLUXE, a Lagos-born label for graphic tees, hoodies and caps.',
  alternates: { canonical: '/yeenks-wears' },
};

export default function YeenksWearsPage() {
  return (
    <InfoPageShell eyebrow="Brand" title="Yeenks Wears.">
      <h2>Part of YEENKSLUXE</h2>
      <p>Yeenks Wears is a name used by YEENKSLUXE, the Lagos-born label behind graphic tees, hoodies and caps made for everyday wear.</p>
      <h2>One label, one store</h2>
      <p>Every Yeenks Wears piece is part of the YEENKSLUXE world. Explore the current collection and follow the next release through the main store.</p>
    </InfoPageShell>
  );
}
