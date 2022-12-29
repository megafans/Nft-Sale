import { NextPage, NextPageContext } from 'next'

type ErrorProps = {
  statusCode?: number
}

const Error: NextPage<ErrorProps> = ({ statusCode = 418 }) => {
  return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
}

Error.getInitialProps = (ctx: NextPageContext) => {
  const { res, err } = ctx
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode }
}

export default Error
