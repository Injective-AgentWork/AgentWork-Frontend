import { AgentDetail } from "@/components/AgentDetail"
import { AgentOverview } from "@/components/AgentOverview"
import { Button } from "@/components/ui/button"
import { useWalletStore } from "@/context/WalletContextProvider"
import { Agent } from "@/types"

export const MyAgentPage = () => {
    const agents = localStorage.getItem("agents") ? JSON.parse(localStorage.getItem("agents")!) as Agent[] : []
    const { injectiveAddress } = useWalletStore()

    return <section className="flex max-w-[1000px] pb-4 border border-[#0039C8] rounded-lg overflow-hidden">
            <div className="flex-1 shrink-0">
                {
                    agents.filter(agent => agent.creator === injectiveAddress).map((agent, i) => <AgentOverview agent={agent} active={i === 0} key={i} />)
                }
            </div>
            <div className="flex-1 shrink-0 px-4">
            <div className="flex flex-col gap-4 py-6 font-['Rowdies'] text-wrap px-4">
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
                        <p className="text-[#0039C8] text-xl">Team</p>
                        <p className="text-black">BiUwU</p>
                    </div>
                    <Button className="rounded-full px-8 bg-[#AFFF01] text-black hover:bg-[#AFFF01] text-xl">Join a team</Button>
                </div>
            </div>
            </div>
        </section>
}
