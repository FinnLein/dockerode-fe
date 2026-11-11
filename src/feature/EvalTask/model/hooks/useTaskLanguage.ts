import { Language } from '@/src/entities/tasks/model/types/tasks'
import { useYObserver } from '@/src/shared/hooks/useYObserver'
import { Session } from './useCollabSession'

interface UseTaskLanguageArgs {
  session: Session | null
  localLang: Language
  localSetLang: (lang: Language) => void
}

const useTaskLanguage = (args: UseTaskLanguageArgs) => {
  const { session, localLang, localSetLang } = args

  const collabLang = useYObserver(session?.ymeta ?? null, 'language', localLang)

  const currentLang = session ? collabLang : localLang

  const handleLangChange = (newLang: Language) => {
    if (session) {
      session.ymeta.set('language', newLang)
    } else {
      localSetLang(newLang)
    }
  }

  return { currentLang, handleLangChange }
}

export { useTaskLanguage }
