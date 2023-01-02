import { atom } from 'recoil'

import { defaultUser } from '@/helpers/constants'

export const userAtom = atom({
  key: 'userState',
  default: defaultUser,
})
