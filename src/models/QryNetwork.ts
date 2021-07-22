import { Network as MjswNetwork } from 'metrixjs-wallet';

export default class QryNetwork {
  public name: string;
  public network: MjswNetwork;
  public explorerUrl: string;

  constructor(name: string, network: MjswNetwork, explorerUrl: string) {
    this.name = name;
    this.network = network;
    this.explorerUrl = explorerUrl;
  }
}
