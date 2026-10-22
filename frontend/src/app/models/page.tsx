'use client';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import '../settings/settings.css';

export default function ModelsPage() {
  return (
    <div className="settings-layout">
      <Sidebar />
      <main className="settings-main">
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="settings-title">AI Models</h1>
            <p className="settings-subtitle">Manage, train, and view the status of your DeepShield detection models.</p>
          </div>
          <button className="btn-dark" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            Deploy Custom Model
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Active Model</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>Vision Transformer v4.2</div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
              <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div> Online
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Global Accuracy</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>98.7%</div>
            <div style={{ marginTop: '1rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
              ↑ 1.2% from last week
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>False Positive Rate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111' }}>0.04%</div>
            <div style={{ marginTop: '1rem', color: '#dca32a', fontSize: '0.85rem', fontWeight: 600 }}>
              Stable
            </div>
          </div>
        </div>

        <div className="card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #f2f3f5', padding: '0' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f2f3f5' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Model Versions</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0', color: '#666', fontSize: '0.85rem' }}>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>VERSION</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>ARCHITECTURE</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>STATUS</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>ACCURACY</th>
                <th style={{ padding: '1.5rem 2rem', fontWeight: 500 }}>DEPLOYED</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                <td style={{ padding: '1.25rem 2rem', fontWeight: 600, fontSize: '0.9rem' }}>v4.2 (Production)</td>
                <td style={{ padding: '1.25rem 2rem', color: '#666', fontSize: '0.9rem' }}>ViT + Cross-Attention</td>
                <td style={{ padding: '1.25rem 2rem' }}>
                  <span style={{ background: '#10b98115', color: '#10b981', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>Active</span>
                </td>
                <td style={{ padding: '1.25rem 2rem', fontWeight: 600, fontSize: '0.9rem' }}>98.7%</td>
                <td style={{ padding: '1.25rem 2rem', color: '#666', fontSize: '0.85rem' }}>Oct 10, 2023</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                <td style={{ padding: '1.25rem 2rem', fontWeight: 600, fontSize: '0.9rem' }}>v4.3-beta</td>
                <td style={{ padding: '1.25rem 2rem', color: '#666', fontSize: '0.9rem' }}>Swin Transformer</td>
                <td style={{ padding: '1.25rem 2rem' }}>
                  <span style={{ background: '#3b82f615', color: '#3b82f6', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>Training</span>
                </td>
                <td style={{ padding: '1.25rem 2rem', fontWeight: 600, fontSize: '0.9rem' }}>--</td>
                <td style={{ padding: '1.25rem 2rem', color: '#666', fontSize: '0.85rem' }}>In Progress</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f8f9fa' }}>
                <td style={{ padding: '1.25rem 2rem', fontWeight: 600, fontSize: '0.9rem', color: '#a0a0a0' }}>v4.1</td>
                <td style={{ padding: '1.25rem 2rem', color: '#a0a0a0', fontSize: '0.9rem' }}>ResNet-50</td>
                <td style={{ padding: '1.25rem 2rem' }}>
                  <span style={{ background: '#f43f5e15', color: '#f43f5e', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}>Deprecated</span>
                </td>
                <td style={{ padding: '1.25rem 2rem', fontWeight: 600, fontSize: '0.9rem', color: '#a0a0a0' }}>94.2%</td>
                <td style={{ padding: '1.25rem 2rem', color: '#a0a0a0', fontSize: '0.85rem' }}>Jan 15, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
