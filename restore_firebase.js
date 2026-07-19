// RESTORE SCRIPT — run with: node restore_firebase.js
// Pushes the backed-up Firebase data (firebase_data/*.json) back to the cloud.
// Run this if the live site data gets corrupted and you want to revert to this backup state.
const https = require('https');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'firebase_data');
const NODES = ['projects', 'sections', 'layout_order', 'software', 'showreel', 'services', 'education', 'timeline', 'clients', 'theme', 'custom_colors', 'last_updated'];

function put(node, jsonString) {
  return new Promise((resolve, reject) => {
    const body = jsonString;
    const req = https.request({
      hostname: 'amit-portfolio-f0d71-default-rtdb.firebaseio.com',
      port: 443, path: '/' + node + '.json', method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, r => { let d = ''; r.on('data', x => d += x); r.on('end', () => { console.log('RESTORED', node, '->', r.statusCode); resolve(); }); });
    req.on('error', e => reject(e)); req.write(body); req.end();
  });
}

(async () => {
  for (const node of NODES) {
    const f = path.join(DATA_DIR, node + '.json');
    if (fs.existsSync(f)) {
      const raw = fs.readFileSync(f, 'utf8').trim();
      if (raw === '' || raw === 'null') { console.log('SKIP (empty)', node); continue; }
      try { await put(node, raw); } catch (e) { console.log('FAILED', node, e.message); }
    }
  }
  // bump last_updated so all clients reload cloud data
  await put('last_updated', String(Date.now()));
  console.log('Restore complete. Then run: vercel deploy --prod');
})();
