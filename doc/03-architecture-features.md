# 03. Architecture & Features

## Components Chính (`src/components/`)
1. **HeroBanner.tsx**: Khối trên cùng hiển thị ảnh toàn cảnh của xe, tên xe và câu slogan. Chịu trách nhiệm tạo ấn tượng thị giác đầu tiên (Desire).
2. **VariantPricing.tsx**: Bảng giá các phiên bản. Các thẻ giá được thiết kế dạng khối kính lỏng (Liquid Glass) có viền phát sáng, trong đó phiên bản cao cấp nhất luôn được làm nổi bật.
3. **CarGallery.tsx**: Lưới ảnh slider thể hiện các góc nhìn khác nhau của xe. Nền trong suốt để thừa hưởng nền slate-950 của toàn trang.
4. **ConsultantContact.tsx**: Card hiển thị hình ảnh và số điện thoại, Zalo của chuyên viên tư vấn. Thiết kế cá nhân hóa, nổi bật (VIP Concierge).
5. **ContactModal.tsx**: Hộp thoại nổi (Popup) xuất hiện khi khách ấn "Nhận tư vấn". Chứa form điền thông tin (Tên, SĐT...).

## Server Actions (`src/app/actions/`)
- **sendTelegram.ts**: Hành động diễn ra ở Server. Khi khách hàng bấm Submit Form, form data sẽ được đẩy thẳng vào hàm này.
- Hàm này tự động gom các thông tin: Tên, SĐT, Địa chỉ, và Phiên bản khách đang quan tâm.
- Sau đó sử dụng hàm `fetch` để gọi API của Telegram bắn tin nhắn đến Sale.

## Routing
- `/`: Trang chủ Landing Page (hiển thị Mẫu xe theo biến `TARGET_CAR`).
- `/studio`: Trang quản trị nội dung CMS (Sanity).
