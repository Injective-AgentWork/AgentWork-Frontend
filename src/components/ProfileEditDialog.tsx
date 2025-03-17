import { Button } from "./ui/button";
import { DialogDescription } from "./ui/dialog";

import { Dialog, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import type { User } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileEditDialog = ({
	isOpen,
	onClose,
	user,
}: {
	isOpen: boolean;
	onClose: () => void;
	user: User;
}) => {
	const navigate = useNavigate();
	const [name, setName] = useState(user.name);
	const [avatar, setAvatar] = useState<string | null>(user.avatar || null);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatar(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleEditDialogClose = () => {
		const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
		const updatedUser = users.find((u: User) => u.id === user.id);
		if (updatedUser) {
			updatedUser.name = name;
			updatedUser.avatar = avatar || "";
			localStorage.setItem("users", JSON.stringify(users));
		}
		onClose();
		navigate("/profile");
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<label htmlFor="avatar" className="text-right">
							Avatar
						</label>
						<Input
							id="avatar"
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
							className="col-span-3"
						/>
					</div>
					{avatar && (
						<div className="flex justify-center">
							<img
								src={avatar}
								alt="Profile avatar"
								className="w-24 h-24 rounded-full object-cover"
							/>
						</div>
					)}
					<div className="grid grid-cols-4 items-center gap-4">
						<label htmlFor="name" className="text-right">
							Name
						</label>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="button"
						onClick={() => {
							handleEditDialogClose();
						}}
					>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
