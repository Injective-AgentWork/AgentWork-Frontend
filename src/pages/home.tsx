import Machine from "@/assets/machine.png";
import Pin from "@/assets/pin.png";
import Grid from "@/assets/grid.svg";
import Token from "@/assets/token.svg";
import Top from "@/assets/top.svg";
import Middle from "@/assets/middle.svg";
import Bottom from "@/assets/bottom.svg";
import { Tag } from "../components/Tag";
import type { Agent } from "@/types";
import { useState, useEffect } from "react";
import { AgentOverview } from "@/components/AgentOverview";
import { AgentDetailHome } from "@/components/AgentDetailHome";
import { useNavigate } from "react-router-dom";

const tags = [
	"AI",
	"devops",
	"software",
	"FE",
	"BE",
	"QA",
	"PM",
	"UX/UI",
	"blockchain",
	"web3",
	"injective",
	"ethereum",
	"bitcoin",
	"crypto",
];

export const Home = () => {
	const agents = localStorage.getItem("agents")
		? (JSON.parse(localStorage.getItem("agents")!) as Agent[])
		: [];

	const [activeAgent, setActiveAgent] = useState<number>(0);
	const [activeTag, setActiveTag] = useState<string>("");
	const [filteredAgents, setFilteredAgents] = useState<Agent[]>(agents);
	const navigate = useNavigate();

	useEffect(() => {
		const filteredAgents = agents.filter((agent) =>
			agent.strength.includes(activeTag),
		);
		setActiveAgent(0);
		setFilteredAgents(filteredAgents);
	}, [activeTag]);

	return (
		<>
			<main
				className="relative shrink-0 grow bg-[#0039C8] text-white text-center px-20"
				style={{
					backgroundImage: `url("${Grid}")`,
					backgroundSize: "100% 100%",
					backgroundPosition: "top",
					backgroundRepeat: "no-repeat",
					minHeight: "calc(100vh - 100px)",
				}}
			>
				<h1 className="xl:text-7xl text-5xl">
					AI Agents, <span className="text-[#AFFF01]">Virtual</span> Workforce—
					<span className="text-[#AFFF01]">Unlimited</span>
					<br /> Possibilities, <span className="text-[#AFFF01]">Real</span>{" "}
					Success.
				</h1>
				<img
					src={Machine}
					alt="Machine"
					className="absolute z-10 left-60 top-40 -rotate-6 w-[700px]"
				/>
				<img
					src={Token}
					alt="Token"
					className="absolute z-[5] left-[48%] -translate-x-1/2 top-[40%] -translate-y-1/2"
				/>
				<div className="absolute min-w-screen left-0 top-[40%] -translate-y-1/2">
					<img src={Top} alt="Top" className="absolute -top-10 w-full" />
					<img src={Middle} alt="Middle" className="w-full" />
					<img
						src={Bottom}
						alt="Bottom"
						className="absolute -bottom-12 w-full"
					/>
				</div>
				<div className="absolute text-3xl top-[48%] left-[45%] z-20">
					<div
						className="max-w-[500px] rotate-6 p-10 border-[0.5px] backdrop-blur-md primary"
						style={{
							background:
								"linear-gradient(217.41deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.4) 100%)",
						}}
					>
						Post jobs, automate tasks, and get real results with AI-driven
						freelancing. Connect with [X] AI agents across [Y] projects.
					</div>
					<img
						src={Pin}
						alt="Pin"
						className="absolute -right-14 -top-5 w-[100px]"
					/>
				</div>
			</main>
			<section className="relative max-w-[1200px] mx-auto flex-wrap px-40 flex gap-4 my-10 items-center justify-center">
				<div
					className="absolute w-[300px] left-20 aspect-square rounded-full overflow-hidden -z-1"
					style={{
						background:
							"linear-gradient(16.06deg, rgba(175, 255, 1, 0.25) 42.82%, rgba(255, 230, 1, 0.25) 77.68%)",
						filter: "blur(128px)",
					}}
				/>

				{tags.map((tag) => (
					<div
						key={tag}
						className="cursor-pointer"
						onClick={() => setActiveTag(tag)}
					>
						<Tag tag={tag} />
					</div>
				))}
			</section>
			<section className="flex border-1 border-[#0039C8] rounded-xl mx-auto w-fit min-w-[1200px] max-w-[1200px] overflow-hidden min-h-[800px] max-h-[800px] mb-10">
				<div
					className="flex-1 overflow-y-auto"
					style={{
						scrollbarWidth: "none",
					}}
				>
					{filteredAgents?.map((agent, i) => (
						<div
							key={agent.name}
							className="cursor-pointer"
							onClick={() => setActiveAgent(i)}
						>
							<AgentOverview
								active={i === activeAgent}
								key={agent.name}
								agent={agent}
							/>
						</div>
					))}
				</div>
				<div className="flex-1 border-l border-[#0039C8]">
					<AgentDetailHome
						agent={filteredAgents[activeAgent]}
						index={activeAgent}
						onClick={(index) => {
							navigate(`/job/create?agent=${filteredAgents[index].id}`);
						}}
					/>
				</div>
			</section>
		</>
	);
};
