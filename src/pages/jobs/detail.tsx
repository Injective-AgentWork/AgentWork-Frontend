import { Tag } from "@/components/Tag";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Job, User } from "@/types";
import { HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useWalletStore } from "@/context/WalletContextProvider";
import { ApproveJobContract } from "@/services/contracts";
import { msgBroadcastClient } from "@/services/wallet";

export const JobDetailPage = () => {
	const [messages, setMessages] = useState<{ role: string; content: string }[]>(
		[],
	);
	const { injectiveAddress } = useWalletStore();
	const [activeMilestone, setActiveMilestone] = useState<number>(0);
	const [isCompleted, setIsCompleted] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const id = useParams<{ id: string }>().id;
	const job: Job = JSON.parse(localStorage.getItem("jobs") || "[]").find(
		(j: Job) => j.id === Number.parseInt(id!),
	);
	const users = JSON.parse(localStorage.getItem("users") || "[]");
	const user = users.find((u: User) => u.id === injectiveAddress);

	useEffect(() => {
		const fetchJob = async () => {
			await fetch("https://agentwork.space/api/invoke", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: "1",
					request: job.description,
					id_thread: job.id.toString(),
				}),
			});
			setIsCompleted(true);
		};

		if (job.status === "active") {
			fetchJob();
		}
	}, []);

	useEffect(() => {
		if (job.status === "active") {
			const interval = setInterval(() => {
				setActiveMilestone((prev) => {
					if (prev === job.milestones.length - 1) {
						clearInterval(interval);
						return prev;
					}

					setMessages((pr) => {
						return [
							...pr,
							{
								role: "assistant",
								content: `We are moving to the next milestone: ${job.milestones[prev + 1].name}`,
							},
						];
					});
					return prev + 1;
				});
			}, 5000);

			return () => clearInterval(interval);
		}
		setActiveMilestone(job.milestones.length - 1);
		setIsCompleted(true);
	}, [job.status]);

	useEffect(() => {
		if (isCompleted) {
			setMessages((prev) => {
				return [
					...prev,
					{
						role: "assistant",
						content:
							"All milestones are completed, please check the output for the final result. Feel free to contact the agent team for any questions.",
					},
				];
			});
		}
	}, [isCompleted]);

	const handleSendMessage = async (message: string) => {
		setMessages((prev) => {
			return [...prev, { role: "user", content: message }];
		});
		setMessage("");
		const res = await fetch("https://agentwork.space/api/invoke", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: job.id.toString(),
				request: message,
				id_thread: job.id.toString(),
			}),
		});
		const data = await res.json();
		console.log(data);
		setMessages((prev) => {
			return [
				...prev,
				{ role: "assistant", content: data.output[1].messages[1]?.content },
			];
		});
	};

	const handleApprove = async () => {
		const msg = ApproveJobContract(injectiveAddress, job.id);
		await msgBroadcastClient.broadcast({
			msgs: msg!,
			injectiveAddress: injectiveAddress,
		});
		const jobs = JSON.parse(localStorage.getItem("jobs") || "[]") as Job[];
		const jobIndex = jobs.findIndex((j) => j.id === job.id);
		jobs[jobIndex].status = "completed";
		localStorage.setItem("jobs", JSON.stringify(jobs));
	};

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
			<div className="flex min-w-[1000px] max-w-[1000px] text-white min-h-1/2 h-1/2 max-h-1/2 border border-[#0039C8] rounded-lg overflow-hidden">
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
					<Tabs defaultValue="details" className="w-full h-full">
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
						<TabsContent value="contract" className="overflow-scroll">
							<div className="flex flex-col gap-2">
								<h2 className="text-2xl">AI Agent Work Agreement</h2>
								<p>
									This agreement is entered between the Job Poster and the AI
									Agent owner. The Agent will complete the assigned task
									according to the specifications and timeline provided in the
									job description.
								</p>
								<p>
									Payment will be processed only upon satisfactory completion
									and approval of deliverables. The Job Poster retains all
									intellectual property rights to the completed work.
								</p>
								<p>
									The AI Agent owner guarantees the security and confidentiality
									of all data provided. Either party may terminate this
									agreement with 24-hour notice if requirements are not met.
								</p>
								<p>
									All dispute resolutions will be handled through the platform's
									arbitration system. This agreement is governed by applicable
									digital service laws.
								</p>
							</div>
						</TabsContent>
						<TabsContent value="team">
							<div className="flex flex-col gap-2">
								{job.agents.map((agent) => {
									return (
										<div key={agent.name} className="flex gap-2 items-center">
											<img
												src={agent.avatar}
												alt={agent.name}
												className="w-10 h-10 rounded-full"
											/>
											<p>{agent.name}</p>
										</div>
									);
								})}
							</div>
						</TabsContent>
						<TabsContent value="output">
							{isCompleted ? (
								<div className="flex flex-col gap-2">
									<h3>Here is your output</h3>
									<Link
										to={job.output || ""}
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
								<Button
									className="rounded-full px-8 bg-[#AFFF01] text-black hover:bg-[#AFFF01]"
									onClick={() => {
										handleApprove();
									}}
								>
									Approve
								</Button>
							</>
						)}
					</div>
				</div>
				<div className="flex flex-col shrink-0 flex-1 p-4 min-h-full h-full max-h-full overflow-scroll text-black">
					<h3
						className="text-[#0038C9] mb-4 py-2 rounded-full px-4"
						style={{
							backdropFilter: "blur(10px)",
						}}
					>
						Agents
					</h3>
					<div className="flex flex-col grow w-full h-full">
						<div className="flex gap-2 items-center mb-2">
							<img
								src={job.agents[0].avatar}
								alt="agent"
								className="w-10 h-10 rounded-full"
							/>
							<p>
								{job.status === "active"
									? "Hello, our agent team is working on your job!"
									: "Your job has been completed!"}
							</p>
						</div>
						<div className="flex flex-col gap-2 grow">
							<div className="flex flex-col gap-2 grow max-w-full text-wrap overflow-hidden">
								{messages.map((message) => {
									return (
										<div
											key={message.content}
											className={cn("flex gap-2 items-center", {
												"flex-row-reverse": message.role === "user",
											})}
										>
											<img
												src={
													message.role === "user"
														? user.avatar
														: job.agents[0].avatar
												}
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
							<div className="flex gap-2 sticky bottom-0 mt-4 bg-white">
								<Input
									placeholder={
										isCompleted
											? "Message"
											: "Please wait for the job to be completed"
									}
									disabled={!isCompleted}
									onChange={(e) => setMessage(e.target.value)}
									value={message}
								/>
								<Button
									disabled={!isCompleted}
									onClick={() => handleSendMessage(message)}
								>
									Send
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
