const getContrastColor = (hex: string): "#000" | "#fff" => {
  const normalized = hex.replace("#", "")

  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized

  if (full.length !== 6) return "#000"

  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255

  // sRGB -> linear
  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

  // contrast ratio с белым и чёрным
  const contrastWhite = 1.05 / (L + 0.05)
  const contrastBlack = (L + 0.05) / 0.05

  return contrastBlack >= contrastWhite ? "#000" : "#fff"
}

export { getContrastColor }
