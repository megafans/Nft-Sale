import useSWR from 'swr'
import { useMemo, useState } from 'react'
import { format } from 'date-fns'

import { api } from '@/helpers/api'
import { nftRewardsTableHeader } from '@/helpers/constants'
import { fetcher } from '@/utils/fetcher'
import { Pagination, Spinner } from '@/components'
import { useBrowser } from '@/hooks'

type NftRewardsListProps = {
  nftId?: string | string[]
}

type nftRewardsProps = {
  gameName: string
  tournament: string
  date: string
  percent: string
  tokens: string
  id: string
}[]

export const NftRewardsList = ({ nftId }: NftRewardsListProps) => {
  const isBrowser = useBrowser()
  const token = isBrowser ? localStorage.getItem('token') : null
  const [pageNumber, setPageNumber] = useState(1)

  const { data, error, isLoading } = useSWR(
    token ? [`${api.URL}api/NFT/ListNFTRewards?nftId=${nftId}&pageNumber=${pageNumber}`, token] : null,
    ([url, token]) => fetcher(url, token)
  )

  const nftRewards: nftRewardsProps = useMemo(() => data?.data, [data])

  if (error) {
    return <p className="text-center text-white">Failed to load</p>
  }

  return (
    <div className="text-white mt-20">
      <h2 className="font-bold text-xl uppercase leading-10">NFT rewards history:</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {nftRewards && nftRewards.length > 0 && (
            <>
              <div className="flow-root">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-xl">
                      <table className="min-w-full divide-y divide-current">
                        <thead className="bg-white/20">
                          <tr>
                            {nftRewardsTableHeader.map(({ title, id }) => (
                              <th
                                key={id}
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-200 sm:pl-6"
                              >
                                {title}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-violet bg-white/10">
                          {nftRewards.map(({ gameName, tournament, date, percent, tokens, id }) => (
                            <tr key={id}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-6">
                                {gameName}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{tournament}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {format(new Date(date), 'MM/dd/yyyy HH:mm')}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{tokens}</td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{percent}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination
                handleNextPage={() => setPageNumber(pageNumber + 1)}
                handlePreviousPage={() => setPageNumber(pageNumber - 1)}
                pageNumber={pageNumber}
                totalRecords={data?.totalRecords}
                totalPages={data?.totalPages}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}
