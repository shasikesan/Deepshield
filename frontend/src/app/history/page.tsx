'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/history')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.history) {
          // Sort newest first
          const sorted = data.history.sort((a: any, b: any) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setHistoryData(sorted);
        }
      })
      .catch(err => console.error("Error fetching history:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (isoString: string) => {
    if (!isoString) return 'Unknown';
    const date = new Date(isoString);
    return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatHash = (hash: string) => {
    if (!hash || hash.length < 10) return hash;
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <div className="dash-layout">
      <Sidebar />

      <main className="dash-main">
        {/* Header */}
        <header className="dash-header">
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search past scans..." />
          </div>
          <div className="header-actions">
            <Link href="/profile" className="avatar">JD</Link>
          </div>
        </header>

        <div className="dash-title-row">
          <div>
            <h1 className="dash-title">Scan History</h1>
            <p className="dash-subtitle">View and export your previous deepfake verifications</p>
          </div>
          <div className="action-buttons">
            <button className="btn-secondary">Export CSV</button>
            <Link href="/dashboard" className="btn-dark">+ New Analysis</Link>
          </div>
        </div>

        <div className="card" style={{ marginTop: '2rem', padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0', color: '#666', fontSize: '0.85rem' }}>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>FILE NAME</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>DATE</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>CONFIDENCE</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>VERDICT</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>BLOCKCHAIN ID</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#a0a0a0' }}>Loading history...</td>
                </tr>
              ) : historyData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#a0a0a0' }}>No history found. Try analyzing a video!</td>
                </tr>
              ) : (
                historyData.map((row, i) => {
                  const isReal = row.result && row.result.toLowerCase().includes('real');
                  const color = isReal ? '#10b981' : '#f43f5e';
                  const conf = row.confidence ? (row.confidence * 100).toFixed(1) + '%' : '—';
                  
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid #f8f9fa', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => (e.currentTarget.style.background = '#f8f9fa')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '1.25rem 2rem', fontWeight: 500, fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
                          {row.filename || 'Unknown File'}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 2rem', fontSize: '0.85rem', color: '#666' }}>{formatDate(row.timestamp)}</td>
                      <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', fontWeight: 600 }}>{conf}</td>
                      <td style={{ padding: '1.25rem 2rem' }}>
                        <span style={{ background: `${color}15`, color: color, padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {row.result}
                        </span>
                      </td>
                      <td style={{ padding: '1.25rem 2rem', fontFamily: 'monospace', fontSize: '0.8rem', color: '#888' }}>{formatHash(row.hash)}</td>
                      <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#a0a0a0' }}>...</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
