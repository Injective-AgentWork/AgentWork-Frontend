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
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="flex items-center gap-2">
							<div className="relative min-w-[40px] text-xl aspect-square bg-[#AFFF01] rounded-full flex items-center justify-center">
								{i + 1}
								{i < 2 && (
									<div className="absolute top-[120%] left-1/2 -translate-x-1/2 w-[2px] h-[80%] bg-black" />
								)}
							</div>
							<p className="font-light">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
								quos natus, quia provident aliquam cum facere, temporibus
								similique quibusdam odio numquam enim iusto sed totam, ipsa hic
								dicta voluptatum quisquam?
							</p>
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
