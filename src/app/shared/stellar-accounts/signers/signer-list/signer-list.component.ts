import { AppStateService } from './../../../../services/app-state/app-state.service';
import { Component, OnInit, Input } from '@angular/core';
import { StellarAccountSigner } from '../../../models/stellar-account/stellar-account-signer';
import { AccountFileAccountMasterConfig } from '../../../../services/auth/account-file/account-file';

interface AccountSignerViewModel {
  signer: StellarAccountSigner;
  isUser: boolean;
}

@Component({
  selector: 'app-signer-list',
  templateUrl: './signer-list.component.html',
  styleUrls: ['./signer-list.component.css']
})
export class SignerListComponent implements OnInit {
  public signerList: AccountSignerViewModel[];
  @Input() private signers: StellarAccountSigner[];
  @Input() private userAccountFile: AccountFileAccountMasterConfig | null;

  constructor(private appState: AppStateService) { }

  ngOnInit() {
    this.signerList = this.signers.map(s => {
      return {
        signer: s,
        isUser: this.signerIsUserAccount(s)
      };
    });
  }

  private signerIsUserAccount(s: StellarAccountSigner) {
    return this.userAccountFile && this.userAccountFile.stellarAccountConfig.publicKey === s.publicKey;
  }
}
