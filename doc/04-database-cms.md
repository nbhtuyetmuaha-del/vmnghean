# 04. Database & CMS (Sanity)

Dự án sử dụng Sanity CMS dạng Headless. Mọi cấu trúc dữ liệu được lưu tại `src/sanity/schemaTypes/`.

## Các Document Types (Bảng)
1. **carModel (Mẫu Xe)**:
   - `name`: Tên xe
   - `slogan`: Câu khẩu hiệu
   - `startingPrice`: Giá thấp nhất
   - `heroImage`: Ảnh chính
   - `variants`: Danh sách các phiên bản (Giá, điểm nổi bật)
   - `gallery`: Thư viện ảnh
2. **consultant (Tư Vấn Viên)**:
   - `name`: Tên nhân viên
   - `title`: Chức danh
   - `phone`: Số điện thoại
   - `zaloUrl`: Link Zalo
   - `avatar`: Ảnh đại diện

## Quy Tắc Sống Còn: Data Fallback
- Đây là quy tắc cực kỳ quan trọng không được phép phá vỡ trong `src/app/page.tsx`.
- **Lý do:** Đôi khi API của Sanity bị lỗi mạng, hoặc nhân viên Marketing quên điền một vài trường dữ liệu. Điều này có thể khiến giao diện web bị vỡ hoặc hiện khoảng trắng.
- **Giải pháp:** Hệ thống luôn lấy dữ liệu từ Sanity trước. Nhưng nếu Sanity trả về lỗi hoặc giá trị rỗng (`null`), mã nguồn phải được viết để tự động chuyển sang lấy dữ liệu bù đắp (fallback) từ file `src/data/cms.ts`.
- Việc này đảm bảo Landing Page có độ ổn định 100%.
