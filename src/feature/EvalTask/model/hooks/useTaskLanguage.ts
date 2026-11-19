import { Language } from "@/src/entities/tasks/model/types/tasks"
import { useYObserver } from "@/src/shared/hooks/useYObserver"
import { useHocuspocusProvider } from "@hocuspocus/provider-react"
import { useMemo } from "react"

interface UseTaskLanguageArgs {
  localLang: Language
  localSetLang: (lang: Language) => void
}

const useTaskLanguage = (args: UseTaskLanguageArgs) => {
  const { localLang, localSetLang } = args

  const provider = useHocuspocusProvider()
  const ymeta = useMemo(
    () => provider?.document.getMap<string>("meta") ?? null,
    [provider]
  )

  const collabLang = useYObserver(ymeta, "language", localLang)

  const currentLang = provider ? collabLang : localLang

  const handleLangChange = (newLang: Language) => {
    if (ymeta) {
      ymeta.set("language", newLang)
    } else {
      localSetLang(newLang)
    }
  }

  return { currentLang, handleLangChange }
}

export { useTaskLanguage }
