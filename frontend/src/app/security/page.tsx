'use client';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import '../settings/settings.css';

export default function SecurityPage() {
  return (
    <div className="settings-layout">
      <Sidebar />
      <main className="settings-main">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="settings-title">Security & API Keys</h1>
            <p className="settings-subtitle">Manage your encryption protocols and API authentication tokens.</p>
          </div>
          <button className="btn-dark" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            Generate New Key
          </button>
        </header>

        <div className="card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Active API Keys</h3>
          
          <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>Production Microservices Key</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#666', background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
                sk_live_8f92********************3a91
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>Created Oct 1, 2023</div>
              <button style={{ background: '#fef2f2', color: '#f43f5e', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Revoke</button>
            </div>
          </div>
          
          <div style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>Development Sandbox Key</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#666', background: '#f8f9fa', padding: '4px 8px', borderRadius: '4px' }}>
                sk_test_4b21********************7d42
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>Created Nov 15, 2023</div>
              <button style={{ background: '#fef2f2', color: '#f43f5e', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Revoke</button>
            </div>
          </div>
        </div>

        <div className="card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5', padding: '2rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Security Settings</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Two-Factor Authentication (2FA)</div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>Require a security key or authenticator app when logging in.</div>
            </div>
            <div style={{ background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>Enabled</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Strict IP Whitelisting</div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>Only allow API requests from specific IP addresses.</div>
            </div>
            <button style={{ background: '#f8f9fa', border: '1px solid #ccc', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>Configure</button>
          </div>
        </div>
      </main>
    </div>
  );
}
