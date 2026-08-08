# 06. Tiến độ & Cập nhật (Progress & Changelog)

> **QUY TRÌNH BẮT BUỘC:** File này phải được cập nhật ngay lập tức sau mỗi khi Developer / AI hoàn tất việc viết code hoặc thực hiện một Task từ Product Owner (PO).

## 📊 Trạng thái Dự án
- **Mức độ hoàn thiện:** Sẵn sàng Deploy Production (v1.0)
- **Thiết kế:** Đã hoàn thiện giao diện Liquid Glassmorphism sang trọng.
- **Tính năng nổi bật:** Mọi Form Lead đều đã trơn tru và bắn tín hiệu về Telegram thành công. Phân tách Hero Image thành công. Hỗ trợ hệ thống nhân bản biến `TARGET_CAR`.

## 📝 TODO List (Công việc cần làm)
*(Dành cho các Task sắp tới PO sẽ giao)*
- [x] Bổ sung hiệu ứng Scroll (AOS / Framer Motion) để web mượt mà khi cuộn chuột.
- [x] Thêm Section "Lifestyle/Câu chuyện/Đặc quyền" ở trước hoặc sau phần giá bán.
- [x] Tích hợp mã Tracking Marketing (Pixel, GTM).
- [ ] *(Chờ PO giao thêm)*...

## 🔄 Lịch sử Cập nhật (Changelog)

### [2026-07-23] - Đại tu giao diện Showroom Hub & Sửa lỗi truy cập
- Thiết kế lại Trang chủ (`/`): Đắp thêm Hero Banner hoành tráng, hiệu ứng Framer Motion mượt mà khi cuộn.
- Nâng cấp Thẻ Sản Phẩm (Car Card): Kéo dài tỉ lệ ảnh (4:3 sang trọng hơn), hiệu ứng Liquid Glass khi hover, bổ sung nút "Khám Phá Ngay".
- Thêm Section "Đặc Quyền Dịch Vụ" (Tại sao chọn chúng tôi).
- Fix lỗi chết Link (`#`): Tự động fallback nặn link từ tên xe (VD: `teramont-x`) nếu CMS chưa có Slug. Cập nhật câu query trong `[slug]/page.tsx` để đọc được link fallback.

### [2026-07-23] - Cuộc cách mạng Kiến trúc (SaaS 1-Click)
- Chuyển đổi mô hình 1 web / 1 source sang Multi-tenant SaaS.
- Thêm trường `slug`, `telegramChatId`, `fbPixelId`, `gtmId`, `consultant` trực tiếp vào Schema Sanity.
- Chuyển giao diện Landing Page thành Dynamic Route (`/[slug]`). Bất kỳ tên xe nào gõ vào URL cũng sinh ra 1 web tức thì.
- Biến trang chủ (`/`) thành Hub chứa danh bạ toàn bộ các xe có trong hệ thống.
- Luồng Telegram tự động quét `slug` để biết phải đẩy data khách hàng về Group chat nào.

### [2026-07-20] - Nâng cấp Công cụ Marketing & Trải nghiệm
- Cài đặt `framer-motion`, phủ hiệu ứng trôi mượt mà (Fade-in-up) cho Bảng Giá, Bộ sưu tập ảnh và Thẻ Tư vấn viên khi cuộn trang.
- Bổ sung `LifestyleSection` (Đỉnh Cao Chế Tác) ngay dưới Hero Banner để đẩy cảm xúc khách hàng.
- Xây dựng component `Tracking.tsx` (Facebook Pixel & GTM) cắm sẵn vào Layout, sẵn sàng nhận ID từ biến môi trường.

### [2026-07-20] - Chuẩn hóa quy trình làm việc
- Xóa bỏ thư mục `ai-context` cũ do rườm rà.
- Xây dựng thư mục `/doc` chuẩn mực phục vụ cho cả người và máy.
- Bắt đầu áp dụng quy trình "Cập nhật tiến độ tự động vào doc/06-progress-changelog.md sau mỗi task".

### [2026-07-16] - Nâng cấp Layout Hero Banner
- Tách phần chữ và giá tiền ra khỏi Hero Image.
- Di chuyển toàn bộ Bảng giá Liquid Glass và Nút bấm xuống phía dưới ảnh xe để nhường 100% diện tích khoe thiết kế xe.
- Thêm gradient mờ (sương mù) khớp nền.

### [2026-07-13] - Cải tiến Giao diện Liquid Glass & Sanity
- Đổi nền toàn trang sang `slate-950` có các vệt sáng ambient mờ ảo.
- Biến toàn bộ bảng giá, form contact thành các khối kính (Glassmorphism).
- Nâng cấp `page.tsx` hỗ trợ biến môi trường `TARGET_CAR` để triển khai nhiều web trên 1 code (Cloud Cloning).

### [2026-07-09] - Hoàn thiện Chức năng Lead
- Hoàn thành Component `ContactModal.tsx` và Server Action `sendTelegram.ts`.
- Gắn Avatar và thông tin Sale vào popup.
- Fix lỗi môi trường Vercel liên quan đến `.env.local`.
