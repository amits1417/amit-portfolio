// Default site content. The live site uses what is saved from the admin panel (Firebase "v2");
// this file is the fallback and the starting point for "Reset to defaults" in the admin.
//
// Media "src" formats:
//   yt:<id>          YouTube video (thumbnail on the card, plays in the viewer)
//   https://...mp4   Cloudflare R2 / any direct video (muted auto-preview on the card)
//                    optional pv: short silent clip the card loops instead; poster: image shown before it plays
//   https://...jpg   image link            assets/...   image in this site
//   media:<id>       image uploaded from the admin panel
(function () {
  const R2 = "https://pub-069db4deb1444820b524ff7460ae854f.r2.dev/";
  // former YouTube videos, now on R2: full video + 8 s silent card preview + poster
  const yt = (id, ai = true) => { const b = R2 + "portfolio/yt-" + id; return { id: "v_" + id.replace(/[^A-Za-z0-9]/g, ""), src: b + ".mp4", pv: b + "-pv.mp4", poster: b + ".jpg", ai }; };
  const gfx = "g01|1.778,g02|1.778,g03|1.25,g04|0.524,g05|1.778,g06|1.778,g07|0.562,g08|1.778,g09|1.778,g10|1.25,g11|0.524,g12|1.25,g13|1.778,g14|1.778,g15|1.778,g16|1.25,g17|1,g18|1,g19|1,g20|1,g21|1,g22|1,g23|1,g24|1,g25|1,g26|1,g27|1.778,g28|1,g29|1,g30|1,g31|1,g32|1.778,g33|1,g34|1.778,g35|1,g36|1.778,g37|1,g38|1.778,g39|1,g40|1,g41|1,g42|1,g43|1,g44|1,g45|1,g46|1,g47|1,g48|1.778,g49|1,g50|1.778,g51|1,g52|1,g53|0.562,g54|0.562,g55|1.778,g56|1.778,g57|1.778,g58|1.778,g59|0.562,g60|1.778,g61|0.562,g62|1.778,g63|0.562,g64|1.778,g65|1.778,g66|1.778,g67|1.778,g68|0.562,g69|1.778,g70|1.778,g71|1.778,g72|0.562,g73|0.562,g74|0.562,g75|0.562";

  window.DEFAULT_DATA = {
    settings: {
      role: "AI Video Editor",
      name: "Amit Sharma",
      available: "Available · Surat or Remote",
      tags: "AI videos · Explainers · Ads · Reels",
      showreel: { title: "AI Avatar Introduction", src: R2 + "Amit%20Sharma%20(AI%20Avtar%20introduction).mp4", poster: "assets/showreel_cover.jpg" },
      stats: [ { n: "500+", l: "videos" }, { n: "15+", l: "AI tools" }, { n: "4", l: "channels" }, { n: "4+", l: "years" } ],
      whatsapp: "918866414870",
      phone: "+91 88664 14870",
      email: "amits1417@gmail.com",
      cv: "assets/Amit_Sharma_CV.pdf",
      location: "Surat, India"
    },
    long: [
      yt("83O2G6EsLbo"),
      { id: "v_tokenlisting", src: R2 + "vidssave.com%20Token%20listing%20%20%20Landscap%20size%201%20720P.mp4", pv: R2 + "portfolio/r2-tokenlisting-pv.mp4", poster: R2 + "portfolio/r2-tokenlisting.jpg", ai: true },
      yt("2v2oMZVewBQ"), yt("TTtFJ-nny6c"), yt("Q7gbECCut0I"), yt("AADH9MAhInM"), yt("aIK-zfErri8"), yt("I_oX5kUWfSU"),
      yt("i2htqgNC5HA"), yt("dCmqpZCpYUo"), yt("VOu6W3cEENw"), yt("BFs1r-W2YDg")
    ],
    shorts: [
      ...["ai-saree4", "ai-saree7"].map(k => { const b = R2 + "portfolio/" + k; return { id: "v_" + k.replace("-", ""), src: b + ".mp4", pv: b + "-pv.mp4", poster: b + ".jpg", ai: true }; }),
      { id: "v_mlmmeta", src: R2 + "MLM%20Meta%20ad%201080x1920.mp4", pv: R2 + "portfolio/r2-mlmmeta-pv.mp4", poster: R2 + "portfolio/r2-mlmmeta.jpg", ai: true },
      yt("N2WsyGUU6e4", false), yt("x4abZYsjf4Q", false),
      yt("7KJsPO_d3G8"), yt("-2E3aBcKtUI"), yt("ACNkZXtTypE"), yt("Piuj_fYhdHA"), yt("Yy2LZwwfh-I"), yt("XA3aiIh4hW4"),
      yt("wnueL2OtrR4"), yt("-u55d4x04YE"), yt("vvGQTzy1Rsk"), yt("HUSpKLseZPk"), yt("PmvZZOJ6zXA"), yt("PpHcQ5qNahQ"),
      yt("Q6pJRKrB4Is"), yt("zX-9dtu8NaQ"), yt("ZCpKe3_3jss"), yt("R-iALzeIIvY"), yt("xctF_fqofxo"), yt("Rsc_dXkwImw"),
      yt("Gz1YzhFklio"), yt("2xHxwJKunN4"), yt("qLBYcsA6ahA"), yt("6Nd3apJqp4Y"), yt("DYRCz37RDII"), yt("6cFqyUHVMuI")
    ],
    graphics: gfx.split(",").map(s => { const [k, r] = s.split("|"); return { id: "g_" + k, src: "assets/work/" + k + ".jpg", r: +r, ai: false }; }),
    skills: [
      { name: "AI Tools", color: "#9b7bff", icon: "ai", tools: [
        { n: "Higgsfield", l: 4, c: "#c8ff3d", i: "" }, { n: "Topaz Video AI", l: 4, c: "#5ab0ff", i: "" },
        { n: "HeyGen", l: 3, c: "#74AA9C", i: "assets/icons/soft_11.png" }, { n: "Runway", l: 3, c: "#FFFFFF", i: "assets/icons/soft_30.png" },
        { n: "Midjourney", l: 3, c: "#FFFFFF", i: "assets/icons/soft_29.png" }, { n: "Google Veo", l: 2, c: "#4285F4", i: "https://www.vectorlogo.zone/logos/google/google-icon.svg" },
        { n: "Google Flow", l: 2, c: "#4285F4", i: "https://www.vectorlogo.zone/logos/google/google-icon.svg" }, { n: "ElevenLabs", l: 2, c: "#FEE75C", i: "assets/icons/soft_19.svg" },
        { n: "Narakeet", l: 4, c: "#5b6bff", i: "assets/icons/soft_18.png" }, { n: "ChatGPT", l: 3, c: "#00A67E", i: "assets/icons/soft_12.svg" },
        { n: "Gemini", l: 3, c: "#1A73E8", i: "assets/icons/soft_13.png" }, { n: "Grok", l: 4, c: "#FFFFFF", i: "https://cdn.simpleicons.org/x/ffffff" },
        { n: "GenTube", l: 3, c: "#FF4D4D", i: "" }, { n: "OpenFM", l: 4, c: "#1DB954", i: "" }, { n: "Google Antigravity", l: 3, c: "#1A73E8", i: "" } ] },
      { name: "Video Editing", color: "#4d94ff", icon: "video", tools: [
        { n: "Adobe Premiere Pro", l: 4, c: "#9999FF", i: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
        { n: "CapCut", l: 4, c: "#00C4CC", i: "assets/icons/soft_28.png" }, { n: "Filmora", l: 4, c: "#00C4CC", i: "assets/icons/soft_3.png" },
        { n: "ProShow Producer", l: 4, c: "#4285F4", i: "assets/icons/soft_1784788948308.png" },
        { n: "Adobe After Effects", l: 3, c: "#D291FF", i: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
        { n: "DaVinci Resolve", l: 2, c: "#FF9A00", i: "assets/icons/soft_4.png" }, { n: "Final Cut Pro", l: 1, c: "#FF3366", i: "assets/icons/soft_27.png" } ] },
      { name: "Graphics Design", color: "#22d3ee", icon: "palette", tools: [
        { n: "Canva", l: 5, c: "#00C4CC", i: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg" }, { n: "Adobe Photoshop", l: 4, c: "#31A8FF", i: "assets/icons/soft_5.png" },
        { n: "CorelDRAW", l: 4, c: "#FFB900", i: "assets/icons/soft_7.png" }, { n: "Adobe Express", l: 4, c: "#FF4D4D", i: "assets/icons/soft_9.png" },
        { n: "Adobe Illustrator", l: 3, c: "#FF9A00", i: "https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg" },
        { n: "Figma", l: 2, c: "#F24E1E", i: "assets/icons/soft_10.svg" } ] },
      { name: "Other Tools", color: "#f5a524", icon: "gear", tools: [
        { n: "OBS Studio", l: 4, c: "#FFFFFF", i: "assets/icons/soft_21.svg" }, { n: "Streamlabs", l: 4, c: "#09D261", i: "assets/icons/soft_22.png" },
        { n: "Microsoft Office", l: 4, c: "#D83B01", i: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" },
        { n: "Audacity", l: 3, c: "#5b6bff", i: "assets/icons/soft_25.svg" }, { n: "Blender", l: 2, c: "#E87D0D", i: "https://www.vectorlogo.zone/logos/blender/blender-icon.svg" } ] }
    ],
    experience: [
      { role: "Senior Video Editor & Motion Designer", org: "Code Elevator, Surat", time: "Nov 2025 – now", now: true },
      { role: "Digital Studio Manager & Video Editor", org: "Gujarat Career Academy, Surat", time: "Sep – Nov 2025" },
      { role: "Lead Video Editor & Content Strategist", org: "Yuva Upnishad Foundation, Surat", time: "2022 – 2025" },
      { role: "Digital Content & Graphic Designer", org: "Yuva Upnishad Publication, Surat", time: "2020 – 2022" }
    ],
    education: "B.E. Mechanical Engineering · C.K. Pithawala College, Surat (GTU) · 2015"
  };
})();
