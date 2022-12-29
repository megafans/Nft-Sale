import Image from 'next/image'
import { LoginForm } from '@/components'

export const Login = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex w-1/2">
        <Image src="/login-img.svg" alt="Login" width={560} height={560} priority />
      </div>
      <div className="md:w-1/2 px-3">
        <div className="text-white space-y-5 mb-10">
          <h2 className="text-3xl font-bold uppercase font-display">
            WHERE do we start ?<br /> <span className="text-purple">GameFi Tournament System.</span>
          </h2>
          <p className="text-lg md:w-3/4 font-display">
            Play-and-Win NFTs, Crypto, RL Rewards NFTs Earn In-Game Tokens (Revenue) Global MMO Tournaments Active
            Esports Community
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
