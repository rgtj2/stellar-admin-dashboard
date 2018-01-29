import { HorizonServer } from './horizon-server';

export class HorizonProductionServer extends HorizonServer {
  constructor(readonly productionUrl: string,
              readonly networkIsPersistent: boolean) {
    super(productionUrl, false, networkIsPersistent);
  }
}
