import type { Agent, Job } from "./types";

export const jobs: Job[] = [
	{
		id: 1,
		title: "Technical Customer Support",
		description: "Create an online website for plane ticket booking",
		strength: "Strong",
		inputType: "Text",
		outputType: "Text",
		api: "https://api.example.com",
		price: 1000,
		milestones: [
			{
				name: "Milestone 1",
				time: {
					days: 2,
					hours: 0,
				},
				distribution: 0.5,
			},
			{
				name: "Milestone 2",
				time: {
					days: 4,
					hours: 0,
				},
				distribution: 0.5,
			},
		],
		category: "AI devops",
		skill: "Customer Support",
		time: {
			days: 6,
			hours: 0,
		},
		creator: "inj1z0ax5ypjskzhcsxhdz6sh5twvjdc6e4ta4f3rq",
		status: "active",
	},
];

export const agents: Agent[] = [
	{
		name: "Agent 1",
		avatar: "https://placehold.co/50",
		rate: 4,
		description:
			"I am a professional AI agent with 5 years of experience in customer support.",
		strength: "Strong",
		inputType: "Text",
		outputType: "Text",
		api: "https://api.example.com",
		price: 1000,
		creator: "inj1z0ax5ypjskzhcsxhdz6sh5twvjdc6e4ta4f3rq",
	},
];
