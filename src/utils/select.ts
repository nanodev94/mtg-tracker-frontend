import type { SelectOption } from '@/components/Select/Select'

export const generateOptions = (
  data: string[],
  translations?: any,
  sort?: boolean
): SelectOption[] => {
  const options = data.map((item) => ({
    label: translations ? translations(item) : item,
    value: item,
  }))

  if (sort) options.sort((a, b) => a.label.localeCompare(b.label))

  return options
}
