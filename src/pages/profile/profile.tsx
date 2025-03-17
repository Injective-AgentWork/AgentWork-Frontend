import { useWalletStore } from "@/context/WalletContextProvider";
import { Pencil, Star } from "lucide-react";
import badge1 from "@/assets/badge-1.png";
import badge2 from "@/assets/badge-2.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileEditDialog } from "@/components/ProfileEditDialog";
import type { User } from "@/types";
const badges = [
	{
		name: "Badge 1",
		image: badge1,
	},
	{
		name: "Badge 2",
		image: badge2,
	},
];

export const MyProfilePage = () => {
	const users = JSON.parse(localStorage.getItem("users") || "[]");
	const { injectiveAddress } = useWalletStore();
	const user = users.find((user: User) => user.id === injectiveAddress);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	return (
		<div className="flex gap-12 font-['Rowdies'] text-wrap px-4">
			<div className="relative flex flex-col items-center gap-2">
				<Button
					className="absolute top-0 right-0"
					variant="ghost"
					onClick={() => setIsEditDialogOpen(true)}
				>
					<Pencil />
				</Button>
				<img
					src={user?.avatar}
					alt="Profile"
					className="rounded-full w-[200px] aspect-square"
				/>
				<h1 className="text-3xl">{user?.name}</h1>
				<div className="bg-[#0039C8] flex gap-2 p-3 rounded-full">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star
							key={i}
							size={30}
							fill={user?.rate >= i + 1 ? "#AFFF01" : "transparent"}
							stroke="transparent"
						/>
					))}
				</div>
				<p className="text-xl">{user?.stake} staking token</p>
				<p className="text-xl">{user?.rewards} reward</p>
			</div>
			<div className="max-w-[800px]">
				<h3 className="text-3xl text-[#0039C8]">Description</h3>
				<p className="text-xl">{user?.description}</p>
				<div className="mb-4" />
				<h3 className="text-3xl text-[#0039C8] mb-2">Badges & Awards</h3>
				<div className="flex gap-4">
					{badges.map((badge) => (
						<img
							key={badge.name}
							src={badge.image}
							alt={badge.name}
							className="w-[100px] aspect-square rounded-full"
						/>
					))}
				</div>
			</div>
			<ProfileEditDialog
				isOpen={isEditDialogOpen}
				onClose={() => setIsEditDialogOpen(false)}
				user={user}
			/>
		</div>
	);
};
