import { useMemo } from 'react'
import WertWidget from '@wert-io/widget-initializer'
import web3EthAbi from 'web3-eth-abi'
import { signSmartContractData } from '@wert-io/widget-sc-signer'
import { v4 as uuid } from 'uuid'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

import { nftSmartContractAddress, wertPrivateKey, wertPartnerID } from '@/helpers/constants'

export const useWertPayment = ({ address }: any) => {
  const router = useRouter()
  const { addToast } = useToasts()

  const input_data = address
    ? web3EthAbi.encodeFunctionCall(
        {
          inputs: [
            { internalType: 'address', name: '_to', type: 'address' },
            { internalType: 'uint256', name: 'num', type: 'uint256' },
          ],
          name: 'mint_to',
          outputs: [],
          stateMutability: 'payable',
          type: 'function',
        },
        [address!, '1']
      )
    : ''

  const signedData = useMemo(
    () =>
      signSmartContractData(
        {
          address: address!,
          commodity: 'ETH',
          commodity_amount: 0.005,
          pk_id: 'key1',
          sc_address: nftSmartContractAddress,
          sc_id: uuid(),
          sc_input_data: input_data,
        },
        wertPrivateKey
      ),
    [address, input_data]
  )

  const wertWidget = new WertWidget({
    ...signedData,
    height: 600,
    width: 960,
    color_background: '#350a44',
    partner_id: wertPartnerID,
    container_id: 'wert-widget',
    click_id: uuid(),
    commodities: 'ETH:Ethereum-Goerli,MATIC:Polygon',
    lang: 'en',
    origin: 'https://sandbox.wert.io',
    theme: 'dark',
    autosize: true,
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
