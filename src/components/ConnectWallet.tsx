import { useWalletStore } from "@/context/WalletContextProvider";
import { chainGrpcBankApi } from "@/services/wallet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

const ConnectWallet = (props: Props) => {
  const [balance, setBalance] = useState("0");
  const { connectWallet, injectiveAddress } = useWalletStore();
  const btnText = injectiveAddress
    ? `${injectiveAddress.slice(0, 5)}...${injectiveAddress.slice(-3)}`
    : "Connect Wallet";

  useEffect(() => {
    const fetchBalance = async () => {
      if (injectiveAddress) {
        const balance = await chainGrpcBankApi.fetchBalance({
          accountAddress: injectiveAddress,
          denom: "inj",
        })
        setBalance(Number.parseInt(balance.amount) / 1000000000 + " INJ")
      }
    }
    fetchBalance()
  }, [injectiveAddress])

  return injectiveAddress ? <Link to={'/profile'}>{balance}</Link> : <button
      onClick={connectWallet}
      className='btn'
    >
      {btnText}
    </button>
};

export default ConnectWallet;
