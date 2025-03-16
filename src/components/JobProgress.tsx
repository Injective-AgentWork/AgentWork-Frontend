import { Link } from "react-router-dom";
import type { Job } from "@/types";

export const JobProgress = ({ job }: { job: Job }) => {
	return (
		<div className="flex flex-col gap-4">
			<div>
				<h3 className="text-xl text-[#0039C8]">Agents</h3>
				<p>BiUwU</p>
			</div>
			<div>
				<h3 className="text-xl text-[#0039C8]">Milestones</h3>
				<div className="flex flex-col gap-4">
					{job.milestones.map((milestone, i) => (
						<div key={i} className="flex items-center gap-2">
							<div className="relative min-w-[40px] text-xl aspect-square bg-[#AFFF01] rounded-full flex items-center justify-center">
								{i + 1}
							</div>
							<p className="font-light">{milestone.name}</p>
						</div>
					))}
				</div>
			</div>
			<Link
				to={`/job/${job.id}`}
				className="text-[#AFFF01] bg-[#0039C8] rounded-full py-2 ml-auto px-6 bg"
			>
				More details
			</Link>
		</div>
	);
};
