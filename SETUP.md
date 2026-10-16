# Amit Sharma portfolio — setup

## Files
- `index.html` — the website
- `admin.html` — the admin panel (opens at `/admin` once deployed)
- `config.js` — Firebase database settings
- `data.js` — default content, used until the first publish from the admin
- `assets/` — logos, CV, graphics, skill icons

## One-time: allow the new site to save (Firebase rules)
Firebase console → project **amit-portfolio-f0d71** → Build → Realtime Database → **Rules** tab.
Replace everything there with this, then press **Publish**:

```json
{
  "rules": {
    ".read": true,
    "v2": { ".write": true },
    "v2_media": { ".write": true },
    "v2_admin": { ".write": true },
    "projects": { ".write": true }, "sections": { ".write": true }, "layout_order": { ".write": true },
    "software": { ".write": true }, "showreel": { ".write": true }, "services": { ".write": true },
    "education": { ".write": true }, "timeline": { ".write": true }, "clients": { ".write": true },
    "theme": { ".write": true }, "custom_colors": { ".write": true }, "last_updated": { ".write": true }
  }
}
```
The first four lines are for the new site; the rest keep the old site's editor working.

## Admin password
- The first time you open `/admin` it asks you to **choose a password** (type it twice).
- After that, `/admin` asks only for that password. On your own phone/computer it stays logged in until you press "Log out".
- Change it any time: Admin → Profile → Admin password → Change password.
- Forgot it? Delete the `v2_admin` entry in the Firebase console (Realtime Database → Data) and open `/admin` again to choose a new one.

Note: this is simple protection, like the old site. The database itself stays open, so a technical person
could still change it directly. If you ever want it fully locked, Firebase database rules can do that later.

## Using the admin
- **Landscape / Shorts:** paste a YouTube link or a Cloudflare R2 `.mp4` link → Add. R2 videos play a muted preview on the site.
- **Graphics:** Upload images (resized automatically) or paste an image link.
- On every item: **AI** = AI label on/off, eye = hide, arrows/drag = order, bin = delete.
  A note at the bottom of the site explains the AI label.
- **Skills:** rename, set level (click the bars), change logo and colour, add/remove tools.
- **Profile:** name, badge, availability, showreel (the only video with a title), numbers, contact, experience.
- **Preview** shows your unsaved changes on the site. **Save & publish** puts them live.
