import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/cookieMethods';
import type { TDispatch, TStore } from '../../utils/types';
import { TActions } from '../actions/types';

interface IWSActions {
  wsStart: any;
  wsSuccess: any;
  wsError: any;
  wsClosed: any;
  wsMessage: any;
  wsStop: any;
}

export const wsMiddleware = (
  wsUrl: string,
  { wsStart, wsSuccess, wsError, wsClosed, wsMessage, wsStop }: IWSActions,
  withAuth: boolean = false

): Middleware => {
  return ((store: MiddlewareAPI<TDispatch, TStore>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === wsStart) {
        socket = new WebSocket(
          withAuth ? `${wsUrl}?token=${getCookie('accessToken')}` : wsUrl
        );
      };

      if (socket) {
        socket.onopen = (evt) => {
          dispatch({ type: wsSuccess, payload: evt });
        };

        socket.onerror = (evt) => {
          dispatch({ type: wsError, payload: evt });
        };

        socket.onmessage = (evt) => {
          const { data } = evt;

          dispatch({ type: wsMessage, payload: data });

          if (data === 'ping') {
            socket?.send('pong');
          }
        };

        socket.onclose = (evt) => {
          dispatch({ type: wsClosed, payload: evt });
        };

        if (type === wsStop) {
          socket.close(1000);
        };
      };

      next(action);
    };
  }) as Middleware;
};
