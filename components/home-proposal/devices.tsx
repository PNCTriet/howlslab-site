
import Image from "next/image";
import { Ticks } from "./ornaments";

/*
 * Official Apple Product Bezels (Apple Design Resources), cropped to their alpha bounds,
 * downscaled 50% and encoded as WebP:
 *   MacBook Pro (M5) 14-inch Silver  → 1903 × 1148
 *   iPhone 16 Pro Black Titanium     →  654 × 1355
 * Screen rects were measured from each image's transparent screen region (flood fill
 * from the centre, alpha < 128) and are set in proposal.css as percentages:
 *   MacBook: left 10.247% top 2.352% width 79.506% height 85.627% (3024 × 1964 source px, 1.539:1)
 *   iPhone:  left 3.823%  top 1.624% width 92.355% height 96.753% (1206 × 2622 source px, 0.46:1)
 * The base of the MacBook starts at 93.16% of the image height (the hinge), which lets
 * the lid half of the same image rotate open on scroll.
 *
 * Screens are real Playwright captures of https://tryon.howlslab.com taken at the panels'
 * native aspect (1512 × 982 @2x and 402 × 874 @3x), exported as WebP in /public/screens.
 * All images are served as-is (unoptimized): they are already small and keep their alpha.
 */
const MAC = { src: "/devices/macbook-pro-14-m5-silver.webp", w: 1903, h: 1148 };
const PHONE = { src: "/devices/iphone-16-pro-black-titanium.webp", w: 654, h: 1355 };
const SCREEN_DESKTOP = { src: "/screens/tryon-desktop.webp", w: 1512, h: 982 };
const SCREEN_MOBILE = { src: "/screens/tryon-mobile.webp", w: 603, h: 1311 };

/** Real MacBook Pro + iPhone 16 Pro bezels showing real captures of Fitting Lab (tryon.howlslab.com). */
export function DeviceShowcase({ desktopAlt, mobileAlt }: { desktopAlt: string; mobileAlt: string }) {
  return (
    <div data-scene="view" className="pv-device mx-auto">
      <Ticks className="pv-tick-l" />
      <Ticks className="pv-tick-r" flip />

      <div className="pv-mac">
        {/* Base: lower slice of the bezel image, below the hinge */}
        <Image src={MAC.src} width={MAC.w} height={MAC.h} alt="" aria-hidden unoptimized className="pv-bezel pv-mac-base" />
        {/* Lid: screen capture + upper slice of the same image; rotates open around the hinge */}
        <div className="pv-mac-lid">
          <div className="pv-mac-screen">
            <Image src={SCREEN_DESKTOP.src} width={SCREEN_DESKTOP.w} height={SCREEN_DESKTOP.h} alt={desktopAlt} unoptimized className="pv-shot" />
          </div>
          <Image src={MAC.src} width={MAC.w} height={MAC.h} alt="" aria-hidden unoptimized className="pv-bezel" />
        </div>
      </div>

      <div className="pv-phone">
        <div className="pv-phone-screen">
          <Image src={SCREEN_MOBILE.src} width={SCREEN_MOBILE.w} height={SCREEN_MOBILE.h} alt={mobileAlt} unoptimized className="pv-shot" />
        </div>
        <Image src={PHONE.src} width={PHONE.w} height={PHONE.h} alt="" aria-hidden unoptimized className="pv-bezel" />
      </div>
    </div>
  );
}


