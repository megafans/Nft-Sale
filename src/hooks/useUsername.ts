import useSWR from 'swr'
import { useMemo } from 'react'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'

export const useUsername = () => {
  const { data, error, isLoading } = useSWR(`${api.URL}/api/Users/GenerateUserName`, fetcher, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
    dedupingInterval: 100000,
  })

  const usernameData = useMemo(() => data, [data])

  return {
    username: usernameData,
    isLoading,
    error,
  }
}
