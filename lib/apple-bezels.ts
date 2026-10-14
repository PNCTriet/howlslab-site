/**
 * Official Apple Product Bezels (Apple Design Resources),
 * https://developer.apple.com/design/resources/#product-bezels
 *
 * MacBook Pro (M5) 14-inch Silver — Bezel-MacBook-Pro-M5.dmg
 * iPhone 18 Pro Black, portrait — Bezel-iPhone-18.dmg
 *
 * Transparent padding is cropped. Screen percentages are the transparent
 * display opening (flood-filled, alpha < 128) inside that crop.
 * The matching *-screen.png is a mask of that opening, including rounded corners.
 */
export const APPLE_MACBOOK = {
  src: "/devices/apple-macbook-pro-m5-14-silver.png",
  mask: "/devices/apple-macbook-pro-m5-14-silver-screen.png",
  width: 3806,
  height: 2296,
  screen: { left: 10.273253, top: 2.39547, width: 79.453494, height: 85.54007 },
} as const;

export const APPLE_IPHONE = {
  src: "/devices/apple-iphone-18-pro-black.png",
  mask: "/devices/apple-iphone-18-pro-black-screen.png",
  width: 1318,
  height: 2717,
  screen: { left: 4.248862, top: 1.766654, width: 91.502276, height: 96.503497 },
} as const;
