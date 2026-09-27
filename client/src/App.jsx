import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  Activity,
  Database,
  UploadCloud,
  Sun,
  Moon,
  Bell,
  Download,
  CheckCircle,
  ArrowRightLeft,
  UserCheck,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Flag,
  Mic,
  MicOff,
  AlertOctagon,
  Info,
  Check,
  Filter,
  History,
  Printer,
  Search,
  QrCode,
  Wifi,
  WifiOff,
  Layers,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // FEATURE 1: OFFLINE STORAGE & NETWORK MONITOR
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState([]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (offlineQueue.length > 0) {
        addAuditLog('AUTO_SYNC', `Network restored. Synced ${offlineQueue.length} offline actions to master ledger.`);
        triggerSystemAlert('INFO', 'Offline Queue Synced', `${offlineQueue.length} pending local actions synced with cloud.`, 'Offline Engine');
        setOfflineQueue([]);
      }
    };
    const handleOffline = () => {
      setIsOnline(false);
      triggerSystemAlert('WARNING', 'Network Disconnected', 'Offline mode activated. Actions will be queued locally.', 'Network Monitor');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [offlineQueue]);

  // FEATURE 2: JUDGE DEMO FLOW STEPPER
  const [currentStep, setCurrentStep] = useState(0);
  const demoSteps = [
    { title: 'Upload & Hashing', desc: 'SHA-256 seal generation' },
    { title: 'Officer Sealing', desc: 'Custodian mapping' },
    { title: 'OTP Handover', desc: 'Custodial verification' },
    { title: 'Tamper Audit', desc: 'Breach detection test' },
    { title: 'Judicial Inspection', desc: 'Bench verification' },
    { title: 'Legal Certification', desc: 'Audit report export' }
  ];

  // FEATURE 3: RESTRICTED PUBLIC QR ENGINE MODAL
  const [qrModalExhibit, setQrModalExhibit] = useState(null);
  const [isPublicViewMode, setIsPublicViewMode] = useState(true);

  // Notification State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Vault Hash Synchronized', desc: 'SHA-256 Engine synchronized with High Court Node.', time: '2 mins ago', unread: true },
    { id: 2, title: 'Security Audit Alert', desc: 'Officer GOV-ADMIN-01 logged in successfully.', time: '10 mins ago', unread: true }
  ]);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // Voice Assistant State
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // SYSTEM ALERTS STATE
  const [alertFilter, setAlertFilter] = useState('ALL');
  const [systemAlerts, setSystemAlerts] = useState([
    {
      id: 'ALT-1001',
      severity: 'CRITICAL',
      title: 'SHA-256 Hash Mismatch Detected',
      message: 'Unauthorized modification flagged on exhibit EXHIBIT-A1 (MHA-2026-881).',
      source: 'Cryptographic Engine',
      timestamp: '2026-09-10 01:22 AM',
      status: 'UNRESOLVED',
      acknowledgedBy: null
    },
    {
      id: 'ALT-1002',
      severity: 'WARNING',
      title: 'Custody Handover Pending OTP',
      message: 'Transfer request generated for EXHIBIT-A1 from GOV-INV-01 to GOV-INV-02.',
      source: 'Custody Chain Manager',
      timestamp: '2026-09-10 01:20 AM',
      status: 'RESOLVED',
      acknowledgedBy: 'GOV-INV-01'
    }
  ]);

  const rolePresets = {
    SYSTEM_ADMIN: { label: 'System Admin', badge: 'GOV-ADMIN-01', pass: 'Sakshya@2026', permissions: ['upload', 'verify', 'certify', 'transfer', 'tamper_test', 'audit', 'download', 'manage_alerts'] },
    LEAD_INVESTIGATOR: { label: 'Investigating Officer 1', badge: 'GOV-INV-01', pass: 'Sakshya@2026', permissions: ['upload', 'verify', 'certify', 'transfer', 'tamper_test', 'download'] },
    SECOND_INVESTIGATOR: { label: 'Investigating Officer 2', badge: 'GOV-INV-02', pass: 'Sakshya@2026', permissions: ['upload', 'verify', 'certify', 'transfer', 'tamper_test', 'download'] },
    JUDGE: { label: 'Judicial Bench', badge: 'GOV-JUDGE-01', pass: 'Sakshya@2026', permissions: ['verify', 'certify', 'audit', 'judicial_view', 'download'] },
    FORENSIC_ANALYST: { label: 'Forensic Examiner', badge: 'GOV-ANALYST-01', pass: 'Sakshya@2026', permissions: ['verify', 'download'] }
  };

  const [role, setRole] = useState('SYSTEM_ADMIN');
  const [badgeId, setBadgeId] = useState('GOV-ADMIN-01');
  const [password, setPassword] = useState('Sakshya@2026');

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('vault');

  // Form State
  const [caseNumber, setCaseNumber] = useState('');
  const [title, setTitle] = useState('');
  const [fileCategory, setFileCategory] = useState('PDF');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  
  const [vault, setVault] = useState([
    {
      id: 'EV-102938',
      evidence_id: 'EXHIBIT-A1',
      case_number: 'MHA-2026-881',
      title: 'CCTV Footage Cam 04',
      file_name: 'cctv_footage_night.mp4',
      file_size: '14.5 MB',
      file_type: 'VIDEO',
      original_sha256: 'a3f89012bc88710291abc892102931021bc89012bc88710291abc89210293102',
      sha256_hash: 'a3f89012bc88710291abc892102931021bc89012bc88710291abc89210293102',
      tampered_file_name: null,
      tampered_file_size: null,
      custodian_badge: 'GOV-INV-01',
      is_tampered: false,
      tampered_by: null,
      tampered_timestamp: null,
      judicial_issue_raised: false,
      judicial_issue_reason: '',
      timestamp: '2026-09-10 01:20 AM',
      custody_chain: [
        { action: 'REGISTRATION', actor: 'GOV-ADMIN-01', recipient: 'GOV-ADMIN-01', timestamp: '2026-09-10 01:00 AM', note: 'Initial Cryptographic Seal' },
        { action: 'TRANSFER', actor: 'GOV-ADMIN-01', recipient: 'GOV-INV-01', timestamp: '2026-09-10 01:20 AM', note: 'OTP Handover Verified' }
      ],
      access_history: []
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Vault Filters
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal States
  const [transferExhibit, setTransferExhibit] = useState(null);
  const [targetOfficerBadge, setTargetOfficerBadge] = useState('GOV-INV-02');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [transferError, setTransferError] = useState('');

  const [tamperExhibit, setTamperExhibit] = useState(null);
  const [replacementFile, setReplacementFile] = useState(null);

  const [issueExhibit, setIssueExhibit] = useState(null);
  const [issueReason, setIssueReason] = useState('');

  const [historyExhibit, setHistoryExhibit] = useState(null);

  const hasPermission = (perm) => user && user.permissions && user.permissions.includes(perm);

  // Helper for Queue Handling
  const executeOrQueue = (actionType, payload, callback) => {
    if (!isOnline) {
      setOfflineQueue(prev => [...prev, { type: actionType, payload, timestamp: new Date().toLocaleTimeString() }]);
      addAuditLog('OFFLINE_QUEUE', `Action ${actionType} saved to local queue (Offline Mode).`);
    }
    callback();
  };

  // Voice Assistant
  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceTranscript('Listening...');
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setVoiceTranscript(`"${command}"`);
      processHinglishCommand(command);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoiceTranscript('Voice error.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processHinglishCommand = (cmd) => {
    if (cmd.includes('vault') || cmd.includes('evidence') || cmd.includes('show')) {
      setActiveTab('vault');
    } else if (cmd.includes('alert') || cmd.includes('warning') || cmd.includes('danger')) {
      if (hasPermission('manage_alerts')) setActiveTab('alerts');
    } else if (cmd.includes('register') || cmd.includes('upload')) {
      if (hasPermission('upload')) setActiveTab('register');
    } else if (cmd.includes('judge') || cmd.includes('bench')) {
      if (hasPermission('judicial_view')) setActiveTab('judicial');
    } else if (cmd.includes('log') || cmd.includes('audit')) {
      if (hasPermission('audit')) setActiveTab('audit');
    } else if (cmd.includes('dark')) {
      setDarkMode(true);
    } else if (cmd.includes('light')) {
      setDarkMode(false);
    } else {
      setSearchQuery(cmd);
      setActiveTab('vault');
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (rolePresets[selectedRole]) {
      setBadgeId(rolePresets[selectedRole].badge);
      setPassword(rolePresets[selectedRole].pass);
    }
  };

  const addAuditLog = (event, description) => {
    setAuditLogs(prev => [{ id: Date.now(), timestamp: new Date().toLocaleTimeString(), event, description }, ...prev]);
  };

  const triggerSystemAlert = (severity, title, message, source) => {
    const newAlert = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      severity,
      title,
      message,
      source,
      timestamp: new Date().toLocaleString(),
      status: 'UNRESOLVED',
      acknowledgedBy: null
    };
    setSystemAlerts(prev => [newAlert, ...prev]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dummyUser = {
        full_name: rolePresets[role].label,
        badge_id: badgeId,
        role: role,
        clearance_level: 'TIER-1',
        permissions: rolePresets[role].permissions
      };
      setUser(dummyUser);
      addAuditLog('AUTH_SECURE', `Officer ${dummyUser.badge_id} logged in successfully.`);
    } catch (err) {
      setError('Login authentication failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.includes('pdf')) setFileCategory('PDF');
      else if (file.type.includes('image')) setFileCategory('IMAGE');
      else if (file.type.includes('video')) setFileCategory('VIDEO');
      else if (file.type.includes('audio')) setFileCategory('AUDIO');
    }
  };

  const handleEvidenceUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploadStatus('Generating SHA-256 Hash...');
    const arrayBuffer = await selectedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const formattedSize = selectedFile.size > 1024 * 1024 
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(selectedFile.size / 1024).toFixed(2)} KB`;

    const currentTime = new Date().toLocaleString();

    const newExhibit = {
      id: `EV-${Math.floor(100000 + Math.random() * 900000)}`,
      evidence_id: `EXHIBIT-${String.fromCharCode(65 + vault.length)}${vault.length + 1}`,
      case_number: caseNumber,
      title: title,
      file_name: selectedFile.name,
      file_type: fileCategory,
      file_size: formattedSize,
      original_sha256: calculatedHash,
      sha256_hash: calculatedHash,
      tampered_file_name: null,
      tampered_file_size: null,
      custodian_badge: user.badge_id,
      is_tampered: false,
      tampered_by: null,
      tampered_timestamp: null,
      judicial_issue_raised: false,
      judicial_issue_reason: '',
      timestamp: currentTime,
      custody_chain: [
        { action: 'REGISTRATION', actor: user.badge_id, recipient: user.badge_id, timestamp: currentTime, note: 'Initial Registration & Sealing Complete' }
      ],
      access_history: []
    };

    executeOrQueue('UPLOAD_EXHIBIT', newExhibit, () => {
      setVault(prev => [newExhibit, ...prev]);
      setUploadStatus('');
      addAuditLog('EVIDENCE_SEALED', `File ${selectedFile.name} sealed successfully by ${user.badge_id}.`);
      triggerSystemAlert('INFO', 'New Evidence Registered', `Exhibit ${newExhibit.evidence_id} sealed by ${user.badge_id}.`, 'Evidence Vault');
      setCurrentStep(1);
      setCaseNumber('');
      setTitle('');
      setSelectedFile(null);
      setActiveTab('vault');
    });
  };

  const handleFileTamper = async (e) => {
    e.preventDefault();
    if (!replacementFile || !tamperExhibit) return;

    const arrayBuffer = await replacementFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const newHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const newSize = replacementFile.size > 1024 * 1024 
      ? `${(replacementFile.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(replacementFile.size / 1024).toFixed(2)} KB`;

    const tamperTime = new Date().toLocaleString();

    executeOrQueue('TAMPER_SIMULATION', { id: tamperExhibit.id, newHash }, () => {
      setVault(prev => prev.map(item => {
        if (item.id === tamperExhibit.id) {
          return {
            ...item,
            sha256_hash: newHash,
            tampered_file_name: replacementFile.name,
            tampered_file_size: newSize,
            is_tampered: true,
            tampered_by: user.badge_id,
            tampered_timestamp: tamperTime
          };
        }
        return item;
      }));

      addAuditLog('CRITICAL_TAMPER_ALERT', `FILE REPLACED: Exhibit ${tamperExhibit.evidence_id} overwritten by ${user.badge_id}.`);
      triggerSystemAlert('CRITICAL', 'Cryptographic Seal Breach', `SHA-256 Mismatch on ${tamperExhibit.evidence_id}.`, 'Integrity Monitor');
      setCurrentStep(3);
      setTamperExhibit(null);
      setReplacementFile(null);
    });
  };

  const handleDownloadSpecific = (item, type) => {
    const currentTime = new Date().toLocaleString();
    const targetFile = type === 'ORIGINAL' ? item.file_name : (item.tampered_file_name || item.file_name);

    setVault(prev => prev.map(ex => {
      if (ex.id === item.id) {
        return {
          ...ex,
          access_history: [
            ...ex.access_history,
            { action: `${type}_DOWNLOADED`, actor: user.badge_id, timestamp: currentTime }
          ]
        };
      }
      return ex;
    }));

    addAuditLog('FILE_ACCESS', `${type} version of ${targetFile} downloaded by ${user.badge_id}.`);
    alert(`Downloading ${type} file: ${targetFile}`);
  };

  const handleRaiseJudicialIssue = (e) => {
    e.preventDefault();
    if (!issueReason) return;

    executeOrQueue('JUDICIAL_ISSUE', { id: issueExhibit.id, reason: issueReason }, () => {
      setVault(prev => prev.map(item => {
        if (item.id === issueExhibit.id) {
          return {
            ...item,
            judicial_issue_raised: true,
            judicial_issue_reason: issueReason
          };
        }
        return item;
      }));

      addAuditLog('JUDICIAL_ISSUE_RAISED', `Judge ${user.badge_id} raised issue on ${issueExhibit.evidence_id}`);
      triggerSystemAlert('WARNING', 'Judicial Bench Exception', `Objection raised on ${issueExhibit.evidence_id}.`, 'Judicial Portal');
      setCurrentStep(4);
      setIssueExhibit(null);
      setIssueReason('');
    });
  };

  const startCustodyTransfer = (item) => {
    setTransferExhibit(item);
    setInputOtp('');
    setTransferError('');
    setGeneratedOtp(Math.floor(100000 + Math.random() * 900000).toString());
  };

  const handleVerifyAndTransfer = (e) => {
    e.preventDefault();
    if (inputOtp !== generatedOtp) {
      setTransferError('INVALID OTP! Please enter correct code.');
      return;
    }

    const transferTime = new Date().toLocaleString();

    executeOrQueue('TRANSFER_CUSTODY', { id: transferExhibit.id, target: targetOfficerBadge }, () => {
      setVault(prev => prev.map(item => {
        if (item.id === transferExhibit.id) {
          return {
            ...item,
            custodian_badge: targetOfficerBadge,
            custody_chain: [
              ...item.custody_chain,
              { action: 'TRANSFER', actor: user.badge_id, recipient: targetOfficerBadge, timestamp: transferTime, note: 'OTP Verified Transfer' }
            ]
          };
        }
        return item;
      }));

      addAuditLog('CUSTODY_TRANSFERRED', `Custody of ${transferExhibit.evidence_id} transferred to ${targetOfficerBadge}.`);
      triggerSystemAlert('INFO', 'Custody Handover Complete', `Custody of ${transferExhibit.evidence_id} moved to ${targetOfficerBadge}.`, 'Chain of Custody');
      setCurrentStep(2);
      setTransferExhibit(null);
    });
  };

  const acknowledgeAlert = (alertId) => {
    setSystemAlerts(prev => prev.map(alt => {
      if (alt.id === alertId) {
        return { ...alt, status: 'RESOLVED', acknowledgedBy: user.badge_id };
      }
      return alt;
    }));
    addAuditLog('ALERT_ACKNOWLEDGED', `System alert ${alertId} resolved by ${user.badge_id}.`);
  };

  const handlePrintCertificate = (item) => {
    setCurrentStep(5);
    addAuditLog('CERTIFICATE_GENERATED', `Audit Certificate generated for ${item.evidence_id} by ${user.badge_id}.`);
    window.print();
  };

  const renderFileIcon = (type) => {
    switch (type) {
      case 'IMAGE': return <ImageIcon style={{ width: 18, height: 18, color: '#38BDF8' }} />;
      case 'VIDEO': return <Video style={{ width: 18, height: 18, color: '#A855F7' }} />;
      case 'AUDIO': return <Music style={{ width: 18, height: 18, color: '#F59E0B' }} />;
      default: return <FileText style={{ width: 18, height: 18, color: '#10B981' }} />;
    }
  };

  const filteredVault = vault.filter(item => {
    const matchesQuery = item.case_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.evidence_id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'ALL' || item.file_type === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || 
      (statusFilter === 'SEALED' && !item.is_tampered) || 
      (statusFilter === 'TAMPERED' && item.is_tampered);

    return matchesQuery && matchesCategory && matchesStatus;
  });

  const filteredAlerts = systemAlerts.filter(alt => {
    if (alertFilter === 'CRITICAL') return alt.severity === 'CRITICAL';
    if (alertFilter === 'WARNING') return alt.severity === 'WARNING';
    if (alertFilter === 'INFO') return alt.severity === 'INFO';
    if (alertFilter === 'UNRESOLVED') return alt.status === 'UNRESOLVED';
    return true;
  });

  const theme = {
    bg: darkMode ? '#030712' : '#F8FAFC',
    cardBg: darkMode ? '#111827' : '#FFFFFF',
    headerBg: darkMode ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)',
    border: darkMode ? '#1F2937' : '#E2E8F0',
    textMain: darkMode ? '#F9FAFB' : '#0F172A',
    textMuted: darkMode ? '#9CA3AF' : '#64748B',
    inputBg: darkMode ? '#030712' : '#F1F5F9',
    sidebarBg: darkMode ? '#0B0F19' : '#FFFFFF',
    sidebarActive: darkMode ? '#1F2937' : '#F1F5F9',
    accent: '#EA580C',
  };

  const unresolvedAlertsCount = systemAlerts.filter(a => a.status === 'UNRESOLVED').length;
  const unreadNotifCount = notifications.filter(n => n.unread).length;

  return (
    <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: theme.bg, color: theme.textMain, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <header style={{ height: '70px', borderBottom: `1px solid ${theme.border}`, backgroundColor: theme.headerBg, backdropFilter: 'blur(12px)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: theme.accent, padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield style={{ color: '#FFF', width: 22, height: 22 }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '1px', color: theme.textMain }}>SAKSHYA</span>
              <span style={{ fontSize: '10px', fontWeight: '700', backgroundColor: theme.accent, color: '#FFF', padding: '2px 8px', borderRadius: '4px' }}>MHA / JUDICIAL VAULT</span>
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: theme.textMuted }}>National Digital Evidence & Integrity Engine</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* VOICE ASSISTANT BUTTON */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: theme.inputBg, border: `1px solid ${isListening ? '#10B981' : theme.border}`, padding: '4px 10px', borderRadius: '20px' }}>
            <button 
              onClick={startVoiceSearch} 
              style={{ backgroundColor: isListening ? '#10B981' : theme.accent, border: 'none', color: '#FFF', padding: '6px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Click to speak">
              {isListening ? <Mic style={{ width: 16, height: 16 }} /> : <MicOff style={{ width: 16, height: 16 }} />}
            </button>
            <span style={{ fontSize: '11px', fontWeight: '700', color: isListening ? '#10B981' : theme.textMuted }}>
              {voiceTranscript || 'Voice Command'}
            </span>
          </div>

          {/* SYSTEM ALERTS BADGE */}
          {hasPermission('manage_alerts') && unresolvedAlertsCount > 0 && (
            <div 
              onClick={() => setActiveTab('alerts')}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', color: '#EF4444', fontWeight: '700' }}>
              <AlertOctagon style={{ width: 14, height: 14 }} />
              <span>{unresolvedAlertsCount} ALERT(S)</span>
            </div>
          )}

          {/* NOTIFICATION BUTTON */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowNotifMenu(!showNotifMenu)} style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '8px', borderRadius: '8px', cursor: 'pointer', position: 'relative' }}>
              <Bell style={{ width: 18, height: 18, color: theme.textMain }} />
              {unreadNotifCount > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: theme.accent, color: '#FFF', fontSize: '9px', fontWeight: '900', borderRadius: '10px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div style={{ position: 'absolute', right: 0, top: '45px', width: '320px', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', padding: '16px', zIndex: 100 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: `1px solid ${theme.border}` }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: theme.textMain }}>SYSTEM NOTIFICATIONS</span>
                  <span style={{ fontSize: '10px', color: theme.accent, fontWeight: '700', cursor: 'pointer' }} onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}>Mark all read</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, padding: '10px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: theme.textMain }}>{n.title}</div>
                      <div style={{ fontSize: '10px', color: theme.textMuted, marginTop: '2px' }}>{n.desc}</div>
                      <div style={{ fontSize: '9px', color: theme.accent, marginTop: '4px', textAlign: 'right' }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => setDarkMode(!darkMode)} style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
            {darkMode ? <Sun style={{ width: 18, height: 18, color: '#FBBF24' }} /> : <Moon style={{ width: 18, height: 18, color: '#6366F1' }} />}
          </button>

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingLeft: '16px', borderLeft: `1px solid ${theme.border}` }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: theme.textMain }}>{user.full_name}</div>
                <div style={{ fontSize: '11px', color: theme.accent, fontWeight: '600', fontFamily: 'monospace' }}>{user.badge_id} • {user.role}</div>
              </div>
              <button onClick={() => { setUser(null); setActiveTab('vault'); }} style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, color: theme.textMuted, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600' }}>
                <LogOut style={{ width: 14, height: 14 }} /> Exit
              </button>
            </div>
          )}
        </div>
      </header>

      {/* JUDGE DEMO FLOW STEPPER */}
      {user && (
        <div style={{ backgroundColor: theme.cardBg, borderBottom: `1px solid ${theme.border}`, padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: theme.accent, minWidth: '130px' }}>
            <Layers style={{ width: 16, height: 16 }} />
            <span>DEMO PIPELINE:</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'space-around' }}>
            {demoSteps.map((step, idx) => {
              const isActive = currentStep === idx;
              const isPassed = currentStep > idx;
              return (
                <div key={idx} onClick={() => setCurrentStep(idx)} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: isActive || isPassed ? 1 : 0.5 }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: isActive ? theme.accent : isPassed ? '#10B981' : theme.inputBg, color: '#FFF', border: `1px solid ${isActive ? theme.accent : theme.border}`, fontSize: '10px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isPassed ? <Check style={{ width: 12, height: 12 }} /> : idx + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: isActive ? theme.accent : theme.textMain }}>{step.title}</div>
                    <div style={{ fontSize: '9px', color: theme.textMuted }}>{step.desc}</div>
                  </div>
                  {idx < demoSteps.length - 1 && <ChevronRight style={{ width: 14, height: 14, color: theme.textMuted }} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MAIN BODY */}
      {!user ? (
        /* LOGIN */
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
          <div style={{ width: '100%', maxWidth: '480px', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '36px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Lock style={{ width: 32, height: 32, color: theme.accent, margin: '0 auto 12px auto' }} />
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: theme.textMain }}>Officer Access Portal</h2>
            </div>

            <div style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '14px', marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: theme.accent, marginBottom: '8px' }}>SELECT DEMO PROFILE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {Object.keys(rolePresets).map((r) => (
                  <button key={r} type="button" onClick={() => handleRoleChange(r)} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: `1px solid ${role === r ? theme.accent : theme.border}`, backgroundColor: role === r ? (darkMode ? '#1E293B' : '#E2E8F0') : 'transparent', cursor: 'pointer' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: theme.textMain }}>{rolePresets[r].label}</div>
                    <div style={{ fontSize: '10px', fontFamily: 'monospace', color: theme.textMuted }}>ID: {rolePresets[r].badge}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>BADGE IDENTIFIER</label>
                <input type="text" required value={badgeId} onChange={(e) => setBadgeId(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.textMain, fontSize: '13px', fontFamily: 'monospace', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ backgroundColor: theme.accent, color: '#FFF', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                AUTHORIZE ACCESS
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* DASHBOARD */
        <div style={{ flex: 1, display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
          
          <aside style={{ width: '260px', backgroundColor: theme.sidebarBg, borderRight: `1px solid ${theme.border}`, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setActiveTab('vault')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'vault' ? theme.sidebarActive : 'transparent', color: activeTab === 'vault' ? theme.accent : theme.textMuted, fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
              <Database style={{ width: 18, height: 18 }} />
              <span>Evidence Vault</span>
            </button>

            {hasPermission('manage_alerts') && (
              <button onClick={() => setActiveTab('alerts')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'alerts' ? theme.sidebarActive : 'transparent', color: activeTab === 'alerts' ? theme.accent : theme.textMuted, fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertOctagon style={{ width: 18, height: 18 }} />
                  <span>System Alerts</span>
                </div>
                {unresolvedAlertsCount > 0 && (
                  <span style={{ fontSize: '10px', fontWeight: '900', backgroundColor: '#EF4444', color: '#FFF', padding: '2px 6px', borderRadius: '10px' }}>
                    {unresolvedAlertsCount}
                  </span>
                )}
              </button>
            )}

            {hasPermission('upload') && (
              <button onClick={() => setActiveTab('register')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'register' ? theme.sidebarActive : 'transparent', color: activeTab === 'register' ? theme.accent : theme.textMuted, fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                <UploadCloud style={{ width: 18, height: 18 }} />
                <span>Register Evidence File</span>
              </button>
            )}

            {hasPermission('judicial_view') && (
              <button onClick={() => setActiveTab('judicial')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'judicial' ? theme.sidebarActive : 'transparent', color: activeTab === 'judicial' ? theme.accent : theme.textMuted, fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                <UserCheck style={{ width: 18, height: 18 }} />
                <span>Judge Audit Portal</span>
              </button>
            )}

            {hasPermission('audit') && (
              <button onClick={() => setActiveTab('audit')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '8px', border: 'none', backgroundColor: activeTab === 'audit' ? theme.sidebarActive : 'transparent', color: activeTab === 'audit' ? theme.accent : theme.textMuted, fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                <Activity style={{ width: 18, height: 18 }} />
                <span>Audit Logs</span>
              </button>
            )}
          </aside>

          <main style={{ flex: 1, backgroundColor: theme.bg, padding: '40px', overflowY: 'auto' }}>
            
            {/* REGISTER EVIDENCE */}
            {activeTab === 'register' && (
              <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px 0', color: theme.textMain }}>Register & Hash Evidence Exhibit</h2>
                <p style={{ margin: '0 0 24px 0', fontSize: '12px', color: theme.textMuted }}>Upload a file to generate a cryptographic SHA-256 seal.</p>

                <form onSubmit={handleEvidenceUpload} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>CASE NUMBER / FIR REF</label>
                    <input type="text" required placeholder="e.g. MHA-2026-902" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.textMain, boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>EXHIBIT TITLE / DESCRIPTION</label>
                    <input type="text" required placeholder="e.g. Forensic Hard Drive Image" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.textMain, boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>SELECT FILE</label>
                    <div style={{ border: `2px dashed ${theme.border}`, padding: '24px', borderRadius: '10px', textAlign: 'center', backgroundColor: theme.inputBg, cursor: 'pointer' }}>
                      <input 
                        type="file" 
                        required 
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                        onChange={handleFileSelection} 
                        style={{ display: 'block', width: '100%', cursor: 'pointer', fontSize: '12px', color: theme.textMuted }} 
                      />
                      {selectedFile && (
                        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: theme.accent, fontSize: '12px', fontWeight: '700' }}>
                          {renderFileIcon(fileCategory)}
                          <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button type="submit" style={{ backgroundColor: theme.accent, color: '#FFF', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                    {uploadStatus || 'SEAL FILE & GENERATE SHA-256'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 1: VAULT LISTING */}
            {activeTab === 'vault' && (
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: theme.textMain }}>National Evidence Registry</h1>
                    <p style={{ margin: 0, fontSize: '13px', color: theme.textMuted }}>Cryptographically sealed court exhibits and forensic index</p>
                  </div>
                </div>

                {/* SEARCH AND FILTER BAR */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, padding: '12px', borderRadius: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, padding: '8px 12px', borderRadius: '8px' }}>
                    <Search style={{ width: 16, height: 16, color: theme.textMuted }} />
                    <input 
                      type="text" 
                      placeholder="Search exhibit ID, case ref, title..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ border: 'none', backgroundColor: 'transparent', color: theme.textMain, width: '100%', outline: 'none', fontSize: '12px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter style={{ width: 14, height: 14, color: theme.textMuted }} />
                    <select 
                      value={categoryFilter} 
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
                      <option value="ALL">All Categories</option>
                      <option value="VIDEO">Video</option>
                      <option value="IMAGE">Image</option>
                      <option value="AUDIO">Audio</option>
                      <option value="PDF">PDF / Document</option>
                    </select>

                    <select 
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '8px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
                      <option value="ALL">All Statuses</option>
                      <option value="SEALED">Sealed Only</option>
                      <option value="TAMPERED">Tampered Only</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
                  {filteredVault.map((item) => (
                    <div key={item.id} style={{ backgroundColor: theme.cardBg, border: `1px solid ${item.is_tampered ? '#EF4444' : theme.border}`, borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', fontFamily: 'monospace', color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {renderFileIcon(item.file_type)} {item.evidence_id}
                          </span>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button 
                              onClick={() => { setQrModalExhibit(item); setIsPublicViewMode(true); }}
                              style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.accent, padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <QrCode style={{ width: 12, height: 12 }} /> QR Engine
                            </button>

                            <span style={{ fontSize: '10px', fontWeight: '800', color: item.is_tampered ? '#EF4444' : '#10B981', backgroundColor: item.is_tampered ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                              {item.is_tampered ? 'TAMPER DETECTED' : 'SEALED'}
                            </span>
                          </div>
                        </div>

                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.textMain, margin: '0 0 4px 0' }}>{item.title}</h3>
                        <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 16px 0' }}>Current Custodian: <strong style={{ color: theme.accent }}>{item.custodian_badge}</strong></p>

                        <div style={{ backgroundColor: theme.inputBg, border: `1px solid ${item.is_tampered ? '#EF4444' : theme.border}`, padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                          <div style={{ fontSize: '10px', fontWeight: '800', color: theme.textMuted, marginBottom: '8px', letterSpacing: '0.5px' }}>
                            SHA-256 INTEGRITY AUDIT
                          </div>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                              <span style={{ color: '#10B981', fontWeight: '700' }}>ORIGINAL SHA: </span>
                              <span style={{ color: theme.textMain }}>{item.original_sha256}</span>
                              <div style={{ fontSize: '10px', color: theme.textMuted }}>Original File: {item.file_name} ({item.file_size})</div>
                            </div>

                            {item.is_tampered && (
                              <div style={{ fontSize: '11px', fontFamily: 'monospace', wordBreak: 'break-all', marginTop: '6px', paddingTop: '6px', borderTop: `1px dashed ${theme.border}` }}>
                                <span style={{ color: '#EF4444', fontWeight: '700' }}>CURRENT SHA : </span>
                                <span style={{ color: '#EF4444' }}>{item.sha256_hash}</span>
                                <div style={{ fontSize: '10px', color: '#EF4444' }}>
                                  Tampered File: {item.tampered_file_name} ({item.tampered_file_size})
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button onClick={() => handleDownloadSpecific(item, 'ORIGINAL')} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <Download style={{ width: 14, height: 14 }} /> Download Original File
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <button onClick={() => setHistoryExhibit(item)} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '8px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <History style={{ width: 12, height: 12 }} /> Custody Chain
                          </button>
                          
                          <button onClick={() => handlePrintCertificate(item)} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '8px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                            <Printer style={{ width: 12, height: 12 }} /> Audit Report
                          </button>
                        </div>

                        {hasPermission('transfer') && (
                          <button onClick={() => startCustodyTransfer(item)} style={{ backgroundColor: theme.accent, color: '#FFF', border: 'none', padding: '10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <ArrowRightLeft style={{ width: 14, height: 14 }} /> Transfer Custody
                          </button>
                        )}

                        {hasPermission('tamper_test') && (
                          <button onClick={() => setTamperExhibit(item)} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', color: '#EF4444', padding: '8px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', cursor: 'pointer', width: '100%' }}>
                            SIMULATE FILE REPLACEMENT TAMPER
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SYSTEM ALERTS */}
            {activeTab === 'alerts' && hasPermission('manage_alerts') && (
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: theme.textMain }}>System Alerts & Exception Engine</h1>
                    <p style={{ margin: 0, fontSize: '13px', color: theme.textMuted }}>Real-time cryptographic, custody, and integrity breach notifications</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, padding: '4px', borderRadius: '8px' }}>
                    {['ALL', 'CRITICAL', 'WARNING', 'UNRESOLVED'].map(f => (
                      <button 
                        key={f}
                        onClick={() => setAlertFilter(f)}
                        style={{ 
                          backgroundColor: alertFilter === f ? theme.accent : 'transparent', 
                          color: alertFilter === f ? '#FFF' : theme.textMuted,
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {filteredAlerts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '12px', color: theme.textMuted, fontSize: '13px' }}>
                      No active alerts found. System operating normally.
                    </div>
                  ) : (
                    filteredAlerts.map(alt => {
                      const isCritical = alt.severity === 'CRITICAL';
                      const isWarning = alt.severity === 'WARNING';
                      const isUnresolved = alt.status === 'UNRESOLVED';

                      const alertColor = isCritical ? '#EF4444' : isWarning ? '#F59E0B' : '#38BDF8';

                      return (
                        <div key={alt.id} style={{ backgroundColor: theme.cardBg, border: `1px solid ${isUnresolved ? alertColor : theme.border}`, borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                          <div style={{ backgroundColor: `${alertColor}20`, border: `1px solid ${alertColor}`, padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isCritical ? <AlertOctagon style={{ color: alertColor, width: 22, height: 22 }} /> : isWarning ? <AlertTriangle style={{ color: alertColor, width: 22, height: 22 }} /> : <Info style={{ color: alertColor, width: 22, height: 22 }} />}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', fontWeight: '900', backgroundColor: `${alertColor}20`, color: alertColor, padding: '2px 8px', borderRadius: '4px' }}>
                                  {alt.severity}
                                </span>
                                <span style={{ fontSize: '11px', fontFamily: 'monospace', color: theme.textMuted }}>{alt.id}</span>
                                <span style={{ fontSize: '11px', color: theme.textMuted }}>• Source: <strong>{alt.source}</strong></span>
                              </div>
                              <span style={{ fontSize: '11px', color: theme.textMuted, fontFamily: 'monospace' }}>{alt.timestamp}</span>
                            </div>

                            <h3 style={{ fontSize: '15px', fontWeight: '700', color: theme.textMain, margin: '0 0 4px 0' }}>{alt.title}</h3>
                            <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>{alt.message}</p>

                            {alt.acknowledgedBy && (
                              <div style={{ fontSize: '10px', color: '#10B981', marginTop: '8px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Check style={{ width: 12, height: 12 }} /> Resolved by {alt.acknowledgedBy}
                              </div>
                            )}
                          </div>

                          {isUnresolved && (
                            <button 
                              onClick={() => acknowledgeAlert(alt.id)}
                              style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '8px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                              Acknowledge
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TAB: JUDGE AUDIT PORTAL */}
            {activeTab === 'judicial' && (
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 6px 0', color: theme.textMain }}>Judicial Inspection Bench</h1>
                <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: theme.textMuted }}>Verify SHA-256 integrity directly and download both Original and Tampered files for legal inspection.</p>

                {vault.map(item => {
                  const isHashValid = item.original_sha256 === item.sha256_hash;

                  return (
                    <div key={item.id} style={{ backgroundColor: theme.cardBg, border: `1px solid ${!isHashValid ? '#EF4444' : theme.border}`, borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '12px' }}>
                        <div>
                          <span style={{ fontSize: '14px', fontWeight: '800', color: theme.accent }}>{item.evidence_id}</span>
                          <span style={{ fontSize: '12px', color: theme.textMuted, marginLeft: '12px' }}>Case Ref: <strong>{item.case_number}</strong></span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {isHashValid ? (
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '4px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle style={{ width: 14, height: 14 }} /> INTEGRITY SAFE (SHA MATCH)
                            </span>
                          ) : (
                            <span style={{ fontSize: '11px', fontWeight: '800', color: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '4px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <AlertTriangle style={{ width: 14, height: 14 }} /> HASH MISMATCH DETECTED
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ fontSize: '13px', fontWeight: '700', color: theme.textMain, marginBottom: '16px' }}>
                        Exhibit: {item.title}
                      </div>

                      <div style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, padding: '14px', borderRadius: '8px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '10px', fontWeight: '800', color: theme.textMuted, marginBottom: '8px' }}>JUDICIAL SHA-256 COMPARISON AUDIT</div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#10B981', marginBottom: '6px' }}>
                          ORIGINAL SEAL HASH : {item.original_sha256} ({item.file_name})
                        </div>
                        <div style={{ fontSize: '11px', fontFamily: 'monospace', color: isHashValid ? '#10B981' : '#EF4444' }}>
                          CURRENT STORED HASH: {item.sha256_hash} {item.is_tampered && `(${item.tampered_file_name})`}
                        </div>
                      </div>

                      {item.judicial_issue_raised && (
                        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '800', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Flag style={{ width: 14, height: 14 }} /> JUDICIAL ISSUE RAISED BY BENCH
                          </div>
                          <div style={{ fontSize: '12px', color: theme.textMain, marginTop: '4px' }}>
                            Reason: <strong>{item.judicial_issue_reason}</strong>
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button onClick={() => handleDownloadSpecific(item, 'ORIGINAL')} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '10px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Download style={{ width: 14, height: 14 }} /> Download Original
                        </button>

                        {item.is_tampered && (
                          <button onClick={() => handleDownloadSpecific(item, 'TAMPERED')} style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#EF4444', padding: '10px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Download style={{ width: 14, height: 14 }} /> Download Tampered File
                          </button>
                        )}

                        {!isHashValid && !item.judicial_issue_raised && (
                          <button onClick={() => setIssueExhibit(item)} style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto' }}>
                            <Flag style={{ width: 14, height: 14 }} /> RAISE LEGAL ISSUE
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: AUDIT LOGS */}
            {activeTab === 'audit' && (
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 24px 0', color: theme.textMain }}>System Audit Log</h1>
                <div style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                  {auditLogs.map((log) => (
                    <div key={log.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 20px', borderBottom: `1px solid ${theme.border}` }}>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: theme.textMuted, width: '80px' }}>{log.timestamp}</span>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: log.event.includes('TAMPER') || log.event.includes('ISSUE') ? '#EF4444' : theme.accent, backgroundColor: log.event.includes('TAMPER') || log.event.includes('ISSUE') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 88, 12, 0.1)', padding: '4px 8px', borderRadius: '4px', width: '150px', textAlign: 'center' }}>
                        {log.event}
                      </span>
                      <span style={{ fontSize: '12px', color: theme.textMain, flex: 1 }}>{log.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* OFFLINE STORAGE MANAGER BOTTOM PANEL */}
      {!isOnline && (
        <div style={{ backgroundColor: '#EF4444', color: '#FFF', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', bottom: 0, zIndex: 100, fontSize: '12px', fontWeight: '700' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <WifiOff style={{ width: 16, height: 16 }} />
            <span>OFFLINE MODE ACTIVE — Queuing actions locally ({offlineQueue.length} pending actions)</span>
          </div>
          <span style={{ fontSize: '10px', opacity: 0.9 }}>Auto-sync will trigger when connection is restored</span>
        </div>
      )}

      {/* RESTRICTED PUBLIC QR ENGINE MODAL */}
      {qrModalExhibit && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
          <div style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '520px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <QrCode style={{ width: 20, height: 22, color: theme.accent }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: theme.textMain }}>Public QR Verification Engine</h3>
              </div>
              
              <button 
                onClick={() => setIsPublicViewMode(!isPublicViewMode)}
                style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.accent, padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isPublicViewMode ? <Eye style={{ width: 14, height: 14 }} /> : <EyeOff style={{ width: 14, height: 14 }} />}
                <span>{isPublicViewMode ? 'Toggle Authorized View' : 'Toggle Public Redacted View'}</span>
              </button>
            </div>

            <div style={{ textAlign: 'center', backgroundColor: '#FFF', padding: '16px', borderRadius: '12px', width: 'fit-content', margin: '0 auto 20px auto' }}>
              <div style={{ width: '140px', height: '140px', border: '8px solid #000', borderRadius: '8px', display: 'flex', flexWrap: 'wrap', padding: '4px', backgroundColor: '#FFF', gap: '2px', margin: '0 auto' }}>
                <div style={{ width: '38px', height: '38px', backgroundColor: '#000' }} />
                <div style={{ flex: 1, backgroundColor: '#FFF' }} />
                <div style={{ width: '38px', height: '38px', backgroundColor: '#000' }} />
                <div style={{ width: '100%', height: '20px', backgroundColor: '#000', margin: '4px 0' }} />
                <div style={{ width: '38px', height: '38px', backgroundColor: '#000' }} />
                <div style={{ flex: 1, backgroundColor: '#000' }} />
                <div style={{ width: '38px', height: '38px', backgroundColor: '#000' }} />
              </div>
              <div style={{ fontSize: '10px', color: '#000', fontWeight: '800', marginTop: '8px' }}>PUBLIC VERIFICATION QR</div>
            </div>

            <div style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: theme.textMuted }}>Exhibit Ref:</span>
                <span style={{ fontWeight: '700', color: theme.textMain }}>{qrModalExhibit.evidence_id}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: theme.textMuted }}>Case Reference:</span>
                <span style={{ fontWeight: '700', color: theme.textMain }}>
                  {isPublicViewMode ? '[ACCESS RESTRICTED]' : qrModalExhibit.case_number}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: theme.textMuted }}>Lead Custodian Officer:</span>
                <span style={{ fontWeight: '700', color: isPublicViewMode ? '#EF4444' : theme.accent }}>
                  {isPublicViewMode ? '[ACCESS RESTRICTED]' : qrModalExhibit.custodian_badge}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: theme.textMuted }}>Public Verification Status:</span>
                <span style={{ fontWeight: '800', color: qrModalExhibit.is_tampered ? '#EF4444' : '#10B981' }}>
                  {qrModalExhibit.is_tampered ? 'TAMPER MISMATCH DETECTED' : 'CRYPTOGRAPHICALLY SEALED (VALID)'}
                </span>
              </div>

              <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: '8px', fontSize: '10px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                <span style={{ color: theme.textMuted }}>SHA-256 Digest: </span>
                <span style={{ color: theme.textMain }}>{qrModalExhibit.sha256_hash}</span>
              </div>
            </div>

            <button onClick={() => setQrModalExhibit(null)} style={{ marginTop: '20px', width: '100%', backgroundColor: theme.accent, color: '#FFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
              Close QR Verification Engine
            </button>
          </div>
        </div>
      )}

      {/* CUSTODY CHAIN TIMELINE MODAL */}
      {historyExhibit && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0', color: theme.textMain, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History style={{ width: 18, height: 18, color: theme.accent }} /> Chain of Custody Audit
            </h3>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 20px 0' }}>Exhibit: <strong>{historyExhibit.evidence_id}</strong> (Case: {historyExhibit.case_number})</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
              {historyExhibit.custody_chain.map((c, i) => (
                <div key={i} style={{ borderLeft: `2px solid ${theme.accent}`, paddingLeft: '12px', marginLeft: '4px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: theme.accent }}>{c.action}</div>
                  <div style={{ fontSize: '12px', color: theme.textMain, marginTop: '2px' }}>Actor: <strong>{c.actor}</strong> → Recipient: <strong>{c.recipient}</strong></div>
                  <div style={{ fontSize: '10px', color: theme.textMuted, marginTop: '2px' }}>{c.timestamp} • {c.note}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setHistoryExhibit(null)} style={{ marginTop: '20px', width: '100%', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
              Close Timeline
            </button>
          </div>
        </div>
      )}

      {/* SIMULATE TAMPER FILE UPLOAD MODAL */}
      {tamperExhibit && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: theme.cardBg, border: '1px solid #EF4444', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '450px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle style={{ width: 18, height: 18 }} /> Simulate File Tampering
            </h3>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 20px 0' }}>
              Upload a replacement file to modify exhibit <strong>{tamperExhibit.evidence_id}</strong>.
            </p>

            <form onSubmit={handleFileTamper} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>
                  SELECT REPLACEMENT FILE
                </label>
                <input 
                  type="file" 
                  required 
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  onChange={(e) => setReplacementFile(e.target.files[0])} 
                  style={{ width: '100%', padding: '10px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, fontSize: '12px' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setTamperExhibit(null)} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  Overwrite Exhibit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JUDICIAL ISSUE MODAL */}
      {issueExhibit && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: theme.cardBg, border: '1px solid #EF4444', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '460px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flag style={{ width: 18, height: 18 }} /> Raise Legal Integrity Issue
            </h3>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 20px 0' }}>Exhibit: <strong>{issueExhibit.evidence_id}</strong> (Case: {issueExhibit.case_number})</p>

            <form onSubmit={handleRaiseJudicialIssue} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>SPECIFY REASON / JUDICIAL OBSERVATION</label>
                <textarea required rows={4} placeholder="e.g. Hash mismatch detected during trial inspection." value={issueReason} onChange={(e) => setIssueReason(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, fontSize: '13px', boxSizing: 'border-box', resize: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button type="button" onClick={() => setIssueExhibit(null)} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#EF4444', color: '#FFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Submit Legal Issue</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRANSFER MODAL */}
      {transferExhibit && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '440px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0', color: theme.textMain }}>Custody Handover - OTP Verification</h3>
            <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 20px 0' }}>Exhibit: <strong>{transferExhibit.evidence_id}</strong></p>

            <form onSubmit={handleVerifyAndTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>TARGET OFFICER BADGE</label>
                <select value={targetOfficerBadge} onChange={(e) => setTargetOfficerBadge(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.textMain }}>
                  <option value="GOV-INV-01">GOV-INV-01 (Investigating Officer 1)</option>
                  <option value="GOV-INV-02">GOV-INV-02 (Investigating Officer 2)</option>
                  <option value="GOV-ANALYST-01">GOV-ANALYST-01 (Forensic Examiner)</option>
                </select>
              </div>

              <div style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '10px', color: theme.textMuted, fontWeight: '700' }}>SIMULATED SECURE OTP</div>
                <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '4px', color: theme.accent, fontFamily: 'monospace' }}>{generatedOtp}</div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme.textMuted, marginBottom: '6px' }}>ENTER VERIFICATION OTP</label>
                <input type="text" required placeholder="Enter 6-digit OTP" value={inputOtp} onChange={(e) => setInputOtp(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, borderRadius: '8px', color: theme.textMain, fontSize: '14px', textAlign: 'center', letterSpacing: '2px', boxSizing: 'border-box' }} />
                {transferError && <div style={{ color: '#EF4444', fontSize: '11px', fontWeight: '700', marginTop: '6px' }}>{transferError}</div>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                <button type="button" onClick={() => setTransferExhibit(null)} style={{ backgroundColor: theme.inputBg, border: `1px solid ${theme.border}`, color: theme.textMain, padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: theme.accent, color: '#FFF', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Confirm Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}