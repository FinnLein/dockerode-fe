import { useEffect, useState } from 'react'
import * as Y from 'yjs'

const useYObserver = <T>(ymeta: Y.Map<T> | null, key: string, defaultValue: T) => {
	const [value, setValue] = useState(() => {
		return ymeta?.get(key) ?? defaultValue
	})

	useEffect(() => {
		if (!ymeta) {
			setValue(defaultValue)
			return
		}

		const handler = () => {
			setValue((ymeta.get(key) as T) ?? defaultValue)
		}

		ymeta.observe(handler)

		return () => ymeta?.unobserve(handler)
	}, [ymeta, key, defaultValue])

	return value
}

export { useYObserver }

