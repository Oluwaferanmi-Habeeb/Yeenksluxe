import type { Metadata } from 'next';
import AdminDashboard from '../../components/AdminDashboard';
import { AccountProvider } from '../../context/AccountContext';

export const metadata: Metadata = { title: 'Catalogue desk | YEENKSLUXE', robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AccountProvider><AdminDashboard /></AccountProvider>;
}
