import { GetServerSideProps, NextPage } from 'next'

const ErrorPage: NextPage = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = ({ res }) => {
  res.statusCode = 500
  throw new Error('Internal Server Error')
}

export default ErrorPage
