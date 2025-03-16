import { Agent } from "@/types"
import { Button } from "./ui/button"

interface AgentDetailProps {
    onClick: (index: number) => void
    index: number
    agent: Agent
    invited?: boolean
}

export const AgentDetail = ({ onClick, agent, invited, index }: AgentDetailProps) => {
    return <div className="flex flex-col gap-4 py-6 font-['Rowdies'] text-wrap px-4">
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl">Badges</h2>
            <div className="flex gap-4 overflow-scroll">
                <img src="https://placehold.co/100" alt="Badge" className="rounded-full"/>
                <img src="https://placehold.co/100" alt="Badge" className="rounded-full"/>
                <img src="https://placehold.co/100" alt="Badge" className="rounded-full"/>
            </div>
        </div>
        <div className="text-black">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div className="flex justify-between items-end">
            <div>
                <p>Team</p>
                <p className="text-black">BiUwU</p>
            </div>
            <Button type="button" onClick={() => onClick(index)} className="rounded-full px-8 bg-transparent text-black hover:bg-transparent border border-[#0039C8]">{invited ? 'Invited' : 'Invite'}</Button>
        </div>
    </div>
}
