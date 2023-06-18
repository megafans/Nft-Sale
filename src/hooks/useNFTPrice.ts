import { useEffect, useState, useMemo } from 'react'
import { BigNumber } from 'ethers'
import numbro from 'numbro'
import { useContractRead } from 'wagmi'

import { ensRegistryABI } from '@/utils/abi'
import { nftSmartContractAddress } from '@/helpers/constants'

const MULTIPLICATOR = 10 ** 18

export const useNFTPrice = () => {
  const [totalNfts, setTotalNfts] = useState<number>(0)
  const [maxNfts, setMaxNfts] = useState<number>(0)

  const baseContract: any = {
    address: nftSmartContractAddress,
    abi: ensRegistryABI,
  }

  const { data: price } = useContractRead<any, any, BigNumber>({
    ...baseContract,
    address: nftSmartContractAddress,
    functionName: 'price',
  })

  const { data: totalSupply } = useContractRead<any, any, BigNumber[]>({
    ...baseContract,
    address: nftSmartContractAddress,
    functionName: 'totalSupply',
  })

  const { data: maxSupply } = useContractRead<any, any, BigNumber[]>({
    ...baseContract,
    address: nftSmartContractAddress,
    functionName: 'maxSupply',
  })

  useEffect(() => {
    setTotalNfts(Number(totalSupply?.toLocaleString()))
  }, [totalSupply])

  useEffect(() => {
    setMaxNfts(Number(maxSupply?.toLocaleString()))
  }, [maxSupply])

  const formatedPrice = useMemo(() => price && Number(BigNumber.from(price)) / MULTIPLICATOR, [price])
  const numberPrice = useMemo(() => numbro(Number(formatedPrice)).format({ mantissa: 3 }), [formatedPrice])

  const nftSold = useMemo(() => totalNfts >= maxNfts, [totalNfts, maxNfts])

  return {
    maxNfts,
    totalNfts,
    nftSold,
    price: formatedPrice,
    numberPrice,
  }
}
