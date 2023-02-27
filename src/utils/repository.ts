import { api } from '@/helpers/api'

export const sendUserWallet = async (walletAddress?: string) => {
  const response = await fetch(`${api.URL}api/NFT/wallet`, {
    method: 'POST',
    body: JSON.stringify({
      walletAddress,
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
