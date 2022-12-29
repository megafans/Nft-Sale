import axios from 'axios'
import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

import { api } from '@/helpers/api'

export const useAuth = () => {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const { addToast } = useToasts()

  const login = async (email: string, password: string) => {
    const encodedData = Buffer.from(`${email}:${password}`).toString('base64')
    setLoading(true)
    const { data } = await axios.post(
      `${api?.URL}Authorization/login?appGameUid=${api.TOKEN}`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedData}`,
        },
      }
    )
    try {
      typeof window !== 'undefined' ? localStorage.setItem('token', data?.data?.token) : null
      setLoading(false)
      data.success && push('/')
      !data.success && addToast(data.message, {})
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    return data
  }

  const register = async (email: string, password: string, username: string) => {
    setLoading(true)
    const { data } = await axios.post(
      `${api?.URL}api/Users`,
      {
        email,
        password,
        username,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    try {
      setLoading(false)
      data.id && push('/')
      data.id && addToast(`User ${data.username} has been created successfuly`, {})
    } catch (error) {
      console.log(error)
    }
    return data
  }

  const logout = () => {
    typeof window !== 'undefined' ? localStorage.removeItem('token') : null
    push('/')
  }

  return {
    login,
    register,
    logout,
    loading,
  }
}
