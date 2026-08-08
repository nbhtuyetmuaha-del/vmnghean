# 02. Hướng dẫn Cài đặt & Deploy

## Cài đặt trên máy tính (Local)
1. Clone dự án về máy.
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Copy file biến môi trường:
   ```bash
   cp .env.example .env.local
   ```
4. Khởi chạy:
   ```bash
   npm run dev
   ```
   Web sẽ chạy tại `http://localhost:3000` và trang quản trị tại `http://localhost:3000/studio`.

## Các Biến Môi Trường (Environment Variables)
- `TARGET_CAR`: Tên của mẫu xe (VD: `Volkswagen Viloran`). Biến này quyết định trang web sẽ hiển thị mẫu xe nào lấy từ CMS Sanity. Nếu để trống, sẽ lấy mẫu xe đầu tiên.
- `TELEGRAM_BOT_TOKEN`: Mã Bot Telegram (Bắt buộc).
- `TELEGRAM_CHAT_ID`: ID người nhận tin nhắn (Bắt buộc).
- `GOOGLE_SHEET_WEBHOOK_URL`: (Tùy chọn) Link Webhook nếu muốn lưu data vào Google Sheets.

## Quy trình Deploy & Nhân Bản Website
Quy trình "Nhân Bản Đám Mây" cho phép tạo ra hàng chục website khác nhau mà không cần copy code:
1. Tạo data mẫu xe mới trong Sanity Studio (VD: Touareg).
2. Vào Vercel, bấm Import lại dự án `luxury-car-landing` này.
3. Ở bước cấu hình (Configure Project), thêm biến `TARGET_CAR = Volkswagen Touareg`.
4. Bấm Deploy. Website mới sẽ hiển thị xe Touareg với thiết kế y hệt.
