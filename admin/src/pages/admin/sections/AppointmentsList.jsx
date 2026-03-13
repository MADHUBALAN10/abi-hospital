import React, { useState, useMemo } from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaCalendarAlt, FaSearch, FaUserMd } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : 'https://abi-hospital-backend.onrender.com/api';

const AppointmentsList = ({ appointments, onRefresh }) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all'); // all | pending | confirmed | completed | cancelled
    const [loadingId, setLoadingId] = useState(null);

    const filtered = useMemo(() => {
        let data = appointments;
        if (filter !== 'all') {
            data = data.filter((a) => (a.status || 'Pending').toLowerCase() === filter.toLowerCase());
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter((a) =>
                (a.patientId?.name || '').toLowerCase().includes(q) ||
                (a.doctorId?.userId?.name || '').toLowerCase().includes(q)
            );
        }
        return data;
    }, [appointments, filter, search]);

    const handleUpdateStatus = async (id, newStatus) => {
        setLoadingId(id);
        try {
            await axios.put(`${API_URL}/appointments/${id}`, { status: newStatus });
            toast.success(`Appointment marked as ${newStatus}`);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update appointment status');
        }
        setLoadingId(null);
    };

    const statusBadge = (s) => {
        const sLower = (s || 'pending').toLowerCase();
        if (sLower === 'confirmed' || sLower === 'approved') return { label: 'Confirmed', bg: '#dbeafe', color: '#1e40af' };
        if (sLower === 'completed') return { label: 'Completed', bg: '#d1fae5', color: '#065f46' };
        if (sLower === 'cancelled') return { label: 'Cancelled', bg: '#fee2e2', color: '#991b1b' };
        return { label: 'Pending', bg: '#fef3c7', color: '#92400e' };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="admin-glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaCalendarAlt style={{ color: '#4f46e5' }} /> Appointments Management
                        </h3>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                            {appointments.length} total appointments
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.8rem' }} />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name..."
                                style={{ paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: '0.875rem', outline: 'none', background: '#f8fafc', width: 210, color: '#0f172a' }}
                            />
                        </div>

                        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 10, padding: 3, gap: 2 }}>
                            {['all', 'pending', 'confirmed', 'cancelled'].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setFilter(val)}
                                    style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem', background: filter === val ? 'white' : 'transparent', color: filter === val ? '#4f46e5' : '#64748b', boxShadow: filter === val ? '0 1px 4px rgba(0,0,0,.08)' : 'none', transition: 'all 0.15s', textTransform: 'capitalize' }}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📅</div>
                        <p style={{ fontWeight: 600, fontSize: '1rem' }}>No appointments found</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <div className="table-responsive"><table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderRadius: 10 }}>
                                    <th style={{ padding: '11px 14px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Patient</th>
                                    <th style={{ padding: '11px 14px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Doctor</th>
                                    <th style={{ padding: '11px 14px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Date & Time</th>
                                    <th style={{ padding: '11px 14px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Payment</th>
                                    <th style={{ padding: '11px 14px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Status</th>
                                    <th style={{ padding: '11px 14px', textAlign: 'center', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #e2e8f0' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((appt) => {
                                    const sb = statusBadge(appt.status);
                                    const apptDate = appt.date ? new Date(appt.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
                                    const patName = appt.patientId?.name || 'Patient';
                                    const isUpdating = loadingId === appt._id;

                                    return (
                                        <tr key={appt._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: '14px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                    <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                                                        {patName[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem', marginBottom: 2 }}>{patName}</p>
                                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{appt.patientId?.phone || appt.patientId?.email || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td style={{ padding: '14px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <FaUserMd style={{ color: '#0891b2', flexShrink: 0 }} />
                                                    <div>
                                                        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Dr. {appt.doctorId?.userId?.name || 'Unknown'}</p>
                                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{appt.doctorId?.specialization || ''}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <FaClock style={{ color: '#94a3b8', fontSize: '0.8rem' }} />
                                                    <div>
                                                        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>{apptDate}</p>
                                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{appt.timeSlot || '—'}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td style={{ padding: '14px' }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: ['paid', 'Completed', 'paid'].includes(appt.paymentStatus) ? '#10b981' : '#f59e0b' }}>
                                                    {appt.paymentStatus || 'Pending'} {appt.paymentAmount ? `(₹${appt.paymentAmount})` : ''}
                                                </span>
                                            </td>

                                            <td style={{ padding: '14px' }}>
                                                <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700, background: sb.bg, color: sb.color }}>
                                                    {sb.label}
                                                </span>
                                            </td>

                                            <td style={{ padding: '14px', textAlign: 'center' }}>
                                                {['Pending', 'pending'].includes(appt.status) ? (
                                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                                        <button
                                                            onClick={() => handleUpdateStatus(appt._id, 'Confirmed')}
                                                            disabled={isUpdating}
                                                            style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#dbeafe', color: '#1e40af', fontWeight: 700, fontSize: '0.75rem', cursor: isUpdating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                        >
                                                            <FaCheckCircle /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateStatus(appt._id, 'Cancelled')}
                                                            disabled={isUpdating}
                                                            style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#fee2e2', color: '#991b1b', fontWeight: 700, fontSize: '0.75rem', cursor: isUpdating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                        >
                                                            <FaTimesCircle /> Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Actioned</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsList;
