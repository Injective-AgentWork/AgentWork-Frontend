import { AgentDetail } from "@/components/AgentDetail";
import { AgentOverview } from "@/components/AgentOverview";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/context/WalletContextProvider";
import { cn } from "@/lib/utils";
import type { Agent } from "@/types";
import { useState } from "react";
import badge1 from "@/assets/badge-1.png";
import badge2 from "@/assets/badge-2.png";
const badges = [
	{
		name: "Badge 1",
		image: badge1,
	},
	{
		name: "Badge 2",
		image: badge2,
	},
];

export const MyAgentPage = () => {
	const agents = localStorage.getItem("agents")
		? (JSON.parse(localStorage.getItem("agents")!) as Agent[])
		: [];
	const { injectiveAddress } = useWalletStore();
	const [activeAgent, setActiveAgent] = useState<number>(0);

	return (
		<section className="flex max-w-[1000px] pb-4 border border-[#0039C8] rounded-lg overflow-hidden">
			<div className="flex-1 shrink-0">
				{agents
					.filter((agent) => agent.creator === injectiveAddress)
					.map((agent, i) => (
						<div
							key={agent.name}
							onClick={() => setActiveAgent(i)}
							className={cn(
								"flex flex-col font-['Rowdies'] p-4 gap-8",
								activeAgent === i && "bg-[#0039C8] text-white",
							)}
						>
							<AgentOverview
								agent={agent}
								active={activeAgent === i}
								key={agent.name}
							/>
						</div>
					))}
			</div>
			<div className="flex-1 shrink-0 px-4">
				<div className="flex flex-col gap-4 py-6 font-['Rowdies'] text-wrap px-4">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl">Badges</h2>
						<div className="flex gap-4 overflow-scroll">
							{badges.map((badge) => (
								<img
									key={badge.name}
									src={badge.image}
									alt={badge.name}
									className="rounded-full w-24 h-24"
								/>
							))}
						</div>
					</div>
					<div className="text-black">
						<p>{agents[activeAgent]?.description}</p>
					</div>
					<div className="flex justify-between items-end">
						<div>
							<p className="text-[#0039C8] text-xl">Team</p>
							<p className="text-black">BiUwU</p>
						</div>
						<Button className="rounded-full px-8 bg-[#AFFF01] text-black hover:bg-[#AFFF01] text-xl">
							Join a team
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
