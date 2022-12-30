import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

import { api } from '@/helpers/api'

type TokenProps = string | string[] | undefined

export const useAuth = () => {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)
  const { addToast } = useToasts()

  const login = async (email: string, password: string) => {
    const encodedData = Buffer.from(`${email}:${password}`).toString('base64')
    setLoading(true)
    const response = await fetch(`${api?.URL}Authorization/login?appGameUid=${api.TOKEN}`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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

  const register = async (email: string, password: string, username: string) => {
    setLoading(true)
    const response = await fetch(`${api?.URL}api/Users`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 400) {
      setLoading(false)
      addToast('User with this email or username already exists', {})
    }
    const data = await response.json()
    try {
      data.id && addToast(`User ${data.username} has been created successfuly`, {})
      data.id &&
        setTimeout(() => {
          push('/')
        }, 3100)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return data
  }

  const recovery = async (email: string) => {
    setLoading(true)
    const response = await fetch(`${api?.URL}Authorization/forgot_password`, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    try {
      data.success && addToast(`Password recovery email has been sent to ${email}`, {})
      setTimeout(() => {
        push('/forgot-password/success')
      }, 3100)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
    return data
  }

  const reset = async (password: string, confirm_password: string, token: TokenProps) => {
    setLoading(true)
    const response = await fetch(`${api?.URL}Authorization/new_password?token=${token}`, {
      method: 'POST',
      body: JSON.stringify({ password, confirm_password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    try {
      typeof window !== 'undefined' ? localStorage.setItem('token', data?.data?.token) : null
      !data.success && addToast('Something went wrong', {})
      data.success && push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
    recovery,
    reset,
    loading,
  }
}
