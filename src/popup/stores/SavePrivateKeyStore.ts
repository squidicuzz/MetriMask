import { observable, action } from 'mobx';

import AppStore from './AppStore';
import { MESSAGE_TYPE } from '../../constants';

const INIT_VALUES = {
  privateKey: '',
  walletName: '',
  password: '',
  invalidPassword: false
};

export default class SavePrivateKeyStore {
  @observable public privateKey: string = INIT_VALUES.privateKey;
  @observable public password: string = INIT_VALUES.password;
  @observable public invalidPassword: boolean = INIT_VALUES.invalidPassword;
  public walletName: string = INIT_VALUES.walletName;

  private app: AppStore;

  constructor(app: AppStore) {
    this.app = app;
  }


  @action
  public init = () => {
    chrome.runtime.onMessage.addListener(this.handleMessage);
  }

  @action
  public deinit = () => {
    this.reset();
    chrome.runtime.onMessage.removeListener(this.handleMessage);

  }

  @action
  confirmLogin = () => {
    this.app.routerStore.push('/loading'), chrome.runtime.sendMessage({
        type: MESSAGE_TYPE.CONFIRM_PASSWORD,
        password: this.password
    });
  }

  @action
  savePrivateKey = () => {
    this.app.routerStore.push('/loading'), chrome.runtime.sendMessage({
        type: MESSAGE_TYPE.SAVE_PRIVATE_KEY_TO_FILE,
        accountName: this.walletName,
        key: this.privateKey
    });
  }

  @action
  public reset = () => Object.assign(this, INIT_VALUES)

  @action
  private handleMessage = (request: any) => {
    switch (request.type) {
      case MESSAGE_TYPE.GET_PRIVATE_KEY:
        this.walletName = request.walletName;
        this.privateKey = request.privateKey;
        break;
      default:
        break;
    }
  }
}
