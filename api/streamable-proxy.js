module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    const { url } = req.query;
    if (!url) { res.status(400).json({ error: 'Missing url parameter' }); return; }

    let videoUrl = url;
    if (videoUrl.startsWith('//')) videoUrl = 'https:' + videoUrl;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const videoRes = await fetch(videoUrl, {
            signal: controller.signal,
            headers: { 'Referer': 'https://streamable.com/' }
        });
        clearTimeout(timeout);

        if (!videoRes.ok) { res.status(videoRes.status).json({ error: 'Video fetch failed' }); return; }

        const contentType = videoRes.headers.get('content-type') || 'video/mp4';
        const contentLength = videoRes.headers.get('content-length');

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (contentLength) res.setHeader('Content-Length', contentLength);

        const reader = videoRes.body.getReader();
        const pump = async () => {
            while (true) {
                const { done, value } = await reader.read();
                if (done) { res.end(); return; }
                res.write(value);
            }
        };
        await pump();
    } catch (err) {
        if (!res.headersSent) res.status(502).json({ error: 'Proxy failed' });
    }
};
