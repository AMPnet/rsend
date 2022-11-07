import {providers} from 'ethers'
import ReconnectingWebSocket from 'reconnecting-websocket'

export enum ChainID {
  ETHEREUM_MAINNET = 1,
  MUMBAI_TESTNET = 80001, // Polygon Testnet
  MATIC_MAINNET = 137, // Polygon
  BSC = 56,
  XDAI = 100,
  FANTOM = 250,
  MOONRIVER = 1285,
  AVAX = 43114,
  AURORA_MAINNET = 1313161554
}

export interface Network {
  chainID: ChainID,
  name: string,
  shortName: string,
  nativeCurrency: {
    name: string,
    symbol: string;
    logo?: string;
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

export const EthereumNetwork: Network = {
  chainID: ChainID.ETHEREUM_MAINNET,
  name: 'Ethereum',
  shortName: 'ethereum',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
  },
  maxGasPrice: 200,
  rpcURLs: ['https://nd-780-582-313.p2pify.com/c0578ff688865466414976fe0868c558'],
  wssRpcURLs: [
    'wss://eth-mainnet.g.alchemy.com/v2/cSg25tC3ZafhFoo1_onHhyAI_Y8h4UEF',
  ],
  explorerURLs: ['https://etherscan.io/'],
  appConfig: {},
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
    logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
  },
  maxGasPrice: 1500,
  rpcURLs: [
    'https://polygon-rpc.com',
  ],
  wssRpcURLs: [
    'wss://ws-matic-mainnet.chainstacklabs.com',
    'wss://ws-nd-159-625-174.p2pify.com/db285116493a92ba6e91417f43a942bd',
    'wss://polygon-mainnet.g.alchemy.com/v2/A8PZz3PJWwX_yQAW5q0JjqaNPPshI9Qg',
  ],
  explorerURLs: ['https://polygonscan.com/'],
  appConfig: {},
}

export const BscNetwork: Network = {
  chainID: ChainID.BSC,
  name: 'BSC',
  shortName: 'bsc',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850',
  },
  maxGasPrice: 100,
  rpcURLs: ['https://bsc-dataseed.binance.org/'],
  wssRpcURLs: [
    'wss://ws-nd-619-004-777.p2pify.com/22b20ec4d0ae4cd45c24ab0b1117694b',
  ],
  explorerURLs: ['https://bscscan.com/'],
  appConfig: {},
}

export const XdaiNetwork: Network = {
  chainID: ChainID.XDAI,
  name: 'xDai/Gnosis',
  shortName: 'gnosis',
  nativeCurrency: {
    name: 'XDAI',
    symbol: 'XDAI',
    logo: 'https://assets.coingecko.com/coins/images/11062/small/Identity-Primary-DarkBG.png?1638372986',
  },
  maxGasPrice: 200,
  rpcURLs: ['https://rpc.xdaichain.com'],
  wssRpcURLs: [
    'wss://rpc.gnosischain.com/wss',
  ],
  explorerURLs: ['https://blockscout.com/xdai/mainnet'],
  appConfig: {},
}

export const FantomNetwork: Network = {
  chainID: ChainID.FANTOM,
  name: 'Fantom',
  shortName: 'fantom',
  nativeCurrency: {
    name: 'FTM',
    symbol: 'FTM',
    logo: 'https://assets.coingecko.com/coins/images/4001/small/Fantom.png?1558015016',
  },
  maxGasPrice: 100,
  rpcURLs: ['https://rpc.ftm.tools'],
  wssRpcURLs: [
    'wss://fantom-mainnet.public.blastapi.io',
  ],
  explorerURLs: ['https://ftmscan.com/'],
  appConfig: {},
}

export const MoonriverNetwork: Network = {
  chainID: ChainID.MOONRIVER,
  name: 'Moonriver',
  shortName: 'moonriver',
  nativeCurrency: {
    name: 'MOVR',
    symbol: 'MOVR',
    logo: 'https://assets.coingecko.com/coins/images/17984/small/9285.png?1630028620',
  },
    maxGasPrice: 100,
  rpcURLs: ['https://rpc.moonriver.moonbeam.network'],
  wssRpcURLs: [
    'wss://moonriver.public.blastapi.io',
  ],
  explorerURLs: ['https://moonriver.moonscan.io/'],
  appConfig: {},
}

export const AvaxNetwork: Network = {
  chainID: ChainID.AVAX,
  name: 'Avalanche',
  shortName: 'avalanche',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    logo: 'https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818',
  },
  maxGasPrice: 10,
  rpcURLs: ['https://nd-127-945-798.p2pify.com/274126562966c3ab8b53d777155be7f7/ext/bc/C/rpc'],
  wssRpcURLs: [
    'wss://ws-nd-127-945-798.p2pify.com/274126562966c3ab8b53d777155be7f7/ext/bc/C/ws',
  ],
  explorerURLs: ['https://snowtrace.io/'],
  appConfig: {},
}

export const AuroraNetwork: Network = {
  chainID: ChainID.AURORA_MAINNET,
  name: 'Aurora',
  shortName: 'aurora',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
  },
  maxGasPrice: 20,
  rpcURLs: ['https://mainnet.aurora.dev'],
  wssRpcURLs: ['wss://mainnet.aurora.dev'],
  explorerURLs: ['https://aurorascan.dev/'],
  appConfig: {},
}

export const Networks: { [key in ChainID]: Network } = {
  [ChainID.ETHEREUM_MAINNET]: EthereumNetwork,
  [ChainID.MUMBAI_TESTNET]: MumbaiNetwork,
  [ChainID.MATIC_MAINNET]: MaticNetwork,
  [ChainID.AURORA_MAINNET]: AuroraNetwork,
  [ChainID.BSC]: BscNetwork,
  [ChainID.XDAI]: XdaiNetwork,
  [ChainID.FANTOM]: FantomNetwork,
  [ChainID.MOONRIVER]: MoonriverNetwork,
  [ChainID.AVAX]: AvaxNetwork
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
