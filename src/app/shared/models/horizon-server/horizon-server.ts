export abstract class HorizonServer {

  constructor(public url: string,
              public friendbotIsEnabled: boolean,
              public networkIsPersistent: boolean) {}
}
