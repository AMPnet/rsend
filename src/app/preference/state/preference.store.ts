import {Injectable} from '@angular/core'
import {Store, StoreConfig} from '@datorama/akita'
import {ChainID, MumbaiNetwork} from '../../shared/networks'
import {environment} from '../../../environments/environment'

export interface PreferenceState {
  address: string;
  authProvider: AuthProvider | '';
  JWTAccessToken: string;
  JWTRefreshToken: string;
  chainID: ChainID;
}

export function createInitialState(): PreferenceState {
  return {
    address: '',
    authProvider: '',
    JWTAccessToken: '',
    JWTRefreshToken: '',
    chainID: environment.fixed.chainID || MumbaiNetwork.chainID,
  }
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'preference'})
export class PreferenceStore extends Store<PreferenceState> {
  constructor() {
    super(createInitialState())
  }
}

export enum AuthProvider {
  METAMASK = 'METAMASK',
  WALLET_CONNECT = 'WALLET_CONNECT',
}
