import { createCollabProvider } from '@/src/shared/lib/collab/createCollabProvider';
import { useEffect, useState } from 'react';
import { Awareness } from 'y-protocols/awareness';
import * as Y from 'yjs';

export interface Session {
	ytext: Y.Text
	ymeta: Y.Map<string>
	awareness: Awareness
}

export const useCollabSession = (roomId: string | null) => {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		if (!roomId) {
			setSession(null)
			return
		}

		const ydoc = new Y.Doc()

		const key = `yjs-init-${roomId}`
		const state = sessionStorage.getItem(key)
		if(state){
			const stateArray = new Uint8Array(JSON.parse(state))
			Y.applyUpdate(ydoc, stateArray)
			sessionStorage.removeItem(key)
		}

		const provider = createCollabProvider({ roomId, ydoc })

		setSession({
			ytext: ydoc.getText('code'),
			ymeta: ydoc.getMap('meta'),
			awareness: provider.awareness
		})

		return () => {
			provider.destroy()
			ydoc.destroy()
			setSession(null)
		}
	}, [roomId])

	return session
}