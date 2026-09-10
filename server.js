const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon'
};

function fetchStreamable(id, callback) {
  const url = `https://api.streamable.com/videos/${id}`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (apiRes) => {
    let body = '';
    apiRes.on('data', chunk => body += chunk);
    apiRes.on('end', () => {
      try {
        const data = JSON.parse(body);
        const hd = data.files && data.files.mp4 ? (data.files.mp4.url.startsWith('//') ? 'https:' + data.files.mp4.url : data.files.mp4.url) : null;
        const mobile = data.files && data.files['mp4-mobile'] ? (data.files['mp4-mobile'].url.startsWith('//') ? 'https:' + data.files['mp4-mobile'].url : data.files['mp4-mobile'].url) : null;
        const thumb = data.thumbnail_url || null;
        callback(null, { hd, mobile, thumb });
      } catch(e) { callback(e); }
    });
  }).on('error', (e) => callback(e));
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  if (parsedUrl.pathname === '/api/streamable') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
    const id = parsedUrl.searchParams.get('id');
    if (!id) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Missing id' })); return; }
    fetchStreamable(id, (err, data) => {
      if (err) { res.writeHead(502, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Failed' })); return; }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    });
    return;
  }

  if (parsedUrl.pathname === '/api/streamable-proxy') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
    let videoUrl = parsedUrl.searchParams.get('url');
    if (!videoUrl) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Missing url' })); return; }
    if (videoUrl.startsWith('//')) videoUrl = 'https:' + videoUrl;
    const proto = videoUrl.startsWith('https') ? https : require('http');
    proto.get(videoUrl, { headers: { 'Referer': 'https://streamable.com/', 'User-Agent': 'Mozilla/5.0' } }, (videoRes) => {
      if (videoRes.statusCode >= 300 && videoRes.statusCode < 400 && videoRes.headers.location) {
        proto.get(videoRes.headers.location, { headers: { 'Referer': 'https://streamable.com/', 'User-Agent': 'Mozilla/5.0' } }, (redirRes) => {
          res.writeHead(redirRes.statusCode, { 'Content-Type': redirRes.headers['content-type'] || 'video/mp4', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' });
          redirRes.pipe(res);
        }).on('error', () => { if (!res.headersSent) { res.writeHead(502); res.end('Proxy error'); } });
        return;
      }
      res.writeHead(videoRes.statusCode, { 'Content-Type': videoRes.headers['content-type'] || 'video/mp4', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' });
      videoRes.pipe(res);
    }).on('error', () => { if (!res.headersSent) { res.writeHead(502); res.end('Proxy error'); } });
    return;
  }

  let url = parsedUrl.pathname;
  if (url === '/') url = '/index.html';
  
  const filePath = path.join(__dirname, url);
  const ext = path.extname(filePath).toLowerCase();
  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Edit mode: http://localhost:' + PORT + '/?edit');
});
