export const TrimTextByLength = (text: string, maxlength: number = 8) => {
  if (text.length > maxlength) {
    return text.substring(0, maxlength) + '...'
  }
  return text
}
