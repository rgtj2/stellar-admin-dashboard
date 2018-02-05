import { Injectable } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import {
  faMoon as faSolidMoon,
  faSun as faSolidSun,
  faRocket,
  faServer
} from '@fortawesome/fontawesome-free-solid';
import { faMoon, faSun } from '@fortawesome/fontawesome-free-regular';

@Injectable()
export class FontawesomeService {

  constructor() {
    fontawesome.library.add(
      faMoon,
      faSun,
      faSolidMoon,
      faSolidSun,
      faRocket,
      faServer
    );
  }

}
