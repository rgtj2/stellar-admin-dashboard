export abstract class HorizonServer {
  public isReachable: boolean;

  constructor(public url: string,
              public friendbotIsEnabled: boolean,
              public networkPassphrase: string) {}
}
