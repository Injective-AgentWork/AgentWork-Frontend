import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Job } from "@/types";
import { HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const JobDetailPage = () => {
	const [messages, setMessages] = useState<{ role: string; content: string }[]>(
		[],
	);
	const [activeMilestone, setActiveMilestone] = useState<number>(0);
	const id = useParams<{ id: string }>().id;
	const job: Job = JSON.parse(localStorage.getItem("jobs") || "[]").find(
		(j: Job) => j.id === Number.parseInt(id!),
	);

	useEffect(() => {
		const fetchJob = async () => {
			const res = await fetch("http://localhost:8000/invoke", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
					request: job.description,
				}),
			});
			const data = await res.json();
			setMessages(data.output[1].messages);
		};
		fetchJob();
	}, [id, job.description]);

	if (!job) {
		return (
			<h1 className="text-center text-4xl text-[#0038C9] font-['Rowdies']">
				No job found
			</h1>
		);
	}

	return (
		<section
			className="px-40 font-['Rowdies'] flex flex-col items-center"
			style={{
				height: "calc(100vh - 100px)",
			}}
		>
			<h1 className="text-4xl text-[#0038C9] font-['Rowdies'] mb-4">
				Detail Job
			</h1>
			<div className="flex gap-10 mb-10">
				{job.milestones.map((milestone, index: number) => {
					return (
						<div
							key={milestone.name}
							className="flex flex-col gap-2 items-center"
						>
							<div
								className={cn(
									"w-10 h-10 rounded-full bg-[#AFFF01] text-black flex items-center justify-center",
									{
										"bg-[#0039C8] text-white": activeMilestone === index,
									},
								)}
							>
								{index}
							</div>
							<p>{milestone.name}</p>
						</div>
					);
				})}
			</div>
			<div className="flex max-w-[1000px] text-white min-h-1/2 max-h-1/2 border border-[#0039C8] rounded-lg overflow-hidden">
				<div className="flex-1 min-h-full max-h-full shrink-0 bg-[#0039C8] p-4 flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<h3 className="text-2xl">{job.title}</h3>
						<p>
							{job.time.days} days {job.time.hours} hours left
						</p>
					</div>
					<div className="flex gap-10">
						<p>Details</p>
						<p>Contract</p>
						<p>Team</p>
					</div>
					<p>{job.description}</p>
					<p className="flex gap-2">
						<HandCoins stroke="#AFFF01" />${job.price}
					</p>
					<div className="flex gap-2">
						{job.skill.split(" ").map((s) => {
							return (
								<Tag
									tag={s}
									key={s}
									className="text-white border-[#AFFF01] xl:text-lg"
								/>
							);
						})}
					</div>
					<div className="flex gap-12 mx-auto mt-auto">
						<Button className="border border-[#AFFF01] rounded-full px-8 text-[#AFFF01] bg-transparent hover:bg-transparent">
							Disappoint
						</Button>
						<Button className="rounded-full px-8 bg-[#AFFF01] text-black">
							Approve
						</Button>
					</div>
				</div>
				<div className="shrink-0 flex-1 p-4 max-h-full overflow-scroll text-black">
					<h3
						className="text-[#0038C9] mb-4 sticky top-0 py-2 rounded-full px-4"
						style={{
							backdropFilter: "blur(10px)",
						}}
					>
						Agents
					</h3>
					<div className="w-full">
						<div className="flex gap-2 items-center mb-2">
							<img
								src="https://placehold.co/100x100"
								alt="agent"
								className="w-10 h-10 rounded-full"
							/>
							<p>Hello, our agent team is working on your job!</p>
						</div>
						<div className="flex flex-col gap-2 max-w-full text-wrap overflow-hidden">
							{messages.map((message) => {
								return (
									<div
										key={message.content}
										className="flex gap-2 items-center"
									>
										<img
											src="https://placehold.co/100x100"
											alt="agent"
											className="w-10 h-10 rounded-full"
										/>
										<p
											key={message.content}
											className="whitespace-wrap max-w-full"
										>
											{message.content}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
