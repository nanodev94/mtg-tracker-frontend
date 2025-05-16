import type { SelectOption } from '@/components/Select/Select'
import type { Set } from '@/domain/@types'

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

export const generateSetOptions = (
  data: Set[],
  translations?: any
): SelectOption[] => {
  const options = data.map(({ code, id }) => ({
    label: translations ? translations(code) : code,
    value: `${id}`,
  }))

  return options
}
