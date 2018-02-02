import { HorizonServer } from './horizon-server';

export class HorizonProductionServer extends HorizonServer {
  constructor(readonly url: string,
              readonly networkPassphrase: string) {
    super(url, false, networkPassphrase);
  }
}
