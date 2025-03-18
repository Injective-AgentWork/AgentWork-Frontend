import { JobOverview } from "@/components/JobOverview";
import { JobProgress } from "@/components/JobProgress";
import { useWalletStore } from "@/context/WalletContextProvider";
import type { Job } from "@/types";
import { useState } from "react";

export const MyJobPage = () => {
	const [selectedJob, setSelectedJob] = useState<number>(0);
	const { injectiveAddress } = useWalletStore();
	const jobs = localStorage.getItem("jobs")
		? JSON.parse(localStorage.getItem("jobs")!)
		: [];

	return (
		<section className="flex min-w-[1200px] max-w-[1200px] pb-4 border border-[#0039C8] rounded-lg overflow-hidden">
			<div className="shrink-0">
				{jobs
					.filter((job: Job) => job.creator === injectiveAddress)
					.map((job: Job, i: number) => (
						<div
							key={job.id}
							onClick={() => setSelectedJob(i)}
							className="cursor-pointer"
						>
							<JobOverview
								active={i === selectedJob}
								key={job.id}
								job={job}
								rate={4}
							/>
						</div>
					))}
			</div>
			<div className="px-4 shrink-0 flex-1">
				<JobProgress job={jobs[selectedJob]} />
			</div>
		</section>
	);
};
