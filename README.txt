AMIT PORTFOLIO — FULL BACKUP
=============================
Created: working state of https://amit-portfolio-fresh.vercel.app

WHAT'S INCLUDED
---------------
- index.html, app.js, style.css, data.js  → current website code
- assets/                                → images, graphics thumbnails (mp4 videos EXCLUDED — too large for Vercel 100MB limit)
- .vercelignore                          → deploy exclusions
- firebase_data/                         → LIVE DATA snapshot from Firebase (projects=177, sections, layout, software, theme, custom_colors, last_updated)
- restore_firebase.js                    → script to push data back to Firebase

HOW TO RESTORE (if anything breaks)
------------------------------------
1. RESTORE DATA (reverts website content/edits to this backup state):
   cd amit-portfolio-backup
   node restore_firebase.js
   (pushes firebase_data/*.json back to Firebase; visitors see it after refresh)

2. RESTORE CODE / REDEPLOY:
   - The code files in this folder are the exact deployed version.
   - To redeploy: ensure Vercel CLI logged in, then from this folder run:
       vercel deploy --prod
   - NOTE: mp4 videos are excluded. If you need videos, host them externally
     (YouTube/Mux/Vercel Blob) and update the mediaLink paths.

NOTES
-----
- Firebase project: amit-portfolio-f0d71-default-rtdb.firebaseio.com (public read/write, no auth)
- Edit mode: https://amit-portfolio-fresh.vercel.app/?edit  (password DellN5010)
- This backup does NOT include the 1.27 GB of mp4 videos (Vercel limit).
