import { selector } from 'recoil'
import { userAtom } from './atoms'

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const user = get(userAtom)
    return user
  },
})
