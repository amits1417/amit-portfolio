module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    const { url } = req.query;
    if (!url) { res.status(400).json({ error: 'Missing url' }); return; }

    let videoUrl = url;
    if (videoUrl.startsWith('//')) videoUrl = 'https:' + videoUrl;

    try {
        const videoRes = await fetch(videoUrl, {
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
                'Accept-Encoding': 'identity'
            }
        });

        if (!videoRes.ok) {
            const errText = await videoRes.text().catch(() => '');
            console.error('Proxy upstream:', videoRes.status, errText.substring(0, 300));
            if (!res.headersSent) res.status(502).json({ error: 'Upstream ' + videoRes.status });
            return;
        }

        const ct = videoRes.headers.get('content-type') || 'video/mp4';
        const cl = videoRes.headers.get('content-length');
        res.setHeader('Content-Type', ct);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        if (cl) res.setHeader('Content-Length', cl);

        const buffer = Buffer.from(await videoRes.arrayBuffer());
        res.status(200).send(buffer);
    } catch (err) {
        console.error('Proxy error:', err.message);
        if (!res.headersSent) res.status(502).json({ error: 'Proxy failed: ' + err.message });
    }
};
