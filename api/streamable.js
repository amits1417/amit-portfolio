module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.status(200).end(); return; }

    const { id } = req.query;
    if (!id) { res.status(400).json({ error: 'Missing id parameter' }); return; }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const apiRes = await fetch(`https://api.streamable.com/videos/${id}`, {
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!apiRes.ok) { res.status(apiRes.status).json({ error: 'Streamable API error' }); return; }

        const data = await apiRes.json();
        const hd = data.files && data.files.mp4 ? (data.files.mp4.url.startsWith('//') ? 'https:' + data.files.mp4.url : data.files.mp4.url) : null;
        const mobile = data.files && data.files['mp4-mobile'] ? (data.files['mp4-mobile'].url.startsWith('//') ? 'https:' + data.files['mp4-mobile'].url : data.files['mp4-mobile'].url) : null;
        const thumb = data.thumbnail_url || null;

        res.status(200).json({ hd, mobile, thumb });
    } catch (err) {
        res.status(502).json({ error: 'Failed to fetch Streamable video' });
    }
};
