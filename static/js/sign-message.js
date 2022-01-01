let fromAccount;
let fromAddress;
let request;

const updateFields = () => {
  const { args } = request;
  const url = args[0] || '';
  const message = args[1] || '';

  document.getElementById('account-field').innerText = fromAccount;
  document.getElementById('address-field').innerText = fromAddress;
  document.getElementById('url-field').innerText = url;
  document.getElementById('message-field').innerText = message;
};

const extractReqParams = () => {
  const urlParams = window.location.search.substr(1).split('&');
  urlParams.forEach((param) => {
    const keyValue = param.split('=');
    if (keyValue.length !== 2) {
      return;
    }

    const key = keyValue[0];
    if (key === 'req') {
      request = JSON.parse(decodeURIComponent(keyValue[1]));
      fromAccount = request.account.name;
      fromAddress = request.account.address;
    }
  });

  updateFields();
};

const confirmTransaction = () => {
  const { id, args } = request;
  chrome.runtime.sendMessage({
    type: 'EXTERNAL_SIGN_MESSAGE', // MESSAGE_TYPE.EXTERNAL_SIGN_MESSAGE
    id,
    args
  });

  window.close();
};

const cancelTransaction = () => {
  chrome.runtime.sendMessage({
    type: 'METRIMASK_WINDOW_CLOSE' // MESSAGE_TYPE.METRIMASK_WINDOW_CLOSE
  });

  window.close();
};

window.onload = () => {
  extractReqParams();
  document
    .getElementById('button-confirm')
    .addEventListener('click', confirmTransaction);
  document
    .getElementById('button-cancel')
    .addEventListener('click', cancelTransaction);
};
