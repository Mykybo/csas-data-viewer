import * as React from 'react'

import NoData from '../NoData'
import DataTable from './components/DataTable'

interface IProps {
  data: IAccount[]
  pagination: IPagination
}

export interface IAccount {
  accountNumber: string
  bankCode: string
  transparencyFrom: string
  transparencyTo: string
  publicationTo: string
  actualizationDate: string
  balance: number
  currency: string
  name: string
  iban: string
}

export interface IPagination {
  pageNumber: number
  pageSize: number
  pageCount: number
  nextPage: number
  recordCount: number
}

const DataView = ({ data, pagination }: IProps) => {
  if (!data || !data.length) {
    return <NoData />
  }

  return (
    <DataTable
      data={data}
      pagination={pagination}
      dataKey='accountNumber'
      expansionPossible
    />
  )
}

export default DataView
