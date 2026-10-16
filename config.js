// Site configuration — shared by index.html and admin.html.
window.SITE_CONFIG = {
  // Firebase Realtime Database (same project as the old site)
  dbUrl: "https://amit-portfolio-f0d71-default-rtdb.firebaseio.com",
  // Data lives under these nodes so the old site keeps working until the switch.
  // The admin password hash is kept in "v2_admin".
  dataNode: "v2",
  mediaNode: "v2_media"
};
