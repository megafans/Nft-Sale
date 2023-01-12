type FormTitleProps = {
  title: {
    main: string
    sub: string
  }
  subtitle?: {
    main: string
    sub?: string
  }
}

export const FormTitle = ({ title, subtitle }: FormTitleProps) => {
  return (
    <div className="text-white space-y-5 mb-10">
      <h2 className="text-3xl font-bold uppercase font-display">
        {title.main}
        <br /> <span className="text-purple">{title.sub}</span>
      </h2>
      <p className="text-lg md:w-3/4 font-display">
        {subtitle?.main} <br />
        {subtitle?.sub}
      </p>
    </div>
  )
}
