import useSWR from 'swr'

import { api } from '@/helpers/api'

export const useCurrency = () => {
  const { data, error, isLoading } = useSWR(
    '/exchange-rates?currency=ETH',
    async () => {
      const response = await fetch(`${api.COINBASE_URL}/exchange-rates?currency=ETH`)
      const data = await response.json()
      return data.data
    },
    { refreshInterval: 5000 }
  )

  return {
    usd: data?.rates['USD'],
    eur: data?.rates['EUR'],
    gbp: data?.rates['GBP'],
    btc: data?.rates['BTC'],
    error,
    isLoading,
  }
}
