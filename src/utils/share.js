export const shareContent = async ({ title, text, url }) => {
  if (typeof window === 'undefined') {
    return 'unsupported'
  }

  const targetUrl = url || window.location.href

  if (navigator.share) {
    await navigator.share({ title, text, url: targetUrl })
    return 'shared'
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(targetUrl)
    return 'copied'
  }

  return 'unsupported'
}
