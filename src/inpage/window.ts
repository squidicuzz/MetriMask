import { ISignExternalTxRequest, ISignMessageRequest } from '../types';

function showWindow(width: number, height: number, url: string = '', name: string = 'metrimask-window'): Window {
  const top = (screen.availHeight / 2) - (height / 2);
  const left = (screen.availWidth / 2) - (width / 2);
  const options = `
    height=${height},
    width=${width},
    screenX=${left},
    screenY=${top},
    toolbar=no,
    menubar=no,
    scrollbars=no,
    resizable=no,
    location=no,
    status=no
  `;
  return window.open(url, name, options)!;
}

export function showSignTxWindow(signTxReq: ISignExternalTxRequest) {
  const { url, request } = signTxReq;
  if (!url) {
    throw Error('Cannot resolve Sign Transaction Dialog URL.');
  }
  if (!request) {
    throw Error('No transaction request found.');
  }

  const { account } = request;
  if (!account) {
    throw Error('No account found.');
  }

  const reqStr = JSON.stringify(request);
  const params = `req=${reqStr}&from=${account.address}`;
  showWindow(350, 650, `${url}?${params}`, 'Confirm Transaction');
}

export function showSignMessageWindow(signMessageReq: ISignMessageRequest) {
  const { url, request } = signMessageReq;
  if (!url) {
    throw Error('Cannot resolve Sign Message Dialog URL.');
  }
  if (!request) {
    throw Error('No message signing request found.');
  }

  const { account } = request;
  if (!account) {
    throw Error('No account found.');
  }

  const reqStr = JSON.stringify(request);
  const params = `req=${reqStr}&account=${account.name}`;
  showWindow(350, 650, `${url}?${params}`, 'Sign Message');
}
