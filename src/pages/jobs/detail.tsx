import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { Job } from "@/types";
import { HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const JobDetailPage = () => {
	const [messages, setMessages] = useState<{ role: string; content: string }[]>(
		[],
	);
	const [activeMilestone, setActiveMilestone] = useState<number>(0);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const id = useParams<{ id: string }>().id;
	const job: Job = JSON.parse(localStorage.getItem("jobs") || "[]").find(
		(j: Job) => j.id === Number.parseInt(id!),
	);

	useEffect(() => {
		const fetchJob = async () => {
			const res = await fetch("http://140.245.117.232:8000/invoke", {
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
			setIsCompleted(true);
		};

		if (job.status === "active") {
			fetchJob();
		}
	}, [id, job]);

	useEffect(() => {
		if (job.status === "active") {
			const interval = setInterval(() => {
				setActiveMilestone((prev) => {
					if (prev === job.milestones.length - 1) {
						return prev;
					}
					return prev + 1;
				});
			}, 5000);

			return () => clearInterval(interval);
		}
		setActiveMilestone(job.milestones.length - 1);
		setIsCompleted(true);
	}, [job.milestones, job.status]);

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
			<div className="flex min-w-[1000px] max-w-[1000px] text-white min-h-1/2 max-h-1/2 border border-[#0039C8] rounded-lg overflow-hidden">
				<div className="flex-1 min-h-full max-h-full shrink-0 bg-[#0039C8] p-4 flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<h3 className="text-2xl">{job.title}</h3>
						<p>
							{job.status === "active"
								? `${job.time.days} days ${job.time.hours} hours left`
								: job.status === "completed"
									? "Completed"
									: "Cancelled"}
						</p>
					</div>
					<Tabs defaultValue="details" className="w-full">
						<TabsList className="w-full bg-transparent text-white">
							<TabsTrigger value="details">Details</TabsTrigger>
							<TabsTrigger value="contract">Contract</TabsTrigger>
							<TabsTrigger value="team">Team</TabsTrigger>
							<TabsTrigger value="output">Output</TabsTrigger>
						</TabsList>
						<TabsContent value="details" className="flex flex-col gap-2">
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
						</TabsContent>
						<TabsContent value="contract"></TabsContent>
						<TabsContent value="team"></TabsContent>
						<TabsContent value="output">
							{isCompleted ? (
								<div className="flex flex-col gap-2">
									<h3>Here is your output</h3>
									<Link
										to="https://drive.google.com/drive/folders/1x7YxHL1bZEBbMoX03Yqir3chCGMca9oE?usp=sharing"
										className="text-[#AFFF01]"
										target="_blank"
									>
										Link
									</Link>
								</div>
							) : (
								<p>Please wait for the job to be completed</p>
							)}
						</TabsContent>
					</Tabs>
					<div className="flex gap-12 mx-auto mt-auto">
						{job.status === "active" && (
							<>
								<Button className="border border-[#AFFF01] rounded-full px-8 text-[#AFFF01] bg-transparent hover:bg-transparent">
									Disappoint
								</Button>
								<Button className="rounded-full px-8 bg-[#AFFF01] text-black hover:bg-[#AFFF01]">
									Approve
								</Button>
							</>
						)}
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
							<p>
								{job.status === "active"
									? "Hello, our agent team is working on your job!"
									: "Your job has been completed!"}
							</p>
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
