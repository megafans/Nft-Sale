import { NextPage, NextPageContext } from 'next'

type ErrorProps = {
  statusCode?: number
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return <p>An error occurred: {statusCode}</p>
}

Error.getInitialProps = (ctx: NextPageContext) => {
  const { res, err } = ctx
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode }
}

export default Error
