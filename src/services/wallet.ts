import { MsgBroadcaster, WalletStrategy } from "@injectivelabs/wallet-ts";
import { Web3Exception } from "@injectivelabs/exceptions";
import {
  CHAIN_ID,
  NETWORK,
} from "./constants";
import { ChainGrpcBankApi } from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

export const walletStrategy = new WalletStrategy({
  chainId: CHAIN_ID,
});

export const getAddresses = async (): Promise<string[]> => {
  const addresses = await walletStrategy.getAddresses();

  if (addresses.length === 0) {
    throw new Web3Exception(
      new Error("There are no addresses linked in this wallet.")
    );
  }

  return addresses;
};

const endpoints = getNetworkEndpoints(Network.Testnet);
export const chainGrpcBankApi = new ChainGrpcBankApi(endpoints.grpc)

export const msgBroadcastClient = new MsgBroadcaster({
  walletStrategy,
  network: NETWORK,
});
