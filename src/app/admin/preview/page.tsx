import type { Metadata } from 'next';
import AdminPreview from '../../../components/AdminPreview';

export const metadata: Metadata = {
  title: 'Catalogue desk preview | YEENKSLUXE',
  robots: { index: false, follow: false },
};

export default function AdminPreviewPage() {
  return <AdminPreview />;
}
