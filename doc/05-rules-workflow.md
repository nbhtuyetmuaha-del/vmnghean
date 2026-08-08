# 05. Nguyên tắc Code & Workflow (Rules)

Các AI (Antigravity, ChatGPT...) hoặc Lập trình viên thi công dự án phải tuân thủ nghiêm ngặt các quy tắc sau:

## 1. Nguyên tắc KISS (Keep It Simple)
- Giữ mọi thứ đơn giản nhất có thể. Không đẻ thêm thư viện, package hay API Route nếu không bắt buộc.
- Sử dụng Server Actions cho mọi giao tiếp Backend. Tuyệt đối không tự ý cài đặt thêm Express hay Node.js server ngoài.

## 2. Ưu tiên tái sử dụng (DRY)
- Trước khi tạo Component mới, hãy kiểm tra xem có Component nào trong `src/components/` có thể tái sử dụng không.
- Nếu một đoạn logic bị lặp lại quá 2 lần, phải tách ra thành hook hoặc helper function.

## 3. Không Hardcode thông tin nhạy cảm
- Token, API Key, ID của CMS... tuyệt đối không được viết cứng vào file `.ts` hay `.tsx`.
- Phải sử dụng Environment Variables (`process.env...`).

## 4. Definition of Done (DoD)
Một Task / Yêu cầu của Sếp (Product Owner) chỉ được coi là hoàn thành (Done) khi thỏa mãn:
1. [ ] Code chạy đúng nghiệp vụ yêu cầu.
2. [ ] Build không có lỗi (`npm run build`).
3. [ ] Không có cảnh báo lỗi TypeScript / ESLint.
4. [ ] Không làm phá vỡ cơ chế Data Fallback (Kiểm tra xem xóa data CMS web có sập không).
5. [ ] **BẮT BUỘC:** Đã cập nhật tiến độ (Changelog, Trạng thái) vào file `doc/06-progress-changelog.md`.
