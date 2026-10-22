'use client';
import { useState, useRef, useCallback } from 'react';
import './dashboard.css';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const API_URL = 'http://localhost:8000';

interface AnalysisResult {
  status: string;
  filename: string;
  verdict: string;
  confidence: number;
  heatmap_url: string | null;
  landmarks_url: string | null;
  block_hash: string;
  message?: string;
}

export default function DashboardPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fullScreenCard, setFullScreenCard] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResult(null);
      setError(null);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });
      const data: AnalysisResult = await res.json();
      if (data.status === 'error') {
        setError(data.message || 'Analysis failed');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Could not connect to the backend. Make sure the FastAPI server is running on port 8000.');
    } finally {
      setAnalyzing(false);
    }
  };

  const confidencePct = result ? (result.confidence * 100).toFixed(1) : '—';
  const isReal = result ? result.verdict?.toLowerCase().includes('real') : null;

  return (
    <div className="dash-layout">
      <Sidebar />

      <main className="dash-main">
        {/* Header */}
        <header className="dash-header">
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search anything here..." />
          </div>
          <div className="header-actions">
            <div className="icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
            <Link href="/profile" className="avatar">JD</Link>
          </div>
        </header>

        <div className="dash-title-row">
          <div>
            <h1 className="dash-title">Dashboard Overview</h1>
            <p className="dash-subtitle">Here&apos;s what&apos;s happening with your deepfake analysis today</p>
          </div>
          <div className="action-buttons">
            <button className="btn-secondary" onClick={() => fileInputRef.current?.click()}>+ New Analysis</button>
          </div>
        </div>

        <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr 300px', gridTemplateRows: 'auto 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
          {/* Upload Media */}
          <div className="card upload-card" style={{ gridRow: '1 / span 2', gridColumn: '1', display: 'flex', flexDirection: 'column' }}>
            <div className="card-title" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Upload Media</div>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>Upload video for AI verification.</p>
            
            <div
              className="upload-area"
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{ borderColor: dragActive ? '#dca32a' : undefined, background: dragActive ? 'rgba(220,163,42,0.05)' : undefined }}
            >
              <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} style={{ display: 'none' }} />
              {file ? (
                <>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>{file.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{(file.size / 1024 / 1024).toFixed(1)} MB</div>
                </>
              ) : (
                <>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dca32a" strokeWidth="2" style={{ marginBottom: '0.75rem' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <div style={{ fontWeight: 600 }}>Drag &amp; Drop</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>or click to browse</div>
                </>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ background: '#fff7e6', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#dca32a', flex: 1, textAlign: 'center' }}>
                Supported: MP4, AVI, MOV
              </div>
            </div>
            <button
              className="upload-btn"
              style={{ marginTop: '1rem', opacity: file && !analyzing ? 1 : 0.5, cursor: file && !analyzing ? 'pointer' : 'not-allowed' }}
              onClick={handleAnalyze}
              disabled={!file || analyzing}
            >
              {analyzing ? '⏳ Analyzing...' : 'Analyze Now ➔'}
            </button>
          </div>

          {/* Analysis Result */}
          <div className="card" style={{ gridRow: '1', gridColumn: '2', display: 'flex', flexDirection: 'column' }}>
            <div className="card-title">Analysis Result <div className="expand-icon" onClick={() => setFullScreenCard('analysis')} style={{cursor: 'pointer'}}>⛶</div></div>
            {error && (
              <div style={{ background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem' }}>
                ⚠️ {error}
              </div>
            )}
            {result ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="metric-value">{confidencePct}%</div>
                  <div className={`metric-badge ${isReal ? '' : 'danger'}`}>
                    {isReal ? '✓ Authentic' : '✕ Deepfake Detected'}
                  </div>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  File: <strong>{result.filename}</strong><br/>
                  Verdict: <strong style={{ color: isReal ? '#10b981' : '#f43f5e' }}>{result.verdict}</strong>
                </div>
              </div>
            ) : !error ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#a0a0a0', minHeight: '120px' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Upload a video to see results</div>
              </div>
            ) : null}
          </div>

          {/* Blockchain Receipt */}
          <div className="card" style={{ gridRow: '1', gridColumn: '3', display: 'flex', flexDirection: 'column' }}>
            <div className="card-title">Blockchain Receipt <div className="expand-icon" onClick={() => setFullScreenCard('blockchain')} style={{cursor: 'pointer'}}>⛶</div></div>
            {result?.block_hash ? (
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#333', background: '#f8f9fa', padding: '1rem', borderRadius: '8px', wordBreak: 'break-all' as const, marginTop: '0.5rem' }}>
                  {result.block_hash}
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Logged to ledger
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#ccc', fontSize: '0.85rem', minHeight: '120px' }}>
                Awaiting scan result
              </div>
            )}
          </div>

          {/* Heatmap + Landmarks Container */}
          <div style={{ gridRow: '2', gridColumn: '2', display: 'flex', gap: '1.5rem' }}>
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="card-title">Grad-CAM Heatmap <div className="expand-icon" onClick={() => setFullScreenCard('heatmap')} style={{cursor: 'pointer'}}>⛶</div></div>
              {result?.heatmap_url ? (
                <img src={`${API_URL}${result.heatmap_url}`} alt="Grad-CAM Heatmap" style={{ width: '100%', borderRadius: '8px', marginTop: '0.5rem' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#ccc', fontSize: '0.85rem', background: '#f8f9fa', borderRadius: '12px', marginTop: '0.5rem', minHeight: '120px' }}>
                  No heatmap yet
                </div>
              )}
            </div>
            
            <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="card-title">Face Mesh <div className="expand-icon" onClick={() => setFullScreenCard('mesh')} style={{cursor: 'pointer'}}>⛶</div></div>
              {result?.landmarks_url ? (
                <img src={`${API_URL}${result.landmarks_url}`} alt="Face Mesh" style={{ width: '100%', borderRadius: '8px', marginTop: '0.5rem' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#ccc', fontSize: '0.85rem', background: '#f8f9fa', borderRadius: '12px', marginTop: '0.5rem', minHeight: '120px' }}>
                  No mesh yet
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="card" style={{ gridRow: '2', gridColumn: '3', display: 'flex', flexDirection: 'column' }}>
            <div className="card-title">System Status <div className="expand-icon" onClick={() => setFullScreenCard('status')} style={{cursor: 'pointer'}}>⛶</div></div>
            <div className="donut-chart" style={{ margin: 'auto' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                <path strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#dca32a" strokeWidth="3" />
                <path strokeDasharray="25, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#111" strokeWidth="3" />
              </svg>
              <div className="donut-center">
                <div className="val">Online</div>
                <div className="lbl">All Systems</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.8rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div> API</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', background: '#dca32a', borderRadius: '50%' }}></div> Model</div>
            </div>
          </div>
        </div>

      
      {/* Full Screen Modal */}
      {fullScreenCard && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 className="card-title" style={{ margin: 0 }}>
                {fullScreenCard === 'analysis' && 'Analysis Result'}
                {fullScreenCard === 'blockchain' && 'Blockchain Receipt'}
                {fullScreenCard === 'heatmap' && 'Grad-CAM Heatmap'}
                {fullScreenCard === 'mesh' && 'Face Mesh'}
                {fullScreenCard === 'status' && 'System Status'}
              </h2>
              <button onClick={() => setFullScreenCard(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>✕</button>
            </div>
            
            {/* Modal Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {fullScreenCard === 'analysis' && (
                result ? (
                  <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <div className="metric-value" style={{ fontSize: '4rem' }}>{confidencePct}%</div>
                    <div className={`metric-badge ${isReal ? '' : 'danger'}`} style={{ fontSize: '1.2rem', padding: '10px 20px', marginTop: '1rem' }}>
                      {isReal ? '✓ Authentic' : '✕ Deepfake Detected'}
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#666', marginTop: '2rem' }}>
                      File: <strong>{result.filename}</strong><br/>
                      Verdict: <strong style={{ color: isReal ? '#10b981' : '#f43f5e' }}>{result.verdict}</strong>
                    </div>
                  </div>
                ) : <div style={{ textAlign: 'center', padding: '2rem', color: '#a0a0a0' }}>No result to show.</div>
              )}
              
              {fullScreenCard === 'blockchain' && (
                result?.block_hash ? (
                  <div style={{ padding: '2rem' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: '#333', background: '#f8f9fa', padding: '2rem', borderRadius: '8px', wordBreak: 'break-all' }}>
                      {result.block_hash}
                    </div>
                    <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#10b981', fontSize: '1.2rem', fontWeight: 600 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Logged to ledger
                    </div>
                  </div>
                ) : <div style={{ textAlign: 'center', padding: '2rem', color: '#a0a0a0' }}>Awaiting scan result.</div>
              )}

              {fullScreenCard === 'heatmap' && (
                result?.heatmap_url ? (
                  <img src={`${API_URL}${result.heatmap_url}`} alt="Grad-CAM Heatmap" style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '8px' }} />
                ) : <div style={{ textAlign: 'center', padding: '2rem', color: '#a0a0a0' }}>No heatmap yet.</div>
              )}

              {fullScreenCard === 'mesh' && (
                result?.landmarks_url ? (
                  <img src={`${API_URL}${result.landmarks_url}`} alt="Face Mesh" style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain', borderRadius: '8px' }} />
                ) : <div style={{ textAlign: 'center', padding: '2rem', color: '#a0a0a0' }}>No mesh yet.</div>
              )}

              {fullScreenCard === 'status' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
                  <div className="donut-chart" style={{ width: '300px', height: '300px', margin: 'auto' }}>
                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                      <path strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#dca32a" strokeWidth="3" />
                      <path strokeDasharray="25, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#111" strokeWidth="3" />
                    </svg>
                    <div className="donut-center">
                      <div className="val" style={{ fontSize: '3rem' }}>Online</div>
                      <div className="lbl" style={{ fontSize: '1rem' }}>All Systems Operational</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '1.2rem', marginTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%' }}></div> API</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: '#dca32a', borderRadius: '50%' }}></div> Model</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      </main>
    </div>
  );
}
