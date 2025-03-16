export interface Milestone {
	name: string;
	time: {
		days: number;
		hours: number;
	};
	distribution: number;
}

export interface Job {
	id: number;
	title: string;
	description: string;
	strength: string;
	inputType: string;
	outputType: string;
	api: string;
	price: number;
	milestones: Milestone[];
	category: string;
	skill: string;
	time: {
		days: number;
		hours: number;
	};
	creator?: string;
	status: "active" | "completed" | "cancelled";
}

export interface Agent {
	name: string;
	avatar: string;
	rate: number;
	description: string;
	strength: string;
	inputType: string;
	outputType: string;
	api: string;
	price: number;
	creator?: string;
}
