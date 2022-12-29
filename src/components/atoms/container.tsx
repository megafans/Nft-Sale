import { ReactNode } from 'react'

type ContainerProps = { children: ReactNode }

export const Container = ({ children }: ContainerProps) => {
  return <div className="mx-auto sm:px-2 lg:px-6 py-8 lg:py-16 w-full lg:max-w-7xl">{children}</div>
}
