import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as Y from 'yjs'

export const useCollabRoom = (getCurrentCode: () => string, onLeave: () => void) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const roomId = searchParams.get('roomId')

  const createRoom = () => {
    const newRoomId = crypto.randomUUID()

    const tempDoc = new Y.Doc()
    tempDoc.getText('code').insert(0, getCurrentCode())
    const state = Y.encodeStateAsUpdate(tempDoc)

    sessionStorage.setItem(`yjs-init-${newRoomId}`, JSON.stringify(Array.from(state)))
    tempDoc.destroy()

    const params = new URLSearchParams(searchParams.toString())
    params.set('roomId', newRoomId)
    router.push(`${pathname}?${params.toString()}`)
  }

  const leaveRoom = () => {
    onLeave()
    const params = new URLSearchParams(searchParams.toString())
    params.delete('roomId')
    router.push(`${pathname}?${params.toString()}`)
  }

  const shareRoom = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Ссылка скопирована в буфер обмена!')
    } catch (err) {
      console.error('Не удалось скопировать ссылку', err)
    }
  }

  return { roomId, createRoom, leaveRoom, shareRoom }
}