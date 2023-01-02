import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useToasts } from 'react-toast-notifications'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'
import { userState } from '@/state/atoms'

export const useUser = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useRecoilState(userState)
  const { address, isConnecting } = useAccount()
  const { addToast } = useToasts()
  const { push } = useRouter()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const { data, error, isLoading } = useSWR(
    token ? [`${api.URL}/api/Users/view_profile`, token] : null,
    ([url, token]) => fetcher(url, token)
  )

  const edit = async (email: string, username: string, countries: string) => {
    const encodedData = Buffer.from(`${email}:${username}`).toString('base64')
    setLoading(true)
    const response = await fetch(`${api?.URL}Authorization/login?appGameUid=${api.TOKEN}`, {
      method: 'POST',
      body: JSON.stringify({ email, username, countries }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedData}`,
      },
    })
    const data = await response.json()
    try {
      typeof window !== 'undefined' ? localStorage.setItem('token', data?.data?.token) : null
      !data.success && addToast(data.message, {})
      data.success && push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return data
  }

  useEffect(() => {
    setUser(data?.data)
  }, [data, setUser])

  const userData = useMemo(() => user, [user])

  return {
    user: userData,
    address,
    isLoading: isLoading || isConnecting,
    error,
    loading,
    edit,
  }
}
