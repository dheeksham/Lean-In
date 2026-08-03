import localFont from "next/font/local";

export const editorial = localFont({
  src: [
    {
      path: "../public/fonts/PPEditorialNew-Ultralight-BF644b21500d0c0.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/PPEditorialNew-UltralightItalic-BF644b214ff1e9b.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/PPEditorialNew-Regular-BF644b214ff145f.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PPEditorialNew-Italic-BF644b214fb0c0a.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/PPEditorialNew-Ultrabold-BF644b21500840c.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/PPEditorialNew-UltraboldItalic-BF644b214faef01.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-editorial",
  display: "swap",
});

export const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Helvetica-Oblique.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Helvetica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Helvetica-BoldOblique.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});
