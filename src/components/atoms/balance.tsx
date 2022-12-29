import { useUser } from '@/hooks'

export const Balance = () => {
  const { user } = useUser()
  return (
    <div className="z-10">
      <div className="flex flex-col items-center justify-center bg-white/20 p-6 rounded-lg">
        <p className="text-white text-base font-bold uppercase">Mfan balance:</p>
        <p className="text-white text-3xl font-bold ml-2">{user?.clientBalance}</p>
      </div>
    </div>
  )
}
