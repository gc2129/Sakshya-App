import React, { useState, useEffect } from 'react';

export default function SystemAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState('CONNECTING');

  useEffect(() => {
    const eventSource = new EventSource('/api/v1/admin/stream');
    
    eventSource.onopen = () => setStatus('ACTIVE');
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'CONNECTED') return;
      setAlerts((prev) => [data, ...prev]);
    };
    
    eventSource.onerror = () => {
      setStatus('DISCONNECTED');
      eventSource.close();
    };
    
    return () => eventSource.close();
  }, []);

  return (
    <div style={{ padding: '20px', color: '#f8fafc', backgroundColor: '#0f172a', minHeight: '80vh', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
        <div>
          <h2 style={{ color: '#38bdf8', margin: 0, fontSize: '20px' }}>System Security Alerts</h2>
          <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '13px' }}>Real-time Honeypot Intrusion & Forensic Stream</p>
        </div>
        <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', background: status === 'ACTIVE' ? '#065f46' : '#7f1d1d', color: status === 'ACTIVE' ? '#34d399' : '#f87171' }}>
          {status}
        </span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>No unauthorized access attempts detected yet. System is clear.</div>
        ) : (
          alerts.map((item, idx) => (
            <div key={idx} style={{ background: '#1e293b', borderLeft: '4px solid #f43f5e', padding: '16px', borderRadius: '6px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                <span style={{ color: '#f43f5e', fontWeight: '600' }}>{item.eventType}</span>
                <span>{new Date(item.timestamp).toLocaleString()}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '13px' }}>
                <div><strong>Target:</strong> <span style={{ color: '#38bdf8' }}>{item.accessedResource}</span></div>
                <div><strong>Attacker IP:</strong> <span style={{ color: '#38bdf8' }}>{item.networkInfo?.ipAddress}</span></div>
                <div><strong>Location:</strong> {item.networkInfo?.country} ({item.networkInfo?.region})</div>
                <div><strong>ISP:</strong> {item.networkInfo?.isp}</div>
                <div><strong>VPN/Proxy:</strong> <span style={{ color: item.networkInfo?.vpnOrProxyDetected ? '#f43f5e' : '#34d399' }}>{item.networkInfo?.vpnOrProxyDetected ? 'YES' : 'NO'}</span></div>
                <div><strong>Device/OS:</strong> {item.deviceInfo?.deviceType} | {item.deviceInfo?.operatingSystem}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}