export const useBrowser = () => {
  const isBrowser = typeof window !== 'undefined'

  return isBrowser
}
