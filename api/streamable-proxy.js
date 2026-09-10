const https = require('https');
const http = require('http');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    const { url } = req.query;
    if (!url) { res.status(400).json({ error: 'Missing url' }); return; }

    let videoUrl = url;
    if (videoUrl.startsWith('//')) videoUrl = 'https:' + videoUrl;

    const proto = videoUrl.startsWith('https') ? https : http;

    const followRedirect = (targetUrl, depth) => {
        if (depth > 5) { res.status(502).json({ error: 'Too many redirects' }); return; }
        const parsedTarget = new URL(targetUrl);
        const options = {
            hostname: parsedTarget.hostname,
            path: parsedTarget.pathname + parsedTarget.search,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'Referer': 'https://streamable.com/',
                'Origin': 'https://streamable.com',
                'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8'
            }
        };

        const request = proto.request(options, (videoRes) => {
            if (videoRes.statusCode >= 300 && videoRes.statusCode < 400 && videoRes.headers.location) {
                let redirectUrl = videoRes.headers.location;
                if (redirectUrl.startsWith('//')) redirectUrl = 'https:' + redirectUrl;
                videoRes.resume();
                followRedirect(redirectUrl, depth + 1);
                return;
            }
            if (videoRes.statusCode !== 200) {
                let body = '';
                videoRes.on('data', c => body += c);
                videoRes.on('end', () => {
                    console.error('Streamable proxy upstream error:', videoRes.statusCode, body.substring(0, 200));
                    if (!res.headersSent) res.status(502).json({ error: 'Upstream ' + videoRes.statusCode });
                });
                return;
            }
            const ct = videoRes.headers['content-type'] || 'video/mp4';
            const cl = videoRes.headers['content-length'];
            res.setHeader('Content-Type', ct);
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (cl) res.setHeader('Content-Length', cl);
            videoRes.pipe(res);
        });

        request.on('error', (e) => {
            console.error('Streamable proxy request error:', e.message);
            if (!res.headersSent) res.status(502).json({ error: 'Proxy failed' });
        });
        request.setTimeout(15000, () => { request.destroy(); if (!res.headersSent) res.status(504).json({ error: 'Timeout' }); });
        request.end();
    };

    followRedirect(videoUrl, 0);
};
