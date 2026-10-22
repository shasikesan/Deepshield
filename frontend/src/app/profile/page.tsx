'use client';
import { useEffect, useState } from 'react';
import '../settings/settings.css';
import './profile.css';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const getInitial = (name: string | null | undefined) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="settings-layout">
      {/* Unified Blue Sidebar (Image 2) */}
      <Sidebar />

      <main className="settings-main">
        <h1 className="settings-title">Profile</h1>
        <p className="settings-subtitle">Manage your personal account information.</p>

        <div className="profile-user-card" style={{ border: 'none', background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px' }}>
          <div className="profile-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0e0e0', color: '#666', fontSize: '2rem', fontWeight: 600 }}>
            {getInitial(user?.displayName || user?.email)}
          </div>
          <div>
            <div className="profile-name">{user?.displayName || 'DeepShield User'}</div>
            <div className="profile-surname">{user?.email || 'No email attached'}</div>
            <div className="profile-location">Verified Member</div>
            <button className="btn-social">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              Add social links
            </button>
          </div>
        </div>

        <div className="profile-section-title" style={{ marginTop: '3rem' }}>
          Manage identities
          <button style={{ border: 'none', background: 'transparent', fontSize: '1.2rem', cursor: 'pointer', color: '#666' }}>+</button>
        </div>

        {user?.email && (
          <div className="identity-card">
            <div className="identity-left">
              <div className="identity-icon" style={{ background: '#333', color: 'white' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <div className="identity-email">{user.email}</div>
                <div className="identity-provider">Email / Password Auth</div>
              </div>
            </div>
            <button className="btn-login-status" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Active</button>
          </div>
        )}
      </main>
    </div>
  );
}
