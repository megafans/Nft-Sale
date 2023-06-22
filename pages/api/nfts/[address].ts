import { NextApiRequest, NextApiResponse } from 'next'

import { Alchemy, Network } from 'alchemy-sdk'

const apiKey = '1ycYKWwImku2UgUNYpQ3QPoMS-Rvzjp5'

const alchemy = new Alchemy({
  apiKey,
  network: Network.ETH_GOERLI,
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query
  if (!address || process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS) {
    res.status(404)
  }
  const nfts = await alchemy.nft.getNftsForOwner(address as string, {
    contractAddresses: [process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS as string],
  })
  res.status(200).json(nfts)
}

export default handler
