import { XCircleIcon } from '@heroicons/react/24/outline'
import { useUser } from '@/hooks'
import { ProfileEditForm } from '@/components'

type ProfileEditProps = {
  isEditMode: boolean
  setEditMode: (value: boolean) => void
}

export const ProfileEdit = ({ isEditMode, setEditMode }: ProfileEditProps) => {
  const { user } = useUser()
  return (
    <div className="mx-auto max-w-auto relative">
      <div className="absolute z-20 top-5 right-5">
        <XCircleIcon className="w-8 h-8 text-white cursor-pointer" onClick={() => setEditMode(!isEditMode)} />
      </div>
      <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl p-16 bg-purple min-h-96 space-y-10">
        <h3 className="text-lg uppercase text-white font-bold">
          You are going to edit {user?.username} ({user?.email})
        </h3>
        <ProfileEditForm />
      </div>
    </div>
  )
}
