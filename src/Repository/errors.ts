
export class ErrInternetDisconnected extends Error {
  name = 'ERR_INTERNET_DISCONNECTED';
  message = 'Verifique sua conexão com a internet';
}

export class ConnectionFailed extends Error {
  name = 'CONNECTION_FAILED';
  message = 'Não foi possível se comunicar com o servidor';
}

export class RouteNotFound extends Error {
  name = 'NOT_FOUND';
  message = 'Rota não encontrada';
}
