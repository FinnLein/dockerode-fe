const useShareRoom = () => {
  return async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert("Ссылка скопирована в буфер обмена!")
    } catch (err) {
      console.error("Не удалось скопировать ссылку", err)
    }
  }
}

export { useShareRoom }
