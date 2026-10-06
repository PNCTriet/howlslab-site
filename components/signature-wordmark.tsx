import { Caveat } from "next/font/google";

const script = Caveat({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

export function SignatureWordmark() {
  return (
    <p
      className={`${script.className} py-16 text-center text-[clamp(4.75rem,14vw,7.75rem)] leading-none text-[#bdbdbd] select-none md:py-24 dark:text-white/25`}
    >
      howlslab
    </p>
  );
}
