import "./useMonacoCursors.css"

import { useEffect } from "react"
import type { Awareness } from "y-protocols/awareness.js"
import { getContrastColor } from "./getContrastColor"

const DEFAULT_COLOR = "#f97316"
const DEFAULT_NAME = "Участник"

const escapeCssString = (value: string) =>
  value.replace(/[\r\n\f]/g, " ").replace(/[\\"]/g, "\\$&")

const sanitizeColor = (color: unknown) =>
  typeof color === "string" && CSS.supports("color", color)
    ? color
    : DEFAULT_COLOR

const useMonacoCursors = (awareness: Awareness | null) => {
  useEffect(() => {
    if (!awareness) return

    const styleElement = document.createElement("style")
    document.head.appendChild(styleElement)

    let prevCss = ""

    const updateCursorStyles = () => {
      let css = ""

      awareness.getStates().forEach((state, clientId) => {
        if (clientId === awareness.clientID) return

        const user = state.user as { name?: string; color?: string } | undefined
        const color = sanitizeColor(user?.color)
        const safeName = escapeCssString(user?.name || DEFAULT_NAME)

        const textColor = getContrastColor(color)

        css += `
			.yRemoteSelection-${clientId} {
				background-color: color-mix(in srgb, ${color} 40%, transparent);
			}
			.yRemoteSelectionHead-${clientId} {
				border-color: ${color};
			}
			.yRemoteSelectionHead-${clientId}::after {
				content: "${safeName}";
				background-color: ${color};
				color: ${textColor};
			}
		`
      })

      if (css === prevCss) return
      prevCss = css
      styleElement.textContent = css
    }

    updateCursorStyles()
    awareness.on("update", updateCursorStyles)

    return () => {
      awareness.off("update", updateCursorStyles)
      styleElement.remove()
    }
  }, [awareness])
}

export { useMonacoCursors }
