import { Search } from "lucide-react"
import { Input } from "./ui/input"
import ConnectWallet from "./ConnectWallet"
import { Button } from "./ui/button"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export const Header = () => {
    const path = useLocation().pathname

    return <header className={cn("flex items-center justify-between gap-10 px-10 py-4", path === "/" && "bg-[#0039C8]")}>
    <div className="flex items-center gap-8">
      <Link to="/">
        <div className={cn("uppercase leading-none", path === "/" ? "primary" : "text-[#0039C8]")}>
          <p className="text-[32px]">agent</p>
          <p className="text-4xl">work</p>
        </div>
      </Link>
      <div className={cn("relative", path === "/" ? "text-white" : "text-black")}>
        <Input className={cn("py-5 border-2 !text-xl rounded-sm xl:w-[400px] w-[250px] placeholder:text-xl", path === "/" ? "border-white placeholder:text-white" : "border-black")} placeholder="Search" />
        <Search className="absolute right-0 top-1/2 -translate-1/2" size={20} />
      </div>
    </div>
    <div className="flex gap-4 font-['Rowdies']">
      <Button className={cn("bg-transparent hover:bg-transparent border rounded-sm text-2xl py-5 px-6", path === "/" ? "border-[#AFFF01]" : "border-black text-black")}>
        <Link to="/agent/create">Create new agent</Link>
      </Button>
      <Button className={cn("bg-white text-black rounded-sm text-2xl py-5 px-6", path === "/" ? "bg-white hover:bg-white" : "bg-[#AFFF01] hover:bg-[#AFFF01]")}>
        <Link to="/job/create">Post a job</Link>
      </Button>
      <div className={cn(path === "/" ? "text-white" : "text-black")}>
        <ConnectWallet />
      </div>
    </div>
  </header>
}
