import axios, { AxiosResponse } from 'axios'
import { ConnectionFailed, ErrInternetDisconnected } from './errors'

export class Repository {
  static async handle (request: () => Promise<AxiosResponse>) {
    try {
      const response: AxiosResponse = await request()
      return response
    } catch (err: any) {
      if (axios.isCancel(err)) throw err
      if (err.name === 'ERR_INTERNET_DISCONNECTED') throw new ErrInternetDisconnected('Não foi possível se conectar com os nossos serviços')
      if (!err.response) throw new ConnectionFailed('Não foi possível se conectar com os nossos serviços')
      throw err.response.data
    }
  }
}
