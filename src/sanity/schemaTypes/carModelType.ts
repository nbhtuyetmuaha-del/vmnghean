import { defineField, defineType } from 'sanity'

export const carModelType = defineType({
  name: 'carModel',
  title: 'Mẫu xe',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tên xe',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Đường dẫn (URL / Tên miền phụ)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Phân loại dòng xe (Gõ tự do)',
      type: 'string',
      description: 'Nhập bất kỳ phân loại nào sếp muốn (Ví dụ: SUV Luxury, Sedan, Xe Điện, Xe 7 Chỗ, Crossover...). Trang chủ sẽ tự động tạo Tab lọc tương ứng.',
    }),
    defineField({
      name: 'telegramChatId',
      title: 'Telegram Chat ID (Nhận khách)',
      type: 'string',
      description: 'Nhóm Telegram riêng của Sale phụ trách mẫu xe này (Bỏ trống sẽ dùng mặc định).',
    }),
    defineField({
      name: 'fbPixelId',
      title: 'Facebook Pixel ID',
      type: 'string',
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
    }),
    defineField({
      name: 'consultant',
      title: 'Tư Vấn Viên Phụ Trách',
      type: 'reference',
      to: [{ type: 'consultant' }],
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      name: 'startingPrice',
      title: 'Giá từ',
      type: 'string',
      description: 'Để trống nếu muốn hiển thị "LIÊN HỆ"'
    }),
    defineField({
      name: 'heroImage',
      title: 'Ảnh Hero (Banner)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Thư viện ảnh',
      description: '📱 Trên Điện thoại: Bấm nút "+ Add item" ➔ Vào Thư viện ảnh ➔ Tích chọn hoặc nhấn giữ NHIỀU ẢNH cùng lúc để tải lên hàng loạt.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'variants',
      title: 'Các phiên bản',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Tên phiên bản', type: 'string' },
            { 
              name: 'price', 
              title: 'Giá', 
              type: 'string', 
              description: 'Để trống nếu muốn hiển thị "Liên hệ"' 
            },
            {
              name: 'highlights',
              title: 'Thông tin nổi bật riêng của bản này',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Ví dụ: Động cơ 2.0L, Loa Harman Kardon, Mâm 20 inch...'
            }
          ],
        },
      ],
    }),
    defineField({
      name: 'specs',
      title: 'Thông số kỹ thuật chung',
      type: 'object',
      fields: [
        { name: 'engine', title: 'Động cơ', type: 'string' },
        { name: 'power', title: 'Công suất', type: 'string' },
        { name: 'gearbox', title: 'Hộp số', type: 'string' },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Tính năng nổi bật',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Tên tính năng', type: 'string' },
            { name: 'description', title: 'Mô tả', type: 'string' },
            { name: 'iconName', title: 'Tên Icon', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
