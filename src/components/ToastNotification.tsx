'use client';

import { useStore } from '../context/StoreContext';

export default function ToastNotification() {
  const { toast, setToast } = useStore();

  if (!toast) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast" onClick={() => setToast(null)} style={{ cursor: 'pointer' }}>
        <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        {toast}
      </div>
    </div>
  );
}
