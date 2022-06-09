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
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
  docs: T[]
}>
