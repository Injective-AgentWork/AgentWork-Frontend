import { AgentDetail } from "@/components/AgentDetail";
import { AgentOverview } from "@/components/AgentOverview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWalletStore } from "@/context/WalletContextProvider";
import { StakeJobContract } from "@/services/contracts";
import { msgBroadcastClient } from "@/services/wallet";
import type { Agent, Job, Milestone } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface CreateJobFormInput {
	title: string;
	description: string;
	strength: string;
	inputType: string;
	outputType: string;
	api: string;
	price: number;
	time: {
		days: number;
		hours: number;
	};
	category: string;
	skill: string;
	milestones: Milestone[];
}

export const CreateJobPage = () => {
	const { register, handleSubmit } = useForm<CreateJobFormInput>();
	const params = useLocation().search.split("?")[1]?.split("=")[1];
	const [milestones, setMilestones] = useState<Milestone[]>([]);
	const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
	const [currentAgent, setCurrentAgent] = useState<number>(
		Number.parseInt(params ?? "0"),
	);
	const { injectiveAddress } = useWalletStore();
	const navigate = useNavigate();
	const onSubmit = async (data: CreateJobFormInput) => {
		const msg = StakeJobContract(injectiveAddress, 1, 5);
		await msgBroadcastClient.broadcast({
			msgs: msg!,
			injectiveAddress: injectiveAddress,
		});
		const jobs = localStorage.getItem("jobs")
			? JSON.parse(localStorage.getItem("jobs")!)
			: [];

		const job: Job = {
			...data,
			id: jobs.length + 1,
			creator: injectiveAddress,
			status: "active",
			agents: selectedAgents.map((agent) => agents[Number.parseInt(agent)]),
		};

		localStorage.setItem("jobs", JSON.stringify([...jobs, job]));
		navigate("/profile/job");
	};

	const selectAgent = (index: number) => {
		if (selectedAgents.includes(index.toString())) {
			setSelectedAgents(
				selectedAgents.filter((agent) => agent !== index.toString()),
			);
			return;
		}
		setSelectedAgents([...selectedAgents, index.toString()]);
	};

	const agents = localStorage.getItem("agents")
		? JSON.parse(localStorage.getItem("agents")!)
		: [];

	return (
		<div className="flex flex-col items-center px-20 font-['Rowdies'] font-light mb-10">
			<h1 className="text-5xl text-[#0039C8] mb-2">Post a new job</h1>
			<p className="text-2xl">
				We'll guide you to create the perfect brief. The more detail the better.
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center mt-10 w-[800px] gap-4 text-[#0039C8] text-xl"
			>
				<div className="flex flex-col gap-2 w-full">
					<label>Project name</label>
					<Input {...register("title")} placeholder="Project name" />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label>Project description</label>
					<Input
						{...register("description")}
						placeholder="Project description"
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label>Duration</label>
					<div className="flex gap-4 text-black/50">
						<div className="flex gap-2 items-end">
							<Input
								{...register("time.days")}
								className="border-t-0 border-l-0 border-r-0 rounded-none border-b w-[40px]"
								placeholder=""
							/>
							<span className="text-md">Days</span>
						</div>
						<div className="flex gap-2 items-end">
							<Input
								{...register("time.hours")}
								className="border-t-0 border-l-0 border-r-0 rounded-none border-b w-[40px]"
								placeholder=""
							/>
							<span className="text-md">Hours</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label>Budget</label>
					<Input {...register("price")} placeholder="$0.0" />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label>Milestone</label>
					{milestones.map((_, index) => (
						<div key={index} className="flex gap-4 items-center">
							<div className="flex h-[40px] min-w-[40px] rounded-full bg-[#AFFF01] justify-center items-center">
								{index + 1}
							</div>
							<Input
								{...register(`milestones.${index}.name`)}
								placeholder="Milestone name"
							/>
							<div className="flex gap-4 text-black/50">
								<div className="flex gap-2 items-end">
									<Input
										{...register(`milestones.${index}.time.days`)}
										className="border-t-0 border-l-0 border-r-0 rounded-none border-b w-[40px]"
										placeholder=""
									/>
									<span className="text-md">Days</span>
								</div>
								<div className="flex gap-2 items-end">
									<Input
										{...register(`milestones.${index}.time.hours`)}
										className="border-t-0 border-l-0 border-r-0 rounded-none border-b w-[40px]"
										placeholder=""
									/>
									<span className="text-md">Hours</span>
								</div>
							</div>
							<Input
								{...register(`milestones.${index}.distribution`)}
								placeholder="Distribution"
							/>
							<Button
								type="button"
								onClick={() =>
									setMilestones(milestones.filter((_, i) => i !== index))
								}
								className="w-fit"
							>
								<Minus className="w-6 h-6" />
							</Button>
						</div>
					))}
					<Button
						type="button"
						onClick={() =>
							setMilestones([
								...milestones,
								{ name: "", time: { days: 0, hours: 0 }, distribution: 0 },
							])
						}
						className="w-fit"
					>
						<Plus className="w-6 h-6" />
					</Button>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label>Categories</label>
					<Input {...register("category")} placeholder="Categories" />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label>Skills require</label>
					<Input {...register("skill")} placeholder="Skills require" />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<p>Agent</p>
					<section className="flex border-1 border-[#0039C8] rounded-xl mx-auto min-w-full min-h-[800px] max-h-[800px] overflow-hidden">
						<div className="flex-1 overflow-scroll">
							{agents.map((agent: Agent, index: number) => (
								<div
									onClick={() => setCurrentAgent(index)}
									key={index}
									className="cursor-pointer"
								>
									<AgentOverview
										agent={agent}
										active={index === currentAgent}
									/>
								</div>
							))}
						</div>
						<div className="flex-1 border-l border-[#0039C8]">
							<AgentDetail
								agent={agents[currentAgent]}
								onClick={selectAgent}
								index={currentAgent}
								invited={selectedAgents.includes(currentAgent.toString())}
							/>
						</div>
					</section>
				</div>
				<Button className="ml-auto bg-[#AFFF01] text-black rounded-full hover:bg-[#AFFF01] text-lg">
					Post my job
				</Button>
			</form>
		</div>
	);
};
