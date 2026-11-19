type Language = "javascript" | "golang" | "python"

interface Code {
  language: Language
  template: string
}

export type { Code, Language }
