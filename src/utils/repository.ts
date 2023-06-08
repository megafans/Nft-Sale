import { api } from '@/helpers/api'

export const sendUserWallet = async (walletAddress?: string, connected?: boolean) => {
  const response = await fetch(`${api.URL}api/NFT/wallet`, {
    method: 'POST',
    body: JSON.stringify({
      walletAddress,
      connected,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

export const listNFTRewards = async (id: string) => {
  const response = await fetch(`${api.URL}api/NFT/ListNFTRewards?nftId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  return response
}

export const getUser = async () => {
  const response = await fetch(`${api.URL}api/Users/view_profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
  const data = await response.json()
  return data.data
}

export const imageUpload = async (file: any) => {
  const user = await getUser()
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(`${api.URL}api/Image/ImageUpload?typeId=2`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  if (response?.status === 200) {
    const data = await response.json()
    const res = await fetch(`${api.URL}api/Users/edit_profile`, {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        username: user.username,
        countries: user.countries,
        imageUri: data?.imageURI,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return res
  }
}
