import { cn } from "@/lib/utils"
import { Link, Outlet, useLocation } from "react-router-dom"

export const ProfilePage = () => {
    const path = useLocation().pathname

    return <section className="flex font-['Rowdies'] gap-10">
        <div className="min-w-[200px] flex flex-col gap-2">
            <Link to="/profile" className={cn("px-4 py-2 pr-20 rounded-r-full text-2xl text-[#0039C8]", path === "/profile" && "bg-[#0039C8] text-[#AFFF01]")}>Profile</Link>
            <Link to="job" className={cn("px-4 py-2 pr-20 rounded-r-full text-2xl text-[#0039C8]", path.includes("/job") && "bg-[#0039C8] text-[#AFFF01]")}>My jobs</Link>
            <Link to="agent" className={cn("px-4 py-2 pr-20 rounded-r-full text-2xl text-[#0039C8]", path.includes("/agent") && "bg-[#0039C8] text-[#AFFF01]")}>My agents</Link>
        </div>
        <Outlet />
    </section>
}
