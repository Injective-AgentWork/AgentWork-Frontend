import type { Agent, Job } from "./types";

export const agents: Agent[] = [
	{
		id: 0,
		name: "WebCraft AI",
		avatar: "https://placehold.co/50/4285F4/FFFFFF?text=WC",
		rate: 4.8,
		description:
			"Full-stack web development specialist capable of creating responsive websites and web applications from scratch using modern frameworks.",
		strength: "Web Development FE BE software",
		inputType: "Text/Code",
		outputType: "Code/HTML/CSS/JS",
		api: "https://api.webcraft.ai/v1",
		price: 2500,
		creator: "inj1z0ax5ypjskzhcsxhdz6sh5twvjdc6e4ta4f3rq",
	},
	{
		id: 1,
		name: "PixelGenius",
		avatar: "https://placehold.co/50/FF6B6B/FFFFFF?text=PG",
		rate: 4.9,
		description:
			"Advanced image generation AI that creates high-quality visuals, illustrations, and digital art based on detailed text prompts.",
		strength: "Visual Creation AI UX/UI software",
		inputType: "Text",
		outputType: "Images",
		api: "https://api.pixelgenius.io/generate",
		price: 1800,
		creator: "inj1m4tvf7u3m4wkz6jnm7v6xm7erjskcvq98qn6f",
	},
	{
		id: 2,
		name: "SupportSage",
		avatar: "https://placehold.co/50/4ECDC4/000000?text=SS",
		rate: 4.7,
		description:
			"Customer support specialist with knowledge base integration capabilities, able to handle technical inquiries and troubleshooting 24/7.",
		strength: "Technical Support AI QA software",
		inputType: "Text/Voice",
		outputType: "Text/Voice",
		api: "https://api.supportsage.com/assist",
		price: 1200,
		creator: "inj1ksqf7r92pjm4slqzy5gn4h2qhcz0yapzk5xpv3",
	},
	{
		id: 3,
		name: "CodeDebugger",
		avatar: "https://placehold.co/50/556270/FFFFFF?text=CD",
		rate: 4.6,
		description:
			"Specialized in identifying and fixing bugs in code across multiple programming languages, with detailed explanations of solutions.",
		strength: "Debugging BE QA software",
		inputType: "Code",
		outputType: "Code/Analysis",
		api: "https://api.codedebugger.dev/fix",
		price: 1500,
		creator: "inj1a7fsv8h0chkst26qk3vn98qj778uwnq89cjh7a",
	},
	{
		id: 4,
		name: "DataViz Pro",
		avatar: "https://placehold.co/50/FFC857/000000?text=DVP",
		rate: 4.5,
		description:
			"Data visualization expert that transforms complex datasets into insightful charts, graphs, and interactive dashboards.",
		strength: "Data Visualization FE AI software",
		inputType: "Data/CSV/JSON",
		outputType: "Visualizations/Charts",
		api: "https://api.datavizpro.io/visualize",
		price: 2200,
		creator: "inj1v57pwas56x8yld5zntm8ly8pmxuv0ga9hc4a2m",
	},
	{
		id: 5,
		name: "SecGuardian",
		avatar: "https://placehold.co/50/355C7D/FFFFFF?text=SG",
		rate: 4.9,
		description:
			"Cybersecurity specialist capable of performing security audits, vulnerability assessments, and providing hardening recommendations.",
		strength: "Security devops blockchain crypto",
		inputType: "Code/System Info",
		outputType: "Analysis/Recommendations",
		api: "https://api.secguardian.net/audit",
		price: 3000,
		creator: "inj1dtnzr2g0qz3dz63j07mqhvfy9l8s70j0qepxnk",
	},
	{
		id: 6,
		name: "UXMindReader",
		avatar: "https://placehold.co/50/F67280/FFFFFF?text=UX",
		rate: 4.7,
		description:
			"UX/UI design specialist that creates intuitive user interfaces and provides detailed design feedback based on usability principles.",
		strength: "Design UX/UI FE AI",
		inputType: "Text/Images",
		outputType: "Mockups/Feedback",
		api: "https://api.uxmindreader.design/create",
		price: 2100,
		creator: "inj1qat8xvz78jhnkpq0vtwgtc7u44kw0qj4hxdqk2",
	},
	{
		id: 7,
		name: "CloudArchitect",
		avatar: "https://placehold.co/50/6C5B7B/FFFFFF?text=CA",
		rate: 4.8,
		description:
			"Infrastructure design expert specialized in cloud solutions, capable of creating scalable architecture diagrams and deployment plans.",
		strength: "Cloud Infrastructure devops BE web3",
		inputType: "Requirements",
		outputType: "Architecture/Configuration",
		api: "https://api.cloudarchitect.io/design",
		price: 2800,
		creator: "inj1gf9thnkjzwxh7nsnf0pjwua0a07ska9rvzfz8c",
	},
	{
		id: 8,
		name: "DocuGenius",
		avatar: "https://placehold.co/50/99B898/000000?text=DG",
		rate: 4.4,
		description:
			"Technical documentation specialist that creates comprehensive user guides, API docs, and technical manuals with proper formatting.",
		strength: "Documentation PM software QA",
		inputType: "Code/Systems",
		outputType: "Documents/Guides",
		api: "https://api.docugenius.com/generate",
		price: 1300,
		creator: "inj1h3exgmtja88q5yndepjs5z3p0yver3unjsc8xm",
	},
	{
		id: 9,
		name: "TestMaster",
		avatar: "https://placehold.co/50/3FA7D6/FFFFFF?text=TM",
		rate: 4.6,
		description:
			"QA automation specialist that writes comprehensive test cases and executable test scripts to ensure software quality and reliability.",
		strength: "Testing QA devops software",
		inputType: "Code/Requirements",
		outputType: "Tests/Reports",
		api: "https://api.testmaster.dev/create",
		price: 1700,
		creator: "inj1v8zypz0uwm8p4wf7amfh379zekj6mukhs6tk5r",
	},
];

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
			{
				name: "Milestone 3",
				time: {
					days: 6,
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
		agents: [agents[0]],
	},
];

export const users = [
	{
		id: "inj1z0ax5ypjskzhcsxhdz6sh5twvjdc6e4ta4f3rq",
		name: "trungnotchung",
		rate: 5,
		stake: 498,
		rewards: 10,
		description:
			"As a pioneering agent owner and job marketplace curator, I connect cutting-edge AI solutions with real-world business challenges. My platform hosts a diverse ecosystem of specialized digital workers—from web developers and designers to data analysts and cybersecurity experts.",
		avatar:
			"https://media.licdn.com/dms/image/v2/D5603AQHglrZpO6ypBw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721620416895?e=1747872000&v=beta&t=OPKpj5y5eZLpgQ6jmdsQ8l39j75bK3zSPg7259u8EFQ",
	},
];
