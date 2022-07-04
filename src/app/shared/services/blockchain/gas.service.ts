import {Injectable} from '@angular/core'
import {Observable, ObservableInput, ObservedValueOf, of, switchMap} from 'rxjs'
import {catchError, map} from 'rxjs/operators'
import {PreferenceQuery} from '../../../preference/state/preference.query'
import {Overrides} from 'ethers'
import {HttpClient} from '@angular/common/http'
import {SessionQuery} from '../../../session/state/session.query'
import {parseUnits} from 'ethers/lib/utils'
import {SignerService} from '../signer.service'
import {ChainID} from '../../networks'

@Injectable({
  providedIn: 'root',
})
export class GasService {
  constructor(private preferenceQuery: PreferenceQuery,
              private sessionQuery: SessionQuery,
              private signerService: SignerService,
              private http: HttpClient) {
  }

  get overrides(): Observable<Partial<Overrides>> {
    return this.gasPriceOracleOverrides
  }

  withOverrides<T extends ObservableInput<any>>(fn: (overrides: Overrides) => T): Observable<ObservedValueOf<T>> {
    return this.overrides.pipe(
      switchMap(o => fn(o)),
    )
  }

  private get isEip1559Supported(): Observable<boolean> {
    return this.signerService.ensureNetwork.pipe(
      switchMap(signer => signer.provider.getFeeData()),
      map(data => (data.maxFeePerGas != null || data.maxPriorityFeePerGas != null)),
    )
  }

  private get gasPriceOracleOverrides(): Observable<Partial<Overrides>> {
    switch (this.preferenceQuery.network.chainID) {
      case ChainID.MATIC_MAINNET:
        return this.maticGasStation('https://gasstation-mainnet.matic.network/v2')
      case ChainID.MUMBAI_TESTNET:
        return this.maticGasStation('https://gasstation-mumbai.matic.today/v2')
      default:
        return of({})
    }
  }

  private maticGasStation(endpoint: string): Observable<Partial<Overrides>> {
    return this.http.get<GasStationRes>(endpoint).pipe(
      map(res => {
        const fastRes = res.fast
        return {
          maxFeePerGas: parseUnits(fastRes.maxFee.toFixed(9).toString(), 'gwei'),
          maxPriorityFeePerGas: parseUnits(fastRes.maxPriorityFee.toFixed(9).toString(), 'gwei'),
        } as Partial<Overrides>
      }),
      catchError(() => of({})),
    )
  }
}

interface GasStationRes {
  safeLow: {
    maxPriorityFee: number
    maxFee: number
  }
  standard: {
    maxPriorityFee: number
    maxFee: number
  }
  fast: {
    maxPriorityFee: number
    maxFee: number
  }
  estimatedBaseFee: number
  blockTime: number
  blockNumber: number
}
