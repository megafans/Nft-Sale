import Image from 'next/image'
import { RegisterForm } from '@/components'

export const Register = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex w-1/2">
        <Image src="/register-img.svg" alt="Login" width={560} height={560} priority />
      </div>
      <div className="md:w-1/2 px-3">
        <div className="text-white space-y-5 mb-10">
          <h2 className="text-3xl font-bold uppercase font-display">
            Sign up
            <br /> <span className="text-purple">Start earning and playing with us today.</span>
          </h2>
          <p className="text-lg md:w-3/4 font-display">
            Join players from all around the world playing the most exciting Mobile, Web3 and Browser based games.
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
