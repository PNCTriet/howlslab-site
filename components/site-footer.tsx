import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/10">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-6 py-12 md:grid-cols-3 md:py-16">
        <div>
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">HOWL LAB</p>
          <p className="mt-3 max-w-[28ch] text-[12px] leading-[1.4] text-muted-foreground">
            Studio sản phẩm của {site.founder} ({site.founderHandle}), tại Việt Nam.
          </p>
        </div>
        <nav aria-label="Chân trang">
          <p className="text-[12px] font-medium text-foreground">Điều hướng</p>
          <ul className="mt-3 space-y-2 text-[12px]">
            <li>
              <Link href="/" className="text-link hover:underline">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/#du-an" className="text-link hover:underline">
                Dự án
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-link hover:underline">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-[12px] font-medium text-foreground">Liên hệ</p>
          <ul className="mt-3 space-y-2 text-[12px]">
            <li>
              <a className="text-link hover:underline" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-link hover:underline">
                Yêu cầu demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-2 border-t border-border px-6 py-6 text-[12px] leading-[1.4] text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} HOWL LAB</p>
        <p>Ảnh minh hoạ. Ảnh chụp sản phẩm — Sắp cập nhật.</p>
      </div>
    </footer>
  );
}
