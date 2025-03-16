import { Network } from "@injectivelabs/networks";
import { ChainId, EthereumChainId } from "@injectivelabs/ts-types";

// export const isProduction = process.env.NODE_ENV === "production";

// export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === "development";
// export const IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";

// const env = {
//   NEXT_ALCHEMY_GOERLI_KEY: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_KEY,
//   NEXT_NETWORK: process.env.NEXT_NETWORK,
//   NEXT_ETHEREUM_CHAIN_ID: process.env.NEXT_ETHEREUM_CHAIN_ID,
//   NEXT_CHAIN_ID: process.env.NEXT_CHAIN_ID,
// };

// export const ALCHEMY_GOERLI_KEY = env.NEXT_ALCHEMY_GOERLI_KEY;

// export const alchemyRpcEndpoint = `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
// export const alchemyWsRpcEndpoint = `wss://eth-goerli.ws.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`;
export const CHAIN_ID = ChainId.Testnet as ChainId;

export const NETWORK: Network = Network.Testnet;

export const IS_TESTNET: boolean = [
	Network.Testnet,
	Network.TestnetK8s,
].includes(NETWORK);

export const AGENT_WORK_TOKEN_CONTRACT_ADDRESS =
	"inj1wp6x43895dewtfugkv08tvu7ajmvthzvel5mwn";

export const AGENT_WORK_STAKE_CONTRACT_ADDRESS =
	"inj12xjw4pkv2trn5kah8lmu7a3ygprpu5q002egwc";
