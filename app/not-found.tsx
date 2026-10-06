import Link from "next/link";
import { AppleButton } from "@/components/apple-button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-24 text-center md:py-36">
      <p className="text-[14px] font-medium text-ink-secondary">404</p>
      <h1 className="mt-3 text-[40px] font-semibold tracking-[-0.025em] text-foreground md:text-[56px]">
        Không tìm thấy trang
      </h1>
      <p className="mt-4 text-[17px] leading-[1.47] text-ink-secondary">
        Đường dẫn này không có trong HOWL LAB.
      </p>
      <div className="mt-8 flex justify-center">
        <AppleButton nativeButton={false} render={<Link href="/" />}>
          Về trang chủ
        </AppleButton>
      </div>
    </div>
  );
}
