import useSWR from 'swr'
import { useMemo } from 'react'

import { api } from '@/helpers/api'
import { fetcher } from '@/utils/fetcher'

type CountriesProps = {
  id: string | number
  name: string
}

export const useCountries = () => {
  const { data, error, isLoading } = useSWR(`${api.URL}api/Countries`, fetcher, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
    dedupingInterval: 100000,
  })

  const countriesData = useMemo(() => data?.map(({ id, name }: CountriesProps) => ({ id, name })), [data])

  return {
    countries: countriesData,
    isLoading,
    error,
  }
}
