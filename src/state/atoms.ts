import { atom } from 'recoil'

import { defaultUser } from '@/helpers/constants'

export const userAtom = atom({
  key: 'userState',
  default: defaultUser,
})

export const nftPaymentAtom = atom({
  key: 'nftPaymentState',
  default: '1',
})

export const nftPaymentETHAtom = atom({
  key: 'nftPaymentETHState',
  default: false,
})

export const avatarAtom = atom({
  key: 'avatarState',
  default: null as any,
})
