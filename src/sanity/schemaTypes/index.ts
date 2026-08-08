import { type SchemaTypeDefinition } from 'sanity'
import { carModelType } from './carModelType'
import { consultantType } from './consultantType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carModelType, consultantType],
}
