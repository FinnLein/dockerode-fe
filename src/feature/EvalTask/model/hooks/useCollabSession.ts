import { createCollabProvider } from '@/src/shared/lib/collab/createCollabProvider';
import { useEffect, useState } from 'react';
import { Awareness } from 'y-protocols/awareness';
import * as Y from 'yjs';

interface Session {
	ytext: Y.Text
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
		const provider = createCollabProvider({ roomId, ydoc })

		setSession({
			ytext: ydoc.getText('code'),
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