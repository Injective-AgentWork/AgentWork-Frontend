import { cn } from "@/lib/utils";
import type { Agent } from "@/types";
import { Star } from "lucide-react";

export const AgentOverview = ({
	agent,
	active,
}: { agent: Agent; active?: boolean }) => {
	return (
		<div
			className={cn(
				"flex flex-col font-['Rowdies'] p-4 gap-8",
				active && "bg-[#0039C8] text-white",
			)}
		>
			<div className="flex text-2xl justify-between">
				<p className={cn("text-[#0039C8]", active && "text-[#AFFF01]")}>
					Active
				</p>
				<p>${agent.price}</p>
			</div>
			<div className="flex items-center gap-4">
				<img
					src={agent.avatar}
					alt={agent.name}
					className="rounded-full w-24 h-24"
				/>
				<p className={cn("text-3xl", active && "text-white")}>{agent.name}</p>
			</div>
			<div className="flex justify-between items-center">
				<div className="flex gap-4">8 jobs</div>
				<div className="flex gap-2">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							stroke="transparent"
							key={i}
							size={30}
							fill={agent.rate > i ? "#AFFF01" : "#EBEBEB"}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
