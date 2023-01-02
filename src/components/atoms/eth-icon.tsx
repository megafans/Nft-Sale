import clsx from 'clsx'

type EthIconProps = {
  colorClass: string
}

export const EthIcon = ({ colorClass }: EthIconProps) => {
  return (
    <svg
      className={clsx(['w-3 h-6 mr-1 font-bold', colorClass])}
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 10L6 0L12 10L6 14L0 10Z" />
      <path d="M0 11.5L6 15.5L12 11.5L6 20L0 11.5Z" />
    </svg>
  )
}
