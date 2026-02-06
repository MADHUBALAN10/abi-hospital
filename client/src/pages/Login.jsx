import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser, FaLock, FaHospital, FaArrowRight, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [role, setRole] = useState('patient');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Generate a valid MongoDB ObjectId format (24 hex characters)
            const generateObjectId = () => {
                const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
                const randomHex = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                return timestamp + randomHex() + randomHex() + randomHex().substring(0, 2);
            };

            const mockUser = {
                name: formData.name || 'User',
                email: formData.email,
                role: role,
                _id: generateObjectId()
            };

            if (!isRegister && formData.email.includes('admin')) mockUser.role = 'admin';

            localStorage.setItem('user', JSON.stringify(mockUser));
            toast.success(isRegister ? 'Welcome to MediCare+!' : 'Welcome Back!', {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: 'linear-gradient(135deg, #0891b2, #3b82f6)',
                    color: 'white',
                    fontWeight: '600',
                    padding: '16px 24px',
                    borderRadius: '12px'
                }
            });

            setTimeout(() => {
                if (mockUser.role === 'admin') navigate('/admin');
                else navigate('/patient');
            }, 800);

        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(8, 145, 178, 0.15), transparent 70%)',
                borderRadius: '50%',
                zIndex: -1
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
                borderRadius: '50%',
                zIndex: -1
            }}></div>

            <div className="glass shadow-hard animate-fade-in" style={{
                width: '100%',
                maxWidth: '1000px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                borderRadius: '2rem',
                overflow: 'hidden'
            }}>

                {/* Left Side - Branding */}
                <div style={{
                    background: 'linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)',
                    padding: '3rem',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Pattern Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}></div>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            marginBottom: '2rem'
                        }}>
                            <FaHospital />
                        </div>

                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            marginBottom: '1rem',
                            lineHeight: '1.2'
                        }}>
                            Manage your health<br />with confidence.
                        </h2>

                        <p style={{
                            fontSize: '1.125rem',
                            opacity: 0.9,
                            lineHeight: '1.7'
                        }}>
                            Join thousands of patients and healthcare managers trusting our platform for seamless healthcare management.
                        </p>
                    </div>

                    <div className="glass" style={{
                        position: 'relative',
                        zIndex: 1,
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: 'rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(16, 185, 129, 0.9)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem'
                        }}>
                            <FaShieldAlt />
                        </div>
                        <div>
                            <p style={{ fontWeight: '700', marginBottom: '0.25rem' }}>100% Secure</p>
                            <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>End-to-end Encryption</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div style={{
                    padding: '3rem',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px)'
                }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            marginBottom: '0.5rem',
                            color: '#0f172a'
                        }}>
                            {isRegister ? 'Get Started' : 'Welcome Back'}
                        </h3>
                        <p style={{ color: '#64748b' }}>
                            {isRegister ? 'Create your account in seconds.' : 'Please enter your details to login.'}
                        </p>
                    </div>

                    {/* Role Selector */}
                    {isRegister && (
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            padding: '0.5rem',
                            background: '#f1f5f9',
                            borderRadius: '12px',
                            marginBottom: '2rem'
                        }}>
                            {['patient', 'admin'].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        border: 'none',
                                        background: role === r ? 'white' : 'transparent',
                                        color: role === r ? '#0891b2' : '#64748b',
                                        fontWeight: role === r ? '700' : '500',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        boxShadow: role === r ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                        textTransform: 'capitalize',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {isRegister && (
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94a3b8',
                                    zIndex: 1
                                }} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="input"
                                    style={{ paddingLeft: '3rem' }}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div style={{ position: 'relative' }}>
                            <FaEnvelope style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8',
                                zIndex: 1
                            }} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="input"
                                style={{ paddingLeft: '3rem' }}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <FaLock style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8',
                                zIndex: 1
                            }} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input"
                                style={{ paddingLeft: '3rem' }}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem',
                            marginTop: '0.5rem'
                        }}>
                            {isRegister ? 'Create Account' : 'Sign In'} <FaArrowRight />
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                type="button"
                                onClick={() => setIsRegister(!isRegister)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#0891b2',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}
                            >
                                {isRegister ? 'Log in' : 'Register'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
