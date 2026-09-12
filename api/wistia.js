module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    const { url } = req.query;
    if (!url) { res.status(400).json({ error: 'Missing url parameter' }); return; }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const apiRes = await fetch(`https://fast.wistia.net/oembed.json?url=${encodeURIComponent(url)}`, {
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!apiRes.ok) { res.status(apiRes.status).json({ error: 'Wistia oembed error' }); return; }

        const data = await apiRes.json();
        let realId = '';
        if (data.html) {
            const m = data.html.match(/\/embed\/iframe\/([a-zA-Z0-9_-]+)/);
            if (m && m[1]) realId = m[1];
        }

        res.status(200).json({
            id: realId || '',
            title: data.title || '',
            thumbnail_url: data.thumbnail_url || '',
            width: data.width,
            height: data.height
        });
    } catch (err) {
        res.status(502).json({ error: 'Failed to fetch Wistia oembed' });
    }
};
