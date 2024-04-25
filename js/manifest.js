const manifest = {
  name: TITLE,
  short_name: TITLE,
  description: DESCRIPTION,
  start_url: window.location.origin,
  display: "standalone",
  background_color: COLOR_BG,
  theme_color: COLOR_BG,
  icons: [
    {
      src: MANIFEST_ICONS.icons512,
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: MANIFEST_ICONS.icons192,
      sizes: "192x192",
      type: "image/png",
    }
  ],
};

const stringManifest = JSON.stringify(manifest);
const blob = new Blob([stringManifest], { type: "application/json" });
const manifestURL = URL.createObjectURL(blob);

export function initializeManifest() {
  document.querySelector("#manifest-placeholder").setAttribute("href", manifestURL);
  document.querySelector("#favicon-placeholder").setAttribute("href",MANIFEST_ICONS.icons32);
  document.querySelector("#apple-touch-icon-180").setAttribute("href",MANIFEST_ICONS.icons180);
  document.querySelector("#apple-touch-icon-32").setAttribute("href",MANIFEST_ICONS.icons32);
  document.querySelector("#apple-touch-icon-16").setAttribute("href",MANIFEST_ICONS.icons16);
  document.querySelector("#tile-color-placeholder").setAttribute("content",COLOR_BG);
  document.querySelector("#theme-color-placeholder").setAttribute("content",COLOR_BG);
}
