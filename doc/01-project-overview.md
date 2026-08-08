# 01. Tổng quan Dự án (Project Overview)

## Mục đích
Dự án **Luxury Car Landing** là một nền tảng tạo trang web giới thiệu xe hơi hạng sang. 
Nó được thiết kế để có thể **nhân bản (clone)** ra hàng trăm mẫu xe khác nhau mà chỉ cần dùng 1 bộ code duy nhất, thông qua việc điều khiển biến môi trường (`TARGET_CAR`).

## Kiến trúc Hệ thống
1. **Frontend:** Next.js 15 (App Router), React 19, TailwindCSS v4.
2. **CMS (Nội dung):** Sanity Headless CMS (Dữ liệu lưu trên đám mây, Marketing tự quản lý).
3. **Data Fallback:** Nếu CMS sập hoặc chưa nhập dữ liệu, hệ thống tự động lấy dữ liệu cứng (mock data) từ `src/data/cms.ts` để web luôn chạy 100%.
4. **Xử lý Form (Lead):** Next.js Server Actions (`src/app/actions/sendTelegram.ts`). Dữ liệu khách điền form sẽ bắn thẳng về Telegram của Sale.

## Nhận diện Thương hiệu (UI/UX)
- Sử dụng phong cách thiết kế **Liquid Glass (Kính lỏng)** kết hợp với màu nền `slate-950`.
- Triết lý thiết kế: Tôn vinh hình ảnh sản phẩm, loại bỏ các chi tiết thừa thãi.
- Tập trung vào cá nhân hóa: Hiển thị nổi bật thông tin của Sale/Tư vấn viên như một trợ lý cá nhân.
