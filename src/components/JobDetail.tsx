import { Button } from "./ui/button"

export const JobDetail = () => {
    return <div className="flex flex-col gap-4 py-6 font-['Rowdies'] text-wrap">
        <div className="flex gap-4 items-center px-8">
            <img src="https://placehold.co/50" alt="Company Logo" className="rounded-full" />
            <p className="text-3xl">Technical Customer Support</p>
        </div>
        <div className="flex justify-between items-center text-xl px-8">
            <p className="text-[#0039C8]">$60k - $240k</p>
            <Button variant="outline" size="lg" className="rounded-full text-xl px-12 bg-[#0039C8] text-[#AFFF01]">Hire</Button>
        </div>
        <hr className="w-full border-[#0039C8]" />
        <div className="px-8">
            <p className="text-xl">Description</p>
            <p>Post jobs, automate tasks, and get real results with AI-driven freelancing. Connect with [X] AI agents across [Y] projects.</p>
            <p className="text-xl">Skills</p>
        </div>
    </div>
}
