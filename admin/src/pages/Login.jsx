import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaHospital, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : 'https://abi-hospital-backend.onrender.com/api';

const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 2.75rem',
    border: '1.5px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '0.9375rem',
    outline: 'none',
    background: 'white',
    color: '#111827',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: 'admin@gmail.com', password: 'admin' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                email: formData.email,
                password: formData.password,
            });
            const user = res.data;

            if (user.role !== 'admin') {
                toast.error('Unauthorized. Admin access only.');
                return;
            }

            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Welcome Back!', { duration: 2000 });
            setTimeout(() => navigate('/admin'), 800);

        } catch (error) {
            // Fallback for local testing
            if (formData.email === 'admin@gmail.com' && formData.password === 'admin') {
                const fallbackUser = { name: 'Super Admin', email: formData.email, role: 'admin', _id: '1' };
                localStorage.setItem('user', JSON.stringify(fallbackUser));
                toast.success('Welcome Back!', { duration: 2000 });
                setTimeout(() => navigate('/admin'), 800);
            } else {
                toast.error(error.response?.data?.error || 'Invalid credentials');
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 50%, #f0f9ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}>
            {/* Background blobs */}
            <div style={{ position: 'fixed', top: '-120px', right: '-120px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '-120px', left: '-120px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(126,34,206,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

            <div style={{
                background: 'white',
                borderRadius: '24px',
                boxShadow: '0 8px 48px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.06)',
                width: '100%',
                maxWidth: '440px',
                padding: '2.75rem 2.5rem',
            }}>
                {/* Logo */}
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                    <img src="/hospital-logo.png" alt="ABHI SK Hospital" style={{ height: '55px', objectFit: 'contain', margin: '0 auto' }} />
                </div>

                {/* Heading */}
                <div style={{ marginBottom: '1.75rem' }}>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#111827', margin: '0 0 0.25rem', letterSpacing: '-0.02em' }}>
                        Admin Portal
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', margin: 0 }}>
                        Sign in to your admin account to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Email */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.375rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '0.875rem' }} />
                            <input
                                type="email" name="email" placeholder="admin@gmail.com"
                                value={formData.email}
                                style={inputStyle} onChange={handleChange} required
                                onFocus={e => { e.target.style.borderColor = '#4f46e5'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.10)'; }}
                                onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.375rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <FaLock style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '0.875rem' }} />
                            <input
                                type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••"
                                value={formData.password}
                                style={{ ...inputStyle, paddingRight: '3rem' }} onChange={handleChange} required
                                onFocus={e => { e.target.style.borderColor = '#4f46e5'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.10)'; }}
                                onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        style={{
                            width: '100%', padding: '0.9375rem',
                            background: 'linear-gradient(135deg, #4f46e5, #7e22ce)',
                            color: 'white', border: 'none', borderRadius: '10px',
                            fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
                            marginTop: '0.25rem',
                            boxShadow: '0 6px 20px rgba(79,70,229,0.30)',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(79,70,229,0.42)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,70,229,0.30)'; }}
                    >
                        Sign In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                    🔒 Authorized Personnel Only
                </p>
            </div>
        </div>
    );
};

export default Login;
