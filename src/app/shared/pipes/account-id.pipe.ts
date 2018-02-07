import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountId'
})
export class AccountIdPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return `${value.slice(0, 7)}...${value.slice(-7)}`;
  }

}
