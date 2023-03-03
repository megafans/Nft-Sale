import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (res: NextApiResponse, req: NextApiRequest) => {
  const { body } = req
  console.log(body)
}

export default handler
