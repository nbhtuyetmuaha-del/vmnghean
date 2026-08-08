import { defineField, defineType } from 'sanity'

export const consultantType = defineType({
  name: 'consultant',
  title: 'Tư vấn viên',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Họ tên',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Chức danh',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
    }),
    defineField({
      name: 'zaloUrl',
      title: 'Link Zalo',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
