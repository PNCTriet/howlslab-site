# HOWL LAB

Portfolio tĩnh của HOWL LAB — studio sản phẩm của Triết (Howls). Mỗi dự án là một trang case study. Site build bằng Next.js (App Router), TypeScript, Tailwind, và file MDX. Không có backend: trang được sinh tĩnh (SSG) và deploy được lên Vercel.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://127.0.0.1:3847

```bash
npm run lint
npm run build
```

## Content model

Mỗi dự án là một file `content/projects/<slug>.mdx`. Tên file phải trùng `slug`.

| Field | Bắt buộc | Ghi chú |
| --- | --- | --- |
| `title` | có | Tên hiển thị |
| `slug` | có | Khớp tên file, chữ thường, gạch ngang |
| `status` | có | `live` hoặc `outdated` |
| `summary` | có | Một đoạn ngắn |
| `cover` | có | Đường dẫn trong `public/`, ví dụ `/projects/virtual-visit/cover.svg` |
| `gallery` | không | Mảng `{ src, alt, caption }` |
| `tags` | không | Nhãn ngắn. Để trống thì không hiện trên thẻ |
| `tech` | không | Công nghệ. Để trống thì trang ghi **Sắp cập nhật** |
| `year` | không | Số năm. Thiếu thì trang ghi **Sắp cập nhật** |
| `client` | không | Tên khách hàng |
| `hideClient` | không | `true` thì không hiện tên khách trên trang |
| `demoUrl` | không | URL http(s). Chỉ hiện nút **Xem thử** khi `status: live` và có URL |
| `featured` | không | `true` và `status: live` thì lên khối đầu trang chủ |
| `features` | không | Các ý tính năng. Để trống thì ghi **Sắp cập nhật** |
| `order` | không | Số để sắp xếp. Nhỏ hơn thì đứng trước |

Phần thân file (Markdown / MDX) là bài giới thiệu. Chi tiết chưa biết thì viết đúng câu **Sắp cập nhật**.

Nút:

- **Xem thử** — dự án `live` và có `demoUrl` (mở tab mới)
- **Yêu cầu demo** — còn lại, kể cả CRM đang dùng nội bộ nhưng không có link public, và mọi dự án `outdated`

## Thêm một dự án

1. Tạo `content/projects/ten-du-an.mdx` (copy một file có sẵn).
2. Đặt ảnh vào `public/projects/ten-du-an/` — ảnh chụp thật (jpg, png, webp) hoặc SVG. Cập nhật `cover` và `gallery`.
3. Điền frontmatter. `slug` phải là `ten-du-an`.
4. `npm run build` — file sai schema hoặc thiếu ảnh sẽ fail lúc build.

Ảnh minh hoạ hiện tại được tạo bằng:

```bash
npm run placeholders
```

Script ghi đè SVG trong `public/projects/`. Đừng chạy lại sau khi đã thay bằng ảnh thật.

Trang chủ hiện mỗi dự án thành một icon app (squircle) trên thanh dock. Icon nằm ở `public/projects/<slug>/icon.svg` (thiếu thì dùng `cover`). Icon hiện tại và avatar `public/avatar.svg` được tạo bằng `npm run icons`; dự án mới thì thêm màu + glyph trong `scripts/generate-icons.mjs` hoặc đặt một `icon.svg` vuông của riêng bạn. Chữ ký "howlslab" ở cuối trang được sinh bằng `npm run signature`.

## Liên hệ

Form ở `/contact` không gửi lên server. Nó mở thư nháp `mailto:` tới địa chỉ trong `lib/site.ts` (`contactEmail`). Địa chỉ hiện tại `hello@howlslab.com` là placeholder.

## Chủ studio cần bổ sung

- Email liên hệ thật (sửa `contactEmail` trong `lib/site.ts`)
- Ảnh chụp màn hình từng sản phẩm, kèm chú thích
- Năm, công nghệ, và đoạn mô tả còn ghi **Sắp cập nhật**
- Tên khách được phép hiện: mọi dự án đang `hideClient: true`. Chỉ đổi thành `false` khi khách đã cho phép nêu tên. Trang công khai mô tả khách theo loại hình, không theo tên.
- Quyết định dự án nào `featured: true`
