import {providers} from 'ethers'
import ReconnectingWebSocket from 'reconnecting-websocket'

export enum ChainID {
  MUMBAI_TESTNET = 80001, // Polygon Testnet
  MATIC_MAINNET = 137, // Polygon
  AURORA_MAINNET = 1313161554
}

export interface Network {
  chainID: ChainID,
  name: string,
  shortName: string,
  nativeCurrency: {
    name: string,
    symbol: string;
  },
  maxGasPrice: number,
  rpcURLs: string[],
  wssRpcURLs?: string[],
  explorerURLs: string[],
  appConfig: AppConfig,
}

interface AppConfig {
  // TODO: set app config
}

export const MumbaiNetwork: Network = {
  chainID: ChainID.MUMBAI_TESTNET,
  name: 'Mumbai (Polygon Testnet)',
  shortName: 'mumbai',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
  },
  maxGasPrice: 20,
  rpcURLs: ['https://rpc-mumbai.maticvigil.com'],
  wssRpcURLs: [
    'wss://ws-nd-673-584-255.p2pify.com/6eba79da2c02fb3ca5985cc6e95ebd53',
    'wss://polygon-mumbai.g.alchemy.com/v2/w8tKRA88CQYBQEwGO2HlKKHtSD_qHOoU',
    'wss://ws-matic-mumbai.chainstacklabs.com',
  ],
  explorerURLs: ['https://mumbai.polygonscan.com/'],
  appConfig: {},
}

export const MaticNetwork: Network = {
  chainID: ChainID.MATIC_MAINNET,
  name: 'Polygon',
  shortName: 'matic',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
  },
  maxGasPrice: 1500,
  rpcURLs: [
    'https://polygon-rpc.com',
  ],
  wssRpcURLs: [
    'wss://ws-nd-159-625-174.p2pify.com/db285116493a92ba6e91417f43a942bd',
    'wss://polygon-mainnet.g.alchemy.com/v2/A8PZz3PJWwX_yQAW5q0JjqaNPPshI9Qg',
    'wss://ws-matic-mainnet.chainstacklabs.com',
  ],
  explorerURLs: ['https://polygonscan.com/'],
  appConfig: {},
}

export const AuroraNetwork: Network = {
  chainID: ChainID.AURORA_MAINNET,
  name: 'Aurora',
  shortName: 'aurora',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
  },
  maxGasPrice: 20,
  rpcURLs: ['https://mainnet.aurora.dev'],
  wssRpcURLs: ['wss://mainnet.aurora.dev'],
  explorerURLs: ['https://aurorascan.dev/'],
  appConfig: {},
}

export const Networks: { [key in ChainID]: Network } = {
  [ChainID.MUMBAI_TESTNET]: MumbaiNetwork,
  [ChainID.MATIC_MAINNET]: MaticNetwork,
  [ChainID.AURORA_MAINNET]: AuroraNetwork,
}

const getEthersNetwork = (network: Network): providers.Network => ({
  name: network.shortName,
  chainId: network.chainID,
  _defaultProvider: (_providers: any) => {
    if (network.wssRpcURLs?.[0]) {
      return new providers.WebSocketProvider(new ReconnectingWebSocket(network.wssRpcURLs![0]) as any, network.chainID)
    }

    return new providers.StaticJsonRpcProvider(network.rpcURLs[0], network.chainID)
  },
})

export const EthersNetworks = Object.fromEntries(Object.entries(Networks)
  .map((entry) => [entry[0], getEthersNetwork(entry[1])]),
)
