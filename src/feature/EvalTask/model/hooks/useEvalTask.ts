import { Language } from "@/src/entities/tasks/model/types/tasks"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { EvalTaskProps } from '../types/EvalTaskProps'

interface UseEvalTaskParams {
  language: Language[]
  initialCode: EvalTaskProps["initialCode"]
}

export const useEvalTask = ({ language, initialCode }: UseEvalTaskParams) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const queryLang = searchParams.get("lang") as Language | null

  const initialLang =
    queryLang && language.includes(queryLang) ? queryLang : language[0]

  const [selectedLang, setSelectedLang] = useState<Language>(initialLang)

  const getDefaultCode = (lang: Language) =>
    initialCode.find((ic) => ic.language === lang)?.template ?? ""

  const [code, setCode] = useState(() => getDefaultCode(initialLang))

  useEffect(() => {
    if (queryLang !== selectedLang) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("lang", selectedLang)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [selectedLang, queryLang, pathname, router, searchParams])

  const handleLanguageChange = (newLang: Language) => {
    setSelectedLang(newLang)
    setCode(getDefaultCode(newLang))
  }

  const setCodeDebug = (v: string) => {
    console.log('SET_CODE:', JSON.stringify(v), new Error().stack)
    setCode(v)
  }

  return {
    selectedLang,
    code,
    setCode: setCodeDebug, // <-- временно
    handleLanguageChange,
  }
}