import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (res: NextApiResponse, req: NextApiRequest) => {
  const { body } = req
  console.log(body)
  res.status(200).json({ message: 'ok' })
}

export default handler
