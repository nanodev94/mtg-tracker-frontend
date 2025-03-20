import type { SelectOption } from '@/components/Select/Select'

export const generateOptions = (
  data: string[],
  translations?: any
): SelectOption[] =>
  data.map((item) => ({
    label: translations ? translations(item) : item,
    value: item,
  }))
