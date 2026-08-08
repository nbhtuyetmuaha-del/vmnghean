# Hướng dẫn Bàn giao dự án Luxury Car Landing

Tài liệu này hướng dẫn chi tiết các bước cần thực hiện để thay đổi toàn bộ thông tin gốc, tích hợp cấu hình mới và bàn giao dự án website cho một khách hàng khác (Đại lý hoặc cá nhân tư vấn viên mới).

---

## BƯỚC 1: Thay đổi Dữ liệu Tĩnh (Fallback Data)
Hệ thống có cơ chế Fallback (dữ liệu dự phòng) phòng trường hợp CMS bị lỗi hoặc trống. Dữ liệu này hiển thị mặc định. Bạn cần đổi toàn bộ thông tin mẫu về thông tin của khách hàng mới.

1. Mở file `src/data/cms.ts`.
2. Thay đổi cục `landingPageData`:
   - `carModel`: Cập nhật Tên xe, Slogan, Ảnh Hero, Giá từ, Các tính năng, Hình ảnh. (Lưu ý: Bạn có thể thay link ảnh `https://images.unsplash.com/...` thành link ảnh thực tế).
   - `consultant`: Đổi Họ tên, Chức danh, Số điện thoại, `zaloUrl`, Avatar của Sale mới.
   - `dealership`: Đổi Tên đại lý, Địa chỉ, Hotline của Showroom mới.

---

## BƯỚC 2: Cài đặt Hệ thống nhận Khách hàng (Lead Generation)
Khi khách truy cập điền form "Liên hệ", dữ liệu sẽ được bắn sang Telegram và Google Sheets. Bạn cần cấu hình lại cho khách hàng mới:

1. **Telegram (Bắt buộc)**:
   - Yêu cầu khách tạo một con Bot trên Telegram thông qua `@BotFather` để lấy `TELEGRAM_BOT_TOKEN`.
   - Tạo một Group Chat, thêm con Bot đó vào nhóm và lấy `TELEGRAM_CHAT_ID`.
   - Cập nhật 2 thông số này vào biến môi trường (`.env.local` nếu test ở máy hoặc trong mục Environment Variables của Vercel khi deploy).

2. **Google Sheets (Tuỳ chọn nhưng khuyên dùng)**:
   - Tạo một file Google Sheets cho khách hàng.
   - Tạo Google Apps Script để nhận phương thức POST (Webhook).
   - Lấy đường dẫn Webhook đó gắn vào biến `GOOGLE_SHEET_WEBHOOK_URL`.

---

## BƯỚC 3: Thay đổi Nội dung Động & Bàn giao Sanity CMS
Sanity là hệ thống quản lý bài viết (Headless CMS) giúp khách tự đổi tên xe, hình ảnh trên web.

1. **Cách 1 - Thêm khách vào dự án hiện tại**: 
   - Đăng nhập `sanity.io/manage`. Chọn dự án hiện tại.
   - Vào mục **Team**, Invite (Mời) email của khách hàng vào dự án với quyền `Editor` hoặc `Admin`. Khách sẽ có thể đăng nhập vào `/studio` để tự đổi chữ, thay ảnh.
2. **Cách 2 - Bàn giao đứt (Chuyển quyền sở hữu)**:
   - Tại màn hình Manage dự án của Sanity, chọn mục **Settings > Transfer ownership** để chuyển thẳng Project đó cho tài khoản Sanity của khách hàng.
   - *Lưu ý*: Sau khi transfer, khách hàng vào `ten-mien-cua-khach.com/studio` là có thể tự upload ảnh, giá xe,... 

---

## BƯỚC 4: Thay đổi Nhận diện Thương hiệu (Branding)
Nếu khách hàng thuộc hãng xe khác (Ví dụ từ Volkswagen sang Mercedes hoặc BMW), bạn cần:
1. Mở file `src/app/globals.css`. Thay đổi mã màu chủ đạo của hãng (nếu có sử dụng CSS Variables như `--color-vw-light`).
2. Thay thế Logo hoặc Favicon bằng cách đè file `favicon.ico` trong thư mục `src/app/`.
3. Kiểm tra file `src/app/layout.tsx` để đổi thẻ `<title>` và `<meta name="description">` chuẩn SEO cho khách hàng mới.

---

## BƯỚC 5: Bàn giao Hosting & Domain (Vercel)
Website hiện tại đang được host ở Vercel. Bạn có 2 lựa chọn bàn giao:

1. **Giữ Hosting của bạn, chỉ nối Domain của khách**:
   - Truy cập vào Dashboard Vercel của dự án.
   - Vào **Settings > Domains**.
   - Nhập tên miền khách hàng yêu cầu (vd: `xemec-giatot.com`) và hướng dẫn khách trỏ DNS (A record / CNAME) từ nhà cung cấp tên miền về Vercel.

2. **Chuyển giao toàn bộ Source code và Hosting cho khách**:
   - Push source code (đã đổi Fallback Data ở B1) lên một Repository GitHub riêng biệt và bàn giao GitHub đó cho khách.
   - Khách tự tạo tài khoản Vercel, Import project từ GitHub đó vào Vercel của họ.
   - **ĐẶC BIỆT LƯU Ý**: Nhắc khách hàng phải điền đầy đủ các biến môi trường (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, vv..) ở mục *Environment Variables* trên Vercel trước khi Build, nếu không Form Liên hệ sẽ bị lỗi.

---

*Sau khi thực hiện 5 bước trên, bạn đã có thể tự tin nghiệm thu và bàn giao dự án Landing Page độc lập hoàn toàn cho một người mới.*
