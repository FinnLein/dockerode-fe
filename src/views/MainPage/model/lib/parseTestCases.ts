import { TestCaseDto } from "@/generated/types"

const parseTestCases = (raw: string): TestCaseDto[] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map((line, index) => {
      const sep = line.indexOf("=>")
      if (sep === -1) {
        throw new Error(
          `Строка ${index + 1}: ожидается формат "вход => ожидание"`
        )
      }
      return {
        input: line.slice(0, sep).trim(),
        expected: line.slice(sep + 2).trim(),
      }
    })

export { parseTestCases }
