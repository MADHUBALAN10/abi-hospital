import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaHospital, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaGoogle, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

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
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post(`${API_URL}/auth/google`, { access_token: tokenResponse.access_token });
                const user = res.data;
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('Welcome back to ABHI SK Hospital!', { duration: 3000 });
                setTimeout(() => {
                    if (user.role === 'doctor') navigate('/doctor');
                    else if (user.role === 'admin') window.location.href = 'https://abi-hospital-admin.vercel.app/';
                    else navigate('/patient');
                }, 800);
            } catch (error) {
                toast.error(error.response?.data?.error || 'Failed to authenticate with Google');
            }
        },
        onError: () => toast.error('Google authorization failed or was closed.')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegister && formData.password !== formData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            const endpoint = isRegister ? `${API_URL}/auth/register` : `${API_URL}/auth/login`;
            const payload = isRegister
                ? { name: formData.name, email: formData.email, password: formData.password, role: 'patient', phone: formData.phone }
                : { email: formData.email, password: formData.password };

            const res = await axios.post(endpoint, payload);
            const user = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            toast.success(isRegister ? 'Welcome to ABHI SK Hospital!' : 'Welcome Back!', { duration: 3000 });
            setTimeout(() => {
                if (user.role === 'doctor') navigate('/doctor');
                else if (user.role === 'admin') window.location.href = 'https://abi-hospital-admin.vercel.app/';
                else navigate('/patient');
            }, 800);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0f9ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif"
        }}>
            {/* Subtle background blobs */}
            <div style={{ position: 'fixed', top: '-120px', right: '-120px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '-120px', left: '-120px', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

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
                        {isRegister ? 'Create Account' : 'Welcome back'}
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', margin: 0 }}>
                        {isRegister ? 'Sign up to get started' : 'Sign in to your account to continue'}
                    </p>
                </div>

                {/* Google Login */}
                {!isRegister && (
                    <>
                        <button
                            type="button"
                            onClick={() => handleGoogleLogin()}
                            style={{
                                width: '100%', padding: '0.875rem', border: '1.5px solid #e5e7eb',
                                borderRadius: '10px', background: '#e0f2fe', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem',
                                fontSize: '0.9375rem', fontWeight: '600', color: '#374151',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                                marginBottom: '1.25rem',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#7c3aed'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <FaGoogle style={{ color: '#ea4335', fontSize: '1.1rem' }} />
                            Continue with Google
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                            <span style={{ color: '#9ca3af', fontSize: '0.8125rem', fontWeight: '500' }}>or</span>
                            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
                        </div>
                    </>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Name - register only */}
                    {isRegister && (
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.375rem' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '0.875rem' }} />
                                <input
                                    type="text" name="name" placeholder="John Doe"
                                    style={inputStyle} onChange={handleChange} required
                                    onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Phone - register only */}
                    {isRegister && (
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.375rem' }}>Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <FaPhone style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '0.875rem' }} />
                                <input
                                    type="tel" name="phone" placeholder="+1 (555) 000-0000"
                                    style={inputStyle} onChange={handleChange} required
                                    onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.375rem' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '0.875rem' }} />
                            <input
                                type="email" name="email" placeholder="you@example.com"
                                style={inputStyle} onChange={handleChange} required
                                onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
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
                                style={{ ...inputStyle, paddingRight: '3rem' }} onChange={handleChange} required
                                onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
                                onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password - register only */}
                    {isRegister && (
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.375rem' }}>Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: '0.875rem' }} />
                                <input
                                    type={showConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="••••••••"
                                    style={{ ...inputStyle, paddingRight: '3rem' }} onChange={handleChange} required
                                    onFocus={e => { e.target.style.borderColor = '#7c3aed'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'; }}
                                    onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }}
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}>
                                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        style={{
                            width: '100%', padding: '0.9375rem',
                            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                            color: 'white', border: 'none', borderRadius: '10px',
                            fontSize: '1rem', fontWeight: '700', cursor: 'pointer',
                            marginTop: '0.25rem',
                            boxShadow: '0 6px 20px rgba(124,58,237,0.30)',
                            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(124,58,237,0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.30)'; }}
                    >
                        {isRegister ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                {/* Toggle login/register */}
                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9375rem', color: '#6b7280' }}>
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        onClick={() => setIsRegister(!isRegister)}
                        style={{ background: 'none', border: 'none', color: '#7c3aed', fontWeight: '700', cursor: 'pointer', fontSize: '0.9375rem', textDecoration: 'none' }}
                        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >
                        {isRegister ? 'Sign In' : 'Create Account'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
