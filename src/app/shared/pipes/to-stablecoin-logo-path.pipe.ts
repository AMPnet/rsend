import {Injectable, Pipe, PipeTransform} from '@angular/core'
import {PreferenceQuery} from "../../preference/state/preference.query"

@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'toStablecoinLogoPath',
})
export class ToStablecoinLogoPathPipe implements PipeTransform {
  constructor(private preferenceQuery: PreferenceQuery) {}

  transform(value: any): any {
    switch (value) {
      case 'USDC':
        return '/assets/usdc.png'
      case this.preferenceQuery.network.nativeCurrency.symbol:
        return this.preferenceQuery.network.nativeCurrency.logo
      default:
        return '/assets/coin_128x128.png'
    }
  }
}
