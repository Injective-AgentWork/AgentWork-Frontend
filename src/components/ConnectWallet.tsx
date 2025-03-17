import { useWalletStore } from "@/context/WalletContextProvider";
import { chainGrpcBankApi } from "@/services/wallet";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {};

const ConnectWallet = (props: Props) => {
	const [balance, setBalance] = useState("0");
	const { connectWallet, injectiveAddress } = useWalletStore();
	const [user, setUser] = useState<any>(null);
	const btnText = injectiveAddress
		? `${injectiveAddress.slice(0, 5)}...${injectiveAddress.slice(-3)}`
		: "Connect Wallet";
	const users = JSON.parse(localStorage.getItem("users") || "[]");

	useEffect(() => {
		const fetchBalance = async () => {
			if (injectiveAddress) {
				const balance = await chainGrpcBankApi.fetchBalance({
					accountAddress: injectiveAddress,
					denom: "inj",
				});
				setBalance(
					`${(Number.parseInt(balance.amount) / 1000000000000000000).toFixed(2)} INJ`,
				);
				setUser(users.find((user: any) => user.id === injectiveAddress));
			}
		};
		fetchBalance();
	}, [injectiveAddress]);

	return injectiveAddress ? (
		<Link to={"/profile"} className="flex items-center gap-2">
			<p>{balance}</p>
			<img
				src={user?.avatar}
				alt="Profile"
				className="w-12 h-12 rounded-full"
			/>
		</Link>
	) : (
		<Button
			onClick={connectWallet}
			className="px-4 py-2 bg-[#AFFF01] text-black rounded-lg hover:bg-[#AFFF01]/80 cursor-pointer"
			type="button"
		>
			{btnText}
		</Button>
	);
};

export default ConnectWallet;
