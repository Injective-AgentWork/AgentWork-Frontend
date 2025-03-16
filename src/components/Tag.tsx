import { cn } from "@/lib/utils"

export const Tag = ({ tag, className }: { tag: string, className?: string }) => {
    return <p className={cn("text-black rounded-xs border border-[#0039C8] font-['Rowdies'] text-xl xl:text-2xl px-4 py-3", className)}>{tag}</p>
}
