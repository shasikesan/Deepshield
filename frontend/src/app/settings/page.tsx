'use client';
import './settings.css';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function SettingsPage() {
  return (
    <div className="settings-layout">
      {/* Sidebar matching Image 5 (Untitled UI) */}
      <Sidebar />

      <main className="settings-main">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">Settings and options for your application.</p>

        <div className="settings-card" style={{ background: '#f8f9fa', borderColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, color: '#111', marginBottom: '0.25rem' }}>Your application is currently on the free plan</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>Paid plans offer higher usage limits, additional API access, and much more. Learn more here.</div>
          </div>
          <button style={{ padding: '0.5rem 1rem', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Upgrade Plan</button>
        </div>

        <div className="settings-form-group">
          <div className="settings-form-label">
            <h3>Name</h3>
            <p>Changes will update all URLs.</p>
          </div>
          <div className="settings-form-input">
            <input type="text" className="settings-input" defaultValue="DeepShield App" />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input type="text" className="settings-input" style={{ flex: 1, background: '#f8f9fa', color: '#666' }} value="deepshield.app/" readOnly />
              <input type="text" className="settings-input" style={{ flex: 1 }} defaultValue="admin" />
            </div>
          </div>
        </div>

        <div className="settings-form-group">
          <div className="settings-form-label">
            <h3>Default AI Model</h3>
            <p>Changes will affect future deepfake scans.</p>
          </div>
          <div className="settings-form-input">
            <select className="settings-input">
              <option>MobileNetV2 (Fast)</option>
              <option>EfficientNet (Accurate)</option>
              <option>ViT (State-of-the-art)</option>
            </select>
          </div>
        </div>

        <div className="settings-form-group">
          <div className="settings-form-label">
            <h3>Tagline</h3>
            <p>A quick snapshot of your application.</p>
          </div>
          <div className="settings-form-input">
            <textarea className="settings-input" rows={4} defaultValue="DeepShield is the ultimate deepfake detection and verification platform." />
            <div style={{ fontSize: '0.75rem', color: '#a0a0a0', marginTop: '0.25rem' }}>40 characters left</div>
          </div>
        </div>

        <div className="settings-form-group">
          <div className="settings-form-label">
            <h3>Advanced settings</h3>
            <a href="#" style={{ fontSize: '0.85rem', color: '#4634d9', textDecoration: 'none', fontWeight: 500 }}>Reset to default</a>
          </div>
          <div className="settings-form-input">
            <label style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#4634d9' }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.95rem', color: '#333' }}>Allow automated API scans</div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>Any verified endpoint can send videos for analysis.</div>
              </div>
            </label>
            <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#4634d9' }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.95rem', color: '#333' }}>Log to Blockchain automatically</div>
                <div style={{ fontSize: '0.85rem', color: '#666' }}>All scan results will be permanently written to the ledger.</div>
              </div>
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button style={{ padding: '0.5rem 1rem', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
          <button style={{ padding: '0.5rem 1rem', background: '#4634d9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Save Changes</button>
        </div>
      </main>
    </div>
  );
}
