import useSWR from 'swr'
import { useAccount } from 'wagmi'
import { useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'
import { userState } from '@/state/atoms'

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState)
  const { address, isConnecting } = useAccount()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const { data, error, isLoading } = useSWR(
    token ? [`${api.URL}/api/Users/view_profile`, token] : null,
    ([url, token]) => fetcher(url, token)
  )

  useEffect(() => {
    setUser(data?.data)
  }, [data, setUser])

  const userData = useMemo(() => user, [user])

  return {
    user: userData,
    address,
    isLoading: isLoading || isConnecting,
    error,
  }
}
