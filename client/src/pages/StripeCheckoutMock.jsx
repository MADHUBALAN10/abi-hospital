import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

/* ──────────────────────────────────────────────
   Tiny QR code using the free qrcode.react lib
   We use the Google Chart API as a zero-dep fallback
──────────────────────────────────────────────── */
const QRImage = ({ value, size = 200 }) => {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&margin=10&format=png`;
  return (
    <img
      src={url}
      alt="UPI QR Code"
      width={size}
      height={size}
      style={{ borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
    />
  );
};

/* ──────────────────────────────────────────────
   Timer countdown component
──────────────────────────────────────────────── */
const Countdown = ({ seconds, onDone }) => {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onDone && onDone(); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const m = String(Math.floor(left / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700, color: left < 60 ? '#ef4444' : '#6366f1' }}>
      {m}:{s}
    </span>
  );
};

const CARD_TAB = 'card';
const UPI_TAB  = 'upi';
const NET_TAB  = 'net';

const UPI_APPS = [
  { id: 'gpay',    label: 'Google Pay',  emoji: '🟢', color: '#34a853' },
  { id: 'phonepe', label: 'PhonePe',     emoji: '🟣', color: '#5f259f' },
  { id: 'paytm',   label: 'Paytm',       emoji: '🔵', color: '#00BAF2' },
  { id: 'bhim',    label: 'BHIM UPI',    emoji: '🇮🇳', color: '#f15a29' },
];

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'];

const MERCHANT_UPI = 'abhiskhospital@upi'; // change to real UPI ID in production

const PaymentGateway = () => {
  const [searchParams] = useSearchParams();
  const amount     = searchParams.get('amount')     || '500';
  const doctorName = searchParams.get('doctorName') || 'Doctor';
  const successUrl = searchParams.get('successUrl') || '/';
  const cancelUrl  = searchParams.get('cancelUrl')  || '/';

  const displayAmount = parseInt(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  const numAmount     = parseInt(amount);

  const [tab, setTab]               = useState(CARD_TAB);
  const [loading, setLoading]       = useState(false);
  const [paid, setPaid]             = useState(false);

  /* UPI states */
  const [upiMode, setUpiMode]       = useState('app');   // 'app' | 'qr' | 'id'
  const [selectedApp, setSelectedApp] = useState(null);
  const [upiId, setUpiId]           = useState('');
  const [upiIdValid, setUpiIdValid] = useState(false);
  const [qrShown, setQrShown]       = useState(false);
  const [qrExpired, setQrExpired]   = useState(false);

  /* Net banking */
  const [selectedBank, setSelectedBank] = useState('');

  /* UPI ID - basic validation */
  useEffect(() => {
    setUpiIdValid(/^[\w.\-]+@[\w]+$/.test(upiId.trim()));
  }, [upiId]);

  /* build UPI deep-link / payment string */
  const upiPayString = `upi://pay?pa=${MERCHANT_UPI}&pn=ABHI+SK+HOSPITAL&am=${numAmount}&cu=INR&tn=Consultation+with+${encodeURIComponent(doctorName)}`;

  const simulatePay = () => {
    setLoading(true);
    setTimeout(() => { window.location.href = successUrl; }, 1800);
  };

  const handleQrSuccess = () => {
    // Simulate user scanned & paid
    setLoading(true);
    setTimeout(() => { window.location.href = successUrl; }, 1200);
  };

  /* ── Paid overlay ─────────────────────────── */
  if (paid) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4', fontFamily }}>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#15803d', fontSize: '1.75rem', fontWeight: 800 }}>Payment Successful!</h2>
          <p style={{ color: '#4b5563', marginTop: '0.5rem' }}>Redirecting…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f6f9fc', fontFamily }}>

      {/* ── Left – Order summary ──────────────── */}
      <div style={{ flex: 1, padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', background: '#f6f9fc' }}>
        <div style={{ maxWidth: 380, width: '100%' }}>

          {/* Hospital brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🏥</span>
            <span style={{ fontWeight: 700, color: '#1a1f36', fontSize: '1.05rem' }}>ABHI SK HOSPITAL</span>
            <span style={{ background: '#e3e8ee', padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 700, color: '#4f566b', letterSpacing: '0.04em' }}>
              TEST MODE
            </span>
          </div>

          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '0.4rem' }}>Consultation with</p>
          <p style={{ color: '#111827', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.25rem' }}>Dr. {doctorName}</p>

          <div style={{ fontSize: '2.8rem', fontWeight: 900, color: '#111827', letterSpacing: '-1.5px', marginBottom: '1.5rem' }}>
            {displayAmount}
          </div>

          <div style={{ borderTop: '1px solid #e3e8ee', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280', fontWeight: 600 }}>Total due</span>
            <span style={{ color: '#111827', fontWeight: 700 }}>{displayAmount}</span>
          </div>

          {/* Security note */}
          <div style={{ marginTop: '2.5rem', background: '#eff6ff', borderRadius: 10, padding: '0.9rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ fontSize: '1rem', marginTop: '1px' }}>🔒</span>
            <p style={{ fontSize: '0.8rem', color: '#3b82f6', lineHeight: 1.5 }}>
              Your payment is secured using 256-bit SSL encryption.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right – Payment form ──────────────── */}
      <div style={{ flex: 1, background: 'white', padding: '3rem 2.5rem', boxShadow: '-8px 0 30px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 420, width: '100%' }}>

          {/* Method tabs */}
          <div style={{ display: 'flex', gap: 0, background: '#f1f5f9', borderRadius: 10, padding: 4, marginBottom: '2rem' }}>
            {[
              { id: CARD_TAB, label: '💳 Card' },
              { id: UPI_TAB,  label: '📲 UPI' },
              { id: NET_TAB,  label: '🏦 Net Banking' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.4rem',
                  borderRadius: 7,
                  border: 'none',
                  background: tab === id ? 'white' : 'transparent',
                  color: tab === id ? '#111827' : '#6b7280',
                  fontWeight: tab === id ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: tab === id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.2s',
                }}
              >{label}</button>
            ))}
          </div>

          {/* ── CARD FORM ── */}
          {tab === CARD_TAB && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '1.25rem' }}>Pay with Card</h3>

              <Field label="Email">
                <input type="email" defaultValue="patient@example.com" style={inputSt} />
              </Field>

              <Field label="Card information">
                <div style={{ border: '1px solid #d1d5db', borderRadius: 6, overflow: 'hidden' }}>
                  <input type="text" defaultValue="4242 4242 4242 4242" placeholder="Card number" style={{ ...inputSt, border: 'none', borderBottom: '1px solid #d1d5db', borderRadius: 0 }} />
                  <div style={{ display: 'flex' }}>
                    <input type="text" defaultValue="12/24" placeholder="MM / YY" style={{ ...inputSt, border: 'none', borderRight: '1px solid #d1d5db', borderRadius: 0, width: '50%' }} />
                    <input type="text" defaultValue="123" placeholder="CVC" style={{ ...inputSt, border: 'none', borderRadius: 0, width: '50%' }} />
                  </div>
                </div>
              </Field>

              <Field label="Name on card">
                <input type="text" defaultValue="Jane Doe" style={inputSt} />
              </Field>

              <Field label="Country">
                <select style={{ ...inputSt, backgroundColor: 'white' }}>
                  <option>India</option>
                  <option>United States</option>
                </select>
              </Field>

              <PayButton loading={loading} onClick={simulatePay} label={`Pay ${displayAmount}`} color="#0070f3" />
            </div>
          )}

          {/* ── UPI FORM ── */}
          {tab === UPI_TAB && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Pay via UPI</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Choose your preferred UPI method</p>

              {/* Sub-tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'app', label: '📱 UPI Apps' },
                  { id: 'qr',  label: '🔲 Scan QR' },
                  { id: 'id',  label: '🆔 UPI ID' },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => { setUpiMode(id); setQrShown(false); setQrExpired(false); }}
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.3rem',
                      borderRadius: 8,
                      border: `2px solid ${upiMode === id ? '#6366f1' : '#e5e7eb'}`,
                      background: upiMode === id ? '#eef2ff' : 'white',
                      color: upiMode === id ? '#4f46e5' : '#6b7280',
                      fontWeight: upiMode === id ? 700 : 500,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >{label}</button>
                ))}
              </div>

              {/* UPI Apps */}
              {upiMode === 'app' && (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {UPI_APPS.map(app => (
                      <button
                        key={app.id}
                        onClick={() => setSelectedApp(app.id)}
                        style={{
                          padding: '0.9rem',
                          borderRadius: 10,
                          border: `2px solid ${selectedApp === app.id ? app.color : '#e5e7eb'}`,
                          background: selectedApp === app.id ? app.color + '14' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          transition: 'all 0.2s',
                        }}
                      >
                        <span style={{ fontSize: '1.4rem' }}>{app.emoji}</span>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: selectedApp === app.id ? app.color : '#374151' }}>{app.label}</span>
                        {selectedApp === app.id && <span style={{ marginLeft: 'auto', color: app.color, fontSize: '1rem' }}>✓</span>}
                      </button>
                    ))}
                  </div>

                  {selectedApp && (
                    <div style={{ background: '#faf5ff', borderRadius: 10, padding: '0.9rem 1rem', marginBottom: '1.2rem', border: '1px solid #e9d5ff', fontSize: '0.82rem', color: '#7c3aed' }}>
                      ℹ️ You will be redirected to <strong>{UPI_APPS.find(a => a.id === selectedApp)?.label}</strong> to complete the payment.
                    </div>
                  )}

                  <PayButton
                    loading={loading}
                    onClick={selectedApp ? simulatePay : null}
                    label={`Pay ${displayAmount} via ${UPI_APPS.find(a => a.id === selectedApp)?.label || 'UPI App'}`}
                    color="#6366f1"
                    disabled={!selectedApp}
                  />
                </div>
              )}

              {/* QR Code */}
              {upiMode === 'qr' && (
                <div style={{ textAlign: 'center' }}>
                  {!qrShown ? (
                    <div>
                      <p style={{ color: '#374151', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        A QR code will be generated for <strong>{displayAmount}</strong>. Scan it with any UPI app.
                      </p>
                      <button
                        onClick={() => { setQrShown(true); setQrExpired(false); }}
                        style={{ padding: '0.85rem 2rem', borderRadius: 8, border: 'none', background: '#6366f1', color: 'white', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}
                      >
                        🔲 Generate QR Code
                      </button>
                    </div>
                  ) : qrExpired ? (
                    <div>
                      <p style={{ color: '#ef4444', fontWeight: 700, marginBottom: '1rem' }}>⏰ QR Code expired</p>
                      <button onClick={() => { setQrShown(false); setQrExpired(false); }} style={{ padding: '0.75rem 1.5rem', borderRadius: 8, border: 'none', background: '#6366f1', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
                        🔄 Regenerate QR
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                        <QRImage value={upiPayString} size={200} />
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                        Scan with Google Pay, PhonePe, Paytm or any UPI app
                      </p>
                      <p style={{ fontSize: '0.82rem', color: '#374151', marginBottom: '0.35rem' }}>
                        UPI ID: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>{MERCHANT_UPI}</code>
                      </p>
                      <p style={{ fontSize: '0.82rem', color: '#374151', marginBottom: '1.2rem' }}>
                        Expires in  <Countdown seconds={300} onDone={() => setQrExpired(true)} />
                      </p>

                      {/* Simulate "I have paid" */}
                      <button
                        onClick={handleQrSuccess}
                        disabled={loading}
                        style={{ width: '100%', padding: '0.9rem', borderRadius: 8, border: 'none', background: loading ? '#a5b4fc' : '#6366f1', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}
                      >
                        {loading ? '⏳ Verifying…' : '✅ I have paid'}
                      </button>
                      <p style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '0.5rem' }}>Click after scanning and completing payment</p>
                    </div>
                  )}
                </div>
              )}

              {/* Manual UPI ID */}
              {upiMode === 'id' && (
                <div>
                  <Field label="Enter your UPI ID">
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        style={{
                          ...inputSt,
                          borderColor: upiId ? (upiIdValid ? '#22c55e' : '#ef4444') : '#d1d5db',
                          paddingRight: '2.5rem',
                        }}
                      />
                      {upiId && (
                        <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem' }}>
                          {upiIdValid ? '✅' : '❌'}
                        </span>
                      )}
                    </div>
                  </Field>
                  <p style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: '1.25rem' }}>
                    Example: mobilenumber@paytm, name@oksbi, name@ybl
                  </p>

                  {upiIdValid && (
                    <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1rem', border: '1px solid #bbf7d0', fontSize: '0.83rem', color: '#15803d' }}>
                      ✔️ Sending <strong>{displayAmount}</strong> to <strong>{MERCHANT_UPI}</strong> from <strong>{upiId}</strong>
                    </div>
                  )}

                  <PayButton
                    loading={loading}
                    onClick={upiIdValid ? simulatePay : null}
                    label={`Pay ${displayAmount}`}
                    color="#6366f1"
                    disabled={!upiIdValid}
                  />
                </div>
              )}
            </div>
          )}

          {/* ── NET BANKING FORM ── */}
          {tab === NET_TAB && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>Net Banking</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Select your bank to continue</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {BANKS.map(bank => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 8,
                      border: `2px solid ${selectedBank === bank ? '#0891b2' : '#e5e7eb'}`,
                      background: selectedBank === bank ? '#e0f2fe' : 'white',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: selectedBank === bank ? 700 : 500,
                      color: selectedBank === bank ? '#0369a1' : '#374151',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    🏦 {bank}
                  </button>
                ))}
              </div>

              {selectedBank && (
                <div style={{ background: '#f0f9ff', borderRadius: 10, padding: '0.9rem 1rem', marginBottom: '1.2rem', border: '1px solid #bae6fd', fontSize: '0.83rem', color: '#0369a1' }}>
                  ℹ️ You will be redirected to <strong>{selectedBank}</strong> secure portal to complete the payment.
                </div>
              )}

              <PayButton
                loading={loading}
                onClick={selectedBank ? simulatePay : null}
                label={`Pay ${displayAmount} via Net Banking`}
                color="#0891b2"
                disabled={!selectedBank}
              />
            </div>
          )}

          {/* Cancel */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              onClick={() => window.location.href = cancelUrl}
              style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
            >
              Cancel and return
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid #f3f4f6', paddingTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {['🔒 SSL Secured', '🛡️ PCI DSS', '✅ RBI Compliant'].map(b => (
              <span key={b} style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .pay-spinner {
          width: 20px; height: 20px;
          border: 3px solid rgba(255,255,255,0.35);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @media (max-width: 720px) {
          body > div > div { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
};

/* ── Small helper components ── */
const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const inputSt = {
  width: '100%',
  padding: '0.72rem 0.85rem',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily,
  transition: 'border 0.2s',
};

const Field = ({ label, children }) => (
  <div style={{ marginBottom: '1.1rem' }}>
    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>{label}</label>
    {children}
  </div>
);

const PayButton = ({ loading, onClick, label, color = '#0070f3', disabled }) => (
  <button
    onClick={!disabled && !loading ? onClick : undefined}
    style={{
      width: '100%',
      padding: '0.95rem',
      background: disabled ? '#d1d5db' : color,
      color: disabled ? '#9ca3af' : 'white',
      border: 'none',
      borderRadius: 7,
      fontSize: '1rem',
      fontWeight: 700,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.2s',
      boxShadow: disabled ? 'none' : `0 4px 14px ${color}55`,
    }}
  >
    {loading ? <span className="pay-spinner" /> : label}
  </button>
);

export default PaymentGateway;
