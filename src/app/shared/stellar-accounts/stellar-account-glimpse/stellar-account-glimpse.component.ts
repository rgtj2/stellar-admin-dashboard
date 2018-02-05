import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stellar-account-glimpse',
  templateUrl: './stellar-account-glimpse.component.html',
  styleUrls: ['./stellar-account-glimpse.component.css']
})
export class StellarAccountGlimpseComponent implements OnInit {
  @Input() public accountData: any;

  ngOnInit() {
    console.log(this);
  }
}
