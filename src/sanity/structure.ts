import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Quản lý nội dung')
    .items([
      S.documentTypeListItem('carModel').title('Mẫu xe'),
      S.documentTypeListItem('consultant').title('Tư vấn viên'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['carModel', 'consultant'].includes(item.getId()!),
      ),
    ])
