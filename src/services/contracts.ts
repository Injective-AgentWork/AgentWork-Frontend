import {
	MsgExecuteContract,
	MsgExecuteContractCompat,
} from "@injectivelabs/sdk-ts";
import {
	AGENT_WORK_STAKE_CONTRACT_ADDRESS,
	AGENT_WORK_TOKEN_CONTRACT_ADDRESS,
} from "./constants";

export const StakeJobContract = (addr: string, id: number, amount: number) => {
	try {
		console.log("StakeJobContract", addr, id, amount);
		const msg = MsgExecuteContract.fromJSON({
			sender: addr,
			contractAddress: AGENT_WORK_STAKE_CONTRACT_ADDRESS,
			msg: {
				user_stake: {
					amount: amount.toString(),
					job_id: id.toString(),
				},
			},
		});

		return msg;
	} catch (e) {
		console.log(e);
	}
};

export const ApproveJobContract = (addr: string, id: number) => {
	try {
		console.log("ApproveJobContract", addr, id);
		const msg = MsgExecuteContract.fromJSON({
			sender: addr,
			contractAddress: AGENT_WORK_STAKE_CONTRACT_ADDRESS,
			msg: {
				distribute_rewards_by_agent: {
					job_id: id.toString(),
				},
			},
		});

		return msg;
	} catch (e) {
		console.log(e);
	}
};
