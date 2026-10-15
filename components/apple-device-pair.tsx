import type { CSSProperties } from "react";
import Image from "next/image";
import { APPLE_IPHONE, APPLE_MACBOOK } from "@/lib/apple-bezels";

type Frame = typeof APPLE_MACBOOK | typeof APPLE_IPHONE;

function maskStyle(mask: string): CSSProperties {
  return {
    WebkitMaskImage: `url(${mask})`,
    maskImage: `url(${mask})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };
}

/** Official Apple bezel PNG, with the screenshot clipped to the display opening. */
export function AppleDevice({
  frame,
  screen,
  alt,
  sizes,
  priority = false,
}: {
  frame: Frame;
  screen: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const { screen: hole } = frame;
  return (
    <div className="relative w-full" style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
      <div
        className="absolute z-0 overflow-hidden"
        style={{
          left: `${hole.left}%`,
          top: `${hole.top}%`,
          width: `${hole.width}%`,
          height: `${hole.height}%`,
          ...maskStyle(frame.mask),
        }}
      >
        <Image src={screen} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      <Image
        src={frame.src}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        priority={priority}
        className="pointer-events-none z-10 object-fill"
      />
    </div>
  );
}

/** MacBook Pro with an iPhone at the lower right. Used on project pages only. */
export function AppleDevicePair({
  macScreen,
  phoneScreen,
  macAlt,
  phoneAlt,
  priority = false,
}: {
  macScreen: string;
  phoneScreen: string;
  macAlt: string;
  phoneAlt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[920px]">
      <div className="w-[86%]">
        <AppleDevice
          frame={APPLE_MACBOOK}
          screen={macScreen}
          alt={macAlt}
          sizes="(min-width: 1024px) 760px, 86vw"
          priority={priority}
        />
      </div>
      <div className="absolute right-0 bottom-[1%] w-[23%]">
        <AppleDevice
          frame={APPLE_IPHONE}
          screen={phoneScreen}
          alt={phoneAlt}
          sizes="(min-width: 1024px) 200px, 23vw"
          priority={priority}
        />
      </div>
    </div>
  );
}
