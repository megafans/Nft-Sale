export const isBrowser = () => typeof window !== 'undefined'

export const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const calculatePercent = (value: number, total: number): number => Math.round((value / total) * 100)

export const getUniqueArray = <T>(items: T[]): T[] => {
  return [...new Set(items)]
}

export const sortBy = (arr: [], key: string | number) =>
  arr.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0))

export const getRandomItem = <T>(items: string | T[]) => items[Math.floor(Math.random() * items.length)]

export const mapObjectToOptions = (obj: Record<string, string>, valueAsLabel = false) =>
  Object.entries(obj).map(([key, label]) => ({
    label,
    value: valueAsLabel ? label : key,
  }))

export const mapArrayToOptions = (arr: string[], valueAsLabel = false) =>
  arr.map(label => ({
    label,
    value: valueAsLabel ? label : label,
  }))
