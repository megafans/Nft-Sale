import { useMemo } from 'react'
import numbro from 'numbro'
import WertWidget from '@wert-io/widget-initializer'
import web3EthAbi from 'web3-eth-abi'
import { useRecoilValue } from 'recoil'
import { signSmartContractData } from '@wert-io/widget-sc-signer'
import { v4 as uuid } from 'uuid'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

import { nftSmartContractAddress, wertPrivateKey, wertPartnerID } from '@/helpers/constants'
import { nftPaymentAtom } from '@/state/atoms'
import { useBuyNFT } from '@/hooks'

export const useWertPayment = ({ address }: any) => {
  const nftQuantity = useRecoilValue(nftPaymentAtom)
  const router = useRouter()
  const { addToast } = useToasts()

  const { price } = useBuyNFT()
  const formatedPrice = numbro(Number(price) * Number(nftQuantity)).format({ mantissa: 16 })

  const input_data = address
    ? web3EthAbi.encodeFunctionCall(
        {
          inputs: [
            { internalType: 'address', name: '_to', type: 'address' },
            { internalType: 'uint256', name: '_num', type: 'uint256' },
          ],
          name: 'mintTo',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        [address!, nftQuantity ? nftQuantity : '1']
      )
    : ''

  const signedData = useMemo(
    () =>
      signSmartContractData(
        {
          address: address!,
          commodity: 'ETH',
          commodity_amount: Number(nftQuantity) * Number(formatedPrice),
          pk_id: 'key1',
          sc_address: nftSmartContractAddress!,
          sc_id: uuid(),
          sc_input_data: input_data,
        },
        wertPrivateKey!
      ),
    [address, input_data, nftQuantity, formatedPrice]
  )

  const wertWidget = new WertWidget({
    ...signedData,
    height: 600,
    width: 960,
    color_background: '#350a44',
    partner_id: wertPartnerID,
    container_id: 'wert-widget',
    click_id: uuid(),
    commodities: ['commodity:"ETH:Ethereum"'],
    lang: 'en',
    origin: 'https://widget.wert.io',
    theme: 'dark',
    autosize: true,
    extra: {
      item_info: {
        image_url: `https://megafans.blob.core.windows.net/ognftblanks/${nftQuantity}.png`,
      },
    },
    listeners: {
      'payment-status': (data: any) => {
        if (data.status === 'pending') {
          addToast(`Your payment has started and payment id is ${data?.payment_id}`, {})
        }
        if (data.status === 'success') {
          addToast('Congratulation your payment has been completed', {})
          router.push('/nft/confirmation')
        }
      },
    },
  })

  return wertWidget
}
