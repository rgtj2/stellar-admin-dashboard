import { HorizonApiService } from './../../../services/horizon-api/horizon-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-glimpse',
  templateUrl: './account-glimpse.component.html',
  styleUrls: ['./account-glimpse.component.css']
})
export class AccountGlimpseComponent implements OnInit {
  @Input() public publicKey: string;
  public accountData: any;

  constructor(private horizonApi: HorizonApiService) { }

  ngOnInit() {
    this.getAccount();
  }

  private getAccount(): void {
    this.horizonApi.get(`/accounts/${this.publicKey}`).subscribe((response) => {
      this.accountData = response;
    });
  }


}
