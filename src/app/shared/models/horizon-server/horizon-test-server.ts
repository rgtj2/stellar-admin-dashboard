import { HorizonServer } from './horizon-server';

export class HorizonTestServer extends HorizonServer {
  constructor(readonly url: string,
              readonly networkPassphrase: string) {
    super(url, true, networkPassphrase);
  }
}
