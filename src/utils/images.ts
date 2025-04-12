export const getImageUrl = (
  locale: string,
  setNumber: number,
  setCode?: string,
  types?: string[]
) => {
  // folder
  let imageUrl = `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE}/${setCode}`
  if (types?.includes('ART')) imageUrl += '/arts'
  else if (types?.includes('TOKEN')) imageUrl += `/${locale}/tokens`
  else imageUrl += `/${locale}/cards`

  // folder/img
  return `${imageUrl}/${setCode}${setNumber.toString().padStart(4, '0')}`
}

export const getSetUrl = (setCode: string) => {
  // folder
  const setUrl = `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE}/${setCode}`

  // folder/logo
  return {
    symbol: `${setUrl}/${setCode}Logo_symbol`,
    name: `${setUrl}/${setCode}Logo_name`,
  }
}
