'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import '../login/login.css'; // Reuse login CSS

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account.');
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
            <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="40" y="80" width="120" height="20" rx="4" fill="#a0a0ff" />
              <rect x="60" y="100" width="80" height="60" rx="8" fill="#10b981" />
              <circle cx="100" cy="70" r="15" fill="#dca32a" />
              <path d="M95 100 L95 140 M105 100 L105 140" stroke="white" strokeWidth="4" />
              <path d="M120 40 L160 40 L160 60 L140 60" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="120" cy="40" r="10" stroke="#10b981" strokeWidth="6" fill="white" />
            </svg>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="login-right">
          <div className="login-title">
            <div className="login-title-top">START YOUR JOURNEY</div>
            <div className="login-title-bottom">CREATE ACCOUNT</div>
          </div>

          <form onSubmit={handleSignup}>
            {error && <div style={{ color: '#f43f5e', fontSize: '0.85rem', marginBottom: '1rem', background: '#fff0f0', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
            
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-field-wrapper">
                <div className="input-icon icon-yellow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Jane Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
            </div>

            <button type="submit" className="login-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
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
                  setError(err.message || 'Google sign-up failed');
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
              Sign up with Google
            </button>
          </form>

          <div className="login-footer">
            ALREADY HAVE AN ACCOUNT? <Link href="/login">SIGN IN</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
