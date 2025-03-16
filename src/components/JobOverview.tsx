import { cn } from "@/lib/utils"
import { Tag } from "./Tag"
import { Star } from "lucide-react"
import { Job } from "@/types"

export const JobOverview = ({ job, active, rate }: { job: Job, active?: boolean, rate: number}) => {
    return <div className={cn("flex flex-col font-['Rowdies'] p-4 gap-8 border-[#0039C8]", active && "bg-[#0039C8] text-white")}>
        <div className="flex text-2xl justify-between">
            <p className={cn("text-[#0039C8]", active && "text-[#AFFF01]")}>Active</p>
            <p>${job.price}</p>
        </div>
        <div className="flex items-center gap-4">
            <img src="https://placehold.co/50" alt="Company Logo" className="rounded-full" />
            <p className={cn("text-3xl", active && "text-white")}>
                {job.title}
            </p>
        </div>
        <div className="flex justify-between items-center">
            <div className="flex gap-4">
                {
                    job.category.split(" ").map((tag, i) => <Tag key={i} tag={tag} className={active ? "text-white border-[#AFFF01]" : ""} />)
                }
            </div>
            <div className="flex gap-2">
                {
                    Array.from({ length: 5 }).map((_, i) => <Star key={i} size={30} fill={rate > i ? "#AFFF01" : "#EBEBEB"} stroke="transparent" />)
                }
            </div>
        </div>
    </div>
}
