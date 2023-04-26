import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useToasts } from 'react-toast-notifications'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'
import { userAtom } from '@/state/atoms'
import { useBrowser } from './useBrowser'

export const useUser = () => {
  const isBrowser = useBrowser()
  const { addToast } = useToasts()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useRecoilState(userAtom)
  const { address, isConnecting } = useAccount()
  const { push } = useRouter()
  const token = isBrowser ? localStorage.getItem('token') : null

  const { data, error, isLoading } = useSWR(
    token ? [`${api.URL}api/Users/view_profile`, token] : null,
    ([url, token]) => fetcher(url, token)
  )

  useEffect(() => {
    setUser(data?.data)
  }, [data, setUser])

  const userData = useMemo(() => user, [user])

  const edit = async (email: string, username: string, countries: string) => {
    setLoading(true)
    const response = await fetch(`${api?.URL}api/Users/edit_profile`, {
      method: 'POST',
      body: JSON.stringify({ email, username, countries, imageUri: userData.image }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    const data = await response.json()
    try {
      data.success && push('/')
      addToast('User has been updated!', {})
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return data
  }

  return {
    user: userData,
    address,
    isLoading: isLoading || isConnecting,
    error,
    loading,
    edit,
  }
}
