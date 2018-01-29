import { HorizonServer } from './horizon-server';

export class HorizonTestServer extends HorizonServer {
  constructor(readonly testUrl: string,
              readonly networkIsPersistent: boolean) {
    super(testUrl, true, networkIsPersistent);
  }
}
