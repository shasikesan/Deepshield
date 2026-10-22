'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import './login.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Left Side (Illustration) */}
        <div className="login-left">
          <div style={{ transform: 'scale(0.8) translateX(10%)' }}>
            {/* SVG Placeholder for 3D Illustration */}
            <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="80" width="120" height="20" rx="4" fill="#a0a0ff" />
              <rect x="60" y="100" width="80" height="60" rx="8" fill="#4634d9" />
              <circle cx="100" cy="70" r="15" fill="#dca32a" />
              <path d="M95 100 L95 140 M105 100 L105 140" stroke="white" strokeWidth="4" />
              <path d="M120 40 L160 40 L160 60 L140 60" stroke="#4634d9" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="120" cy="40" r="10" stroke="#4634d9" strokeWidth="6" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="login-right">
          <div className="login-title">
            <div className="login-title-top">WELCOME BACK</div>
            <div className="login-title-bottom">LOGIN PAGE</div>
          </div>

          <form onSubmit={handleLogin}>
            {error && <div style={{ color: '#f43f5e', fontSize: '0.85rem', marginBottom: '1rem', background: '#fff0f0', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
            
            <div className="input-group">
              <label className="input-label">Email address</label>
              <div className="input-field-wrapper">
                <div className="input-icon icon-yellow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-field-wrapper">
                <div className="input-icon icon-dark">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                <a href="#" style={{ fontSize: '0.75rem', color: '#a0a0a0', textDecoration: 'none' }}>Forget password?</a>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#f0f0f0' }}></div>
              <div style={{ padding: '0 1rem', fontSize: '0.8rem', color: '#a0a0a0', fontWeight: 500 }}>OR</div>
              <div style={{ flex: 1, height: '1px', background: '#f0f0f0' }}></div>
            </div>

            <button 
              type="button" 
              onClick={async () => {
                const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
                try {
                  setLoading(true);
                  const provider = new GoogleAuthProvider();
                  await signInWithPopup(auth, provider);
                  router.push('/dashboard');
                } catch (err: any) {
                  setError(err.message || 'Google sign-in failed');
                  setLoading(false);
                }
              }}
              className="login-btn" 
              style={{ background: '#fff', color: '#333', border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </form>

          <div className="login-footer">
            DON'T HAVE AN ACCOUNT? <Link href="/signup">CREATE AN ACCOUNT</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
