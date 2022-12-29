import { selector } from 'recoil'
import { userState } from './atoms'

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const user = get(userState)
    return user
  },
})
