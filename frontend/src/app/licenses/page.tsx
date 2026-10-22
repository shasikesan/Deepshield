'use client';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import '../settings/settings.css';

export default function LicensesPage() {
  return (
    <div className="settings-layout">
      <Sidebar />
      <main className="settings-main">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="settings-title">Licenses & Billing</h1>
            <p className="settings-subtitle">Manage your enterprise blockchain verification subscriptions.</p>
          </div>
          <button className="btn-dark" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            Upgrade Plan
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, #111 0%, #333 100%)', borderRadius: '16px', padding: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Current Plan</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>Enterprise Tier</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>Billed annually. Next invoice on Nov 1, 2024.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                Active
              </div>
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '4px' }}>API Usage</div>
                <div style={{ fontWeight: 600 }}>12.4k / 50k Scans</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '4px' }}>Blockchain Ledger</div>
                <div style={{ fontWeight: 600 }}>Unlimited</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5', padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Payment Method</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
              <div style={{ width: '48px', height: '32px', background: '#111', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, fontStyle: 'italic' }}>VISA</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>•••• 4242</div>
                <div style={{ fontSize: '0.8rem', color: '#666' }}>Expires 12/26</div>
              </div>
            </div>
            <button style={{ width: '100%', marginTop: '1rem', background: 'transparent', border: '1px solid #ccc', padding: '0.5rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              Update Payment Method
            </button>
          </div>
        </div>

        <div className="card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5', padding: '0' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f2f3f5' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Billing History</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0', color: '#666', fontSize: '0.85rem' }}>
                <th style={{ padding: '1rem 2rem', fontWeight: 500 }}>DATE</th>
                <th style={{ padding: '1rem 2rem', fontWeight: 500 }}>INVOICE</th>
                <th style={{ padding: '1rem 2rem', fontWeight: 500 }}>AMOUNT</th>
                <th style={{ padding: '1rem 2rem', fontWeight: 500 }}>STATUS</th>
                <th style={{ padding: '1rem 2rem', fontWeight: 500 }}></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', color: '#333' }}>Nov 1, 2023</td>
                <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', fontWeight: 500 }}>INV-2023-11</td>
                <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', fontWeight: 600 }}>$1,200.00</td>
                <td style={{ padding: '1.25rem 2rem' }}>
                  <span style={{ background: '#10b98115', color: '#10b981', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>Paid</span>
                </td>
                <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                  <a href="#" style={{ color: '#dca32a', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Download</a>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', color: '#333' }}>Nov 1, 2022</td>
                <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', fontWeight: 500 }}>INV-2022-11</td>
                <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', fontWeight: 600 }}>$1,200.00</td>
                <td style={{ padding: '1.25rem 2rem' }}>
                  <span style={{ background: '#10b98115', color: '#10b981', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>Paid</span>
                </td>
                <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                  <a href="#" style={{ color: '#dca32a', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>Download</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
