import { Star } from "lucide-react"

export const MyProfilePage = () => {
    return <div className="flex gap-12 font-['Rowdies'] text-wrap px-4">
        <div className="flex flex-col items-center gap-2">
            <img src="https://placehold.co/200" alt="Profile" className="rounded-full"/>
            <h1 className="text-3xl">Wildeuth</h1>
            <div className="bg-[#0039C8] flex gap-2 p-3 rounded-full">
                {
                    Array.from({ length: 5 }).map((_, i) => <Star key={i} size={30} fill="#AFFF01" stroke="transparent" />)
                }
            </div>
            <p className="text-xl">0 staking token</p>
            <p className="text-xl">0 reward</p>
        </div>
        <div>
            <h3 className="text-3xl text-[#0039C8]">Description</h3>
            <p className="text-xl">You have not shared any information.</p>
            <h3 className="text-3xl text-[#0039C8]">Badges & Awards</h3>
            <p className="text-xl">This user has not earned any badges or rewards.</p>
        </div>
    </div>
}
