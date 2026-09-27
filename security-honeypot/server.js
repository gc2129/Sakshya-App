const express = require('express');
const userAgent = require('express-useragent');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

// User-Agent Parsing Middleware
app.use(userAgent.express());

// CORS Setup (Agar React Frontend alag port par chal raha ho, jaise 3000 par)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Real-Time SSE Stream Endpoint (React SystemAlerts Component Isse Connect Hoga)
let adminClients = [];

app.get('/api/v1/admin/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write(`data: ${JSON.stringify({ type: 'CONNECTED' })}\n\n`);
  adminClients.push(res);

  req.on('close', () => {
    adminClients = adminClients.filter(client => client !== res);
  });
});

// Function to broadcast alert to React Frontend
function broadcastSystemAlert(alertPayload) {
  adminClients.forEach(client => {
    client.write(`data: ${JSON.stringify(alertPayload)}\n\n`);
  });
}

// Monitored Honeypot Route
app.get('/api/v1/vault/confidential_report.pdf', async (req, res) => {
  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const clientIp = rawIp.includes('::ffff:') ? rawIp.split('::ffff:')[1] : rawIp;

  const os = req.useragent.os;
  const browser = req.useragent.browser;
  const isMobile = req.useragent.isMobile;

  let geoData = {
    country: 'Internal Network',
    region: 'Localhost',
    isp: 'Local Development Provider',
    isProxy: false
  };

  if (clientIp !== '127.0.0.1' && clientIp !== '::1') {
    try {
      const geoRes = await axios.get(`http://ip-api.com/json/${clientIp}?fields=status,country,regionName,city,isp,proxy`);
      if (geoRes.data.status === 'success') {
        geoData = {
          country: geoRes.data.country,
          region: `${geoRes.data.city}, ${geoRes.data.regionName}`,
          isp: geoRes.data.isp,
          isProxy: geoRes.data.proxy
        };
      }
    } catch (err) {
      console.error('GeoIP retrieval failed:', err.message);
    }
  }

  const intrusionLog = {
    eventType: 'UNAUTHORIZED_FILE_ACCESS',
    timestamp: new Date().toISOString(),
    networkInfo: {
      ipAddress: clientIp,
      country: geoData.country,
      region: geoData.region,
      isp: geoData.isp,
      vpnOrProxyDetected: geoData.isProxy
    },
    deviceInfo: {
      deviceType: isMobile ? 'Mobile' : 'Desktop',
      operatingSystem: os,
      browser: browser
    },
    accessedResource: req.originalUrl
  };

  // 1. Terminal Log
  console.log('---------------- INTRUSION LOG ENTRY ----------------');
  console.log(JSON.stringify(intrusionLog, null, 2));
  console.log('------------------------------------------------------');

  // 2. Real-Time Push to React App
  broadcastSystemAlert(intrusionLog);

  // 3. Decoy Garbage Response
  const fileName = 'confidential_report.pdf';
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', 'application/pdf');

  const fakePdfHeader = Buffer.from('%PDF-1.7\n%Decoy Payload Stream\n');
  const garbageBytes = crypto.randomBytes(1024 * 100);
  const decoyPayload = Buffer.concat([fakePdfHeader, garbageBytes]);

  return res.send(decoyPayload);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SYSTEM ADMIN SERVER] Active on port ${PORT}`);
  console.log(`[SSE STREAM ENDPOINT] /api/v1/admin/stream`);
  console.log(`[HONEYPOT ROUTE] /api/v1/vault/confidential_report.pdf`);
});