// One image per Circle, explicitly — a hash-based cycle can't guarantee no
// repeats across exactly 16 Circles and 16 images, so this is a direct map.
const CIRCLE_IMAGES: Record<string, string> = {
  "negotiating-your-worth": "/images/0460d813-c1bc-44b6-8fd2-afed2e0cd9fd.png",
  "first-time-managers": "/images/1534ac9e-548e-4a5b-a2a6-cb6eb36d81b6.jpeg",
  "coast-to-corner-office": "/images/290c8868-3e0e-47b8-aef0-7706a2823708.jpeg",
  "starting-over": "/images/343edf56-0b42-4de7-9356-5d76e63d0b13.jpeg",
  "the-ask": "/images/3ace7c6f-840b-4e21-aa18-26c5f0862458.jpeg",
  "bc-women-who-lead": "/images/44a89fe8-d441-47c0-9567-40e4f3458fc8.jpeg",
  "speak-up": "/images/5c351d81-47e7-4141-826b-dca6bb932ced.jpeg",
  "founders-table": "/images/7f43ba30-789d-4874-b3e0-32a66f15be7b.webp",
  "new-chapter": "/images/Image.png",
  "lead-louder": "/images/Image2.png",
  "ask-for-more": "/images/Image5.png",
  "the-pivot": "/images/b3dce968-28fd-44aa-a1c2-7e608c7db759.png",
  "back-to-work": "/images/edc332fe-cc63-4c7f-a86c-4485832e3f77.png",
  "rooted-and-rising": "/images/efaf48dd-aaf4-4fb8-a2f6-61cda5415d10.png",
  "c-suite-track": "/images/f3e628b7-ddc8-43c0-a670-f1c3f5da85d8.jpeg",
  "managing-managers": "/images/image-3.png",
};

export function imageForCircle(id: string): string {
  return CIRCLE_IMAGES[id] ?? "/images/Image.png";
}

// These four already have the left-to-right darkening gradient baked into
// the file itself (edited in Figma) — everything else gets it applied as a
// CSS overlay instead, so all 16 cards end up looking consistent.
const PRE_GRADIENTED_IMAGES = new Set([
  "/images/Image.png",
  "/images/Image2.png",
  "/images/Image5.png",
  "/images/image-3.png",
]);

export function needsGradientOverlay(imagePath: string): boolean {
  return !PRE_GRADIENTED_IMAGES.has(imagePath);
}
