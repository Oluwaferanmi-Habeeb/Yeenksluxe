import Link from 'next/link';

export default function InfoPageShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <main className="info-page"><div className="container"><Link href="/" className="info-wordmark">YEENKSLUXE®</Link><div className="info-layout"><aside><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><Link href="/">← Back to store</Link></aside><article>{children}</article></div></div></main>
  );
}
