type CopyrightProps = {
  text: string
}

export const Copyright = ({ text }: CopyrightProps) => {
  return (
    <div className="mt-12 pt-8">
      <p className="text-base text-white">{text}</p>
    </div>
  )
}
