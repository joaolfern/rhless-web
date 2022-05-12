import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type IRequest<PARAMS> = AxiosRequestConfig & {
  params: PARAMS
}

export type IRequestPaginated = {
  page: number
  limit: number
}

export type IRequestSearchable = {
  search?: string
}

export type IResponse<T> = AxiosResponse<T>

export type IResponsePaginated<T> = IResponse<{
  page: number
  pageTotal: number
  docs: T[]
  hasNextPage: boolean
}>
