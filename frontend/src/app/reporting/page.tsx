'use client';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import '../settings/settings.css';

export default function ReportingPage() {
  return (
    <div className="settings-layout">
      <Sidebar />
      <main className="settings-main">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="settings-title">Reporting & Analytics</h1>
            <p className="settings-subtitle">Generate detailed compliance reports and deepfake detection metrics.</p>
          </div>
          <button className="btn-dark" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            Generate Custom Report
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Total Scans (This Month)</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111' }}>1,248</div>
            <div style={{ marginTop: '1rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
              +14% vs last month
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Deepfakes Blocked</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f43f5e' }}>84</div>
            <div style={{ marginTop: '1rem', color: '#f43f5e', fontSize: '0.85rem', fontWeight: 600 }}>
              6.7% incident rate
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Compliance Score</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#111' }}>99/100</div>
            <div style={{ marginTop: '1rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
              Audit Passed
            </div>
          </div>
        </div>

        <div className="card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5', padding: '0' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f2f3f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Scheduled Reports</h3>
            <span style={{ fontSize: '0.85rem', color: '#dca32a', fontWeight: 600 }}>Manage Schedules →</span>
          </div>
          <div style={{ padding: '1.5rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f8f9fa' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Weekly Executive Summary</div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>Sent every Monday at 9:00 AM to management@company.com</div>
              </div>
              <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>Active</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Monthly Compliance Audit Log</div>
                <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>Sent on the 1st of every month to compliance@company.com</div>
              </div>
              <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>Active</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
