import {Injectable, Pipe, PipeTransform} from '@angular/core'
import {Observable, of} from 'rxjs'
import {Erc20Service, ERC20TokenData} from '../services/blockchain/erc20.service'

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'assetData',
})
export class AssetDataPipe implements PipeTransform {
  constructor(private erc20Service: Erc20Service) {
  }

  transform(value: any, opt?: 'tokenOnly'): Observable<ERC20TokenData> {
    if(value) {
      return this.erc20Service.getData(value)
    } else {
      return of(
        {
          address: "0x0",
          name: "Native Coin",
          decimals: 18,
          symbol: "Native"
        }
      )
    }
  }
}
