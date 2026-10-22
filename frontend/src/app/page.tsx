'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* ────────────────────────────── HEADER ────────────────────────────── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.5rem 4rem', maxWidth: '1440px', margin: '0 auto',
        position: 'sticky', top: 0, background: 'rgba(248,249,250,0.85)',
        backdropFilter: 'blur(12px)', zIndex: 100
      }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--green-primary)', letterSpacing: '-0.5px' }}>
          🛡️ DeepShield
        </div>
        <nav style={{ display: 'flex', gap: '2.5rem', fontSize: '0.95rem', color: '#495057' }}>
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#technology">Technology</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
        <Link href="/login" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Start →
        </Link>
      </header>

      {/* ────────────────────────────── HERO ────────────────────────────── */}
      <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem', position: 'relative' }}>
        <div className="bg-swirl"></div>

        {/* Floating Glass Icons */}
        <div className="glass-icon" style={{ left: '8%', top: '30%' }}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 22S4 17 4 9V5L12 2L20 5V9C20 17 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="glass-icon" style={{ right: '8%', top: '40%', animationDelay: '1s' }}>
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div className="glass-icon" style={{ left: '15%', bottom: '15%', animationDelay: '2s' }}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
        </div>
        <div className="glass-icon" style={{ right: '12%', bottom: '20%', animationDelay: '3s' }}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        <div className="animate-fade-in" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(93,185,136,0.1)', border: '1px solid rgba(93,185,136,0.25)',
            color: 'var(--green-primary)', padding: '6px 18px', borderRadius: '9999px',
            fontFamily: "'Inter', monospace", fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '2rem'
          }}>
            ✦ AI-Powered Media Verification
          </div>

          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2.8rem,5vw,4.5rem)', fontWeight: 700, color: '#133026', lineHeight: 1.12, letterSpacing: '-0.03em', marginBottom: '1.5rem', maxWidth: '850px' }}>
            Deepfake detection,<br/>support, growth —<br/>
            <span style={{ color: 'var(--green-primary)' }}>all in one window</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#6c757d', maxWidth: '560px', lineHeight: 1.7, marginBottom: '2.5rem', margin: '0 auto 2.5rem' }}>
            DeepShield uses multimodal AI — vision models, Grad-CAM explainability,
            facial landmark analysis, and blockchain-secured logging — to verify
            the authenticity of digital media.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <Link href="/login" className="btn btn-primary" style={{ fontSize: '1rem' }}>
              Get started free
            </Link>
            <Link href="/login" className="btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '5rem' }}>
            {[
              { val: '99.2%', label: 'Detection Accuracy' },
              { val: '15K+', label: 'Videos Analyzed' },
              { val: '<3s', label: 'Avg Processing' },
              { val: '256-bit', label: 'Blockchain Logging' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: 700, color: '#133026' }}>{s.val}</div>
                <div style={{ fontSize: '0.85rem', color: '#6c757d', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────── FEATURES ────────────────────────────── */}
      <section id="features" style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green-primary)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '1rem' }}>Features</div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 700, color: '#133026', marginBottom: '1rem' }}>Everything you need to fight deepfakes</h2>
          <p style={{ fontSize: '1.05rem', color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>Our comprehensive suite of AI-powered tools gives you the confidence to verify any media.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {[
            { icon: '🧠', title: 'MobileNetV2 Classifier', desc: 'State-of-the-art deep learning model trained on 100K+ deepfake and authentic video samples with transfer learning.' },
            { icon: '🔥', title: 'Grad-CAM Explainability', desc: 'Visual heatmaps showing exactly which regions of each frame triggered the AI, making results interpretable and trustworthy.' },
            { icon: '📐', title: 'Face Mesh Analysis', desc: 'MediaPipe-powered 468-point facial landmark detection to catch subtle geometric inconsistencies in manipulated faces.' },
            { icon: '⛓️', title: 'Blockchain Audit Trail', desc: 'Every scan is permanently logged with a SHA-256 hash to an immutable ledger for tamper-proof forensic records.' },
            { icon: '⚡', title: 'Real-Time Processing', desc: 'Optimized pipeline processes videos in under 3 seconds, enabling instant verification at scale for enterprise use cases.' },
            { icon: '📊', title: 'Confidence Scoring', desc: 'Probabilistic confidence scores with detailed breakdowns across multiple detection modalities for nuanced decision-making.' }
          ].map((f, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: '1.25rem', padding: '2.5rem 2rem',
              border: '1px solid rgba(0,0,0,0.04)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'; }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'Outfit', fontSize: '1.2rem', fontWeight: 600, color: '#133026', marginBottom: '0.75rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#6c757d', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────── HOW IT WORKS ────────────────────────────── */}
      <section id="how-it-works" style={{ padding: '8rem 4rem', background: 'linear-gradient(180deg, #f0faf4 0%, #f8f9fa 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green-primary)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '1rem' }}>How It Works</div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 700, color: '#133026', marginBottom: '1rem' }}>Three simple steps to verify any media</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            {[
              { step: '01', title: 'Upload', desc: 'Drop your video file into our secure upload zone. We support MP4, AVI, MOV and more.' },
              { step: '02', title: 'Analyze', desc: 'Our AI pipeline runs MobileNetV2 classification, Grad-CAM heatmaps, and facial mesh analysis in parallel.' },
              { step: '03', title: 'Verify', desc: 'Get instant results with a confidence score, visual explainability, and a blockchain-logged audit trail.' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: i === 1 ? 'var(--green-gradient)' : 'white',
                  color: i === 1 ? 'white' : 'var(--green-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Outfit', fontSize: '1.5rem', fontWeight: 700,
                  margin: '0 auto 1.5rem',
                  boxShadow: i === 1 ? '0 8px 25px rgba(93,185,136,0.4)' : '0 4px 15px rgba(0,0,0,0.06)',
                  border: i === 1 ? 'none' : '1px solid rgba(0,0,0,0.06)'
                }}>
                  {s.step}
                </div>
                <h3 style={{ fontFamily: 'Outfit', fontSize: '1.3rem', fontWeight: 600, color: '#133026', marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#6c757d', lineHeight: 1.6, maxWidth: '300px', margin: '0 auto' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────── TECHNOLOGY ────────────────────────────── */}
      <section id="technology" style={{ padding: '8rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green-primary)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '1rem' }}>Technology Stack</div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 700, color: '#133026', marginBottom: '1.5rem', lineHeight: 1.15 }}>Built on proven,<br/>enterprise-grade AI</h2>
            <p style={{ fontSize: '1.05rem', color: '#6c757d', lineHeight: 1.7, marginBottom: '2rem' }}>
              Our detection pipeline combines multiple AI modalities for maximum accuracy. Each layer independently verifies media authenticity, reducing false positives to near zero.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { label: 'MobileNetV2', pct: 99 },
                { label: 'Grad-CAM XAI', pct: 95 },
                { label: 'Face Mesh', pct: 92 },
                { label: 'Blockchain Hash', pct: 100 }
              ].map((t, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 500, color: '#333' }}>
                    <span>{t.label}</span><span>{t.pct}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#e9ecef', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${t.pct}%`, height: '100%', background: 'var(--green-gradient)', borderRadius: '4px', transition: 'width 1s ease' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #e8f5ee 0%, #dceee4 100%)',
            borderRadius: '2rem', padding: '3rem', minHeight: '500px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', width: '100%', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Sample Detection Result</div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ flex: 1, background: '#f0faf4', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>98.7%</div>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Confidence</div>
                </div>
                <div style={{ flex: 1, background: '#fef3c7', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#d97706' }}>REAL</div>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>Verdict</div>
                </div>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', width: '100%' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Blockchain Receipt</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#6c757d', background: '#f8f9fa', padding: '0.75rem', borderRadius: '8px', wordBreak: 'break-all' as const }}>
                0x7f3a...e4b2 → Block #1847 → SHA-256 verified ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────── TESTIMONIALS ────────────────────────────── */}
      <section id="testimonials" style={{ padding: '8rem 4rem', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--green-primary)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '1rem' }}>Testimonials</div>
            <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 700, color: '#133026' }}>Trusted by industry leaders</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { name: 'Sarah Chen', role: 'Head of Trust & Safety, MediaCorp', quote: 'DeepShield has transformed how we verify user-generated content. The Grad-CAM heatmaps give our moderation team unprecedented visibility.' },
              { name: 'James Rodriguez', role: 'CTO, VerifyFirst', quote: 'The blockchain audit trail is a game-changer for legal compliance. We can prove chain-of-custody for every piece of media we verify.' },
              { name: 'Dr. Priya Patel', role: 'AI Research Lead, Oxford', quote: 'The multi-modal approach combining CNNs with face mesh analysis achieves accuracy rates that rival dedicated research systems.' }
            ].map((t, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: '1.25rem', padding: '2.5rem',
                border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
              }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--green-primary)', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ fontSize: '0.95rem', color: '#495057', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{t.quote}"</p>
                <div>
                  <div style={{ fontWeight: 600, color: '#133026' }}>{t.name}</div>
                  <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────── CTA ────────────────────────────── */}
      <section style={{
        padding: '6rem 4rem', textAlign: 'center',
        background: 'linear-gradient(135deg, #133026 0%, #1a4a35 100%)', color: 'white'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Ready to protect your media?</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Join thousands of organizations using DeepShield to verify authenticity and fight misinformation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/login" style={{
              background: 'var(--green-gradient)', color: 'white', padding: '1rem 2.5rem',
              borderRadius: '9999px', fontWeight: 600, fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(93,185,136,0.4)', transition: 'all 0.2s'
            }}>
              Start Free Trial →
            </Link>
            <a href="#features" style={{
              border: '1px solid rgba(255,255,255,0.3)', padding: '1rem 2rem',
              borderRadius: '9999px', fontWeight: 500, fontSize: '1rem',
              color: 'rgba(255,255,255,0.9)', transition: 'all 0.2s'
            }}>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────────────────── FOOTER ────────────────────────────── */}
      <footer id="contact" style={{ padding: '4rem', background: '#111', color: 'rgba(255,255,255,0.6)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem' }}>
          <div>
            <div style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>🛡️ DeepShield</div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
              AI-powered deepfake detection platform with blockchain-secured audit trails. Protecting media authenticity worldwide.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#technology">Technology</a>
              <Link href="/login">Dashboard</Link>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', textAlign: 'center' }}>
          © 2026 DeepShield. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
