import { atom } from 'recoil'

import { defaultUser } from '@/helpers/constants'

export const userState = atom({
  key: 'userState',
  default: defaultUser,
})
