import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWalletStore } from "@/context/WalletContextProvider";
import type { Agent } from "@/types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface CreateAgentFormInput {
	name: string;
	description: string;
	strength: string;
	inputType: string;
	outputType: string;
	api: string;
	price: number;
}

const compressImage = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			const img = new Image();
			img.src = event.target?.result as string;
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				// Calculate new dimensions (max 300x300)
				let width = img.width;
				let height = img.height;
				const maxSize = 300;

				if (width > height && width > maxSize) {
					height = Math.round((height * maxSize) / width);
					width = maxSize;
				} else if (height > maxSize) {
					width = Math.round((width * maxSize) / height);
					height = maxSize;
				}

				canvas.width = width;
				canvas.height = height;

				if (!ctx) {
					reject(new Error("Could not get canvas context"));
					return;
				}

				ctx.drawImage(img, 0, 0, width, height);

				// Convert to base64 with reduced quality
				const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
				resolve(compressedBase64);
			};
			img.onerror = (error) => reject(error);
		};
		reader.onerror = (error) => reject(error);
	});
};

export const CreateAgentPage = () => {
	const navigate = useNavigate();
	const { injectiveAddress } = useWalletStore();
	const { register, handleSubmit } = useForm<CreateAgentFormInput>();
	const [avatar, setAvatar] = useState<string>("https://placehold.co/150");

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				const compressedBase64 = await compressImage(file);
				setAvatar(compressedBase64);
			} catch (error) {
				console.error("Error compressing image:", error);
				// Fallback to original file if compression fails
				const reader = new FileReader();
				reader.onloadend = () => {
					setAvatar(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const onSubmit = (data: CreateAgentFormInput) => {
		const agent: Agent = {
			...data,
			avatar,
			rate: 5,
			creator: injectiveAddress,
		};
		const agents = JSON.parse(localStorage.getItem("agents") || "[]");
		localStorage.setItem("agents", JSON.stringify([...agents, agent]));
		navigate("/profile/agent");
	};

	return (
		<div className="flex flex-col items-center px-20 font-['Rowdies']">
			<h1 className="text-5xl text-[#0039C8] mb-2">Create new agent</h1>
			<p className="text-2xl">
				We'll guide you to create the perfect brief. The more detail the better.
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col items-center mt-10 w-[500px] gap-4 text-[#0039C8] text-xl"
			>
				<div className="flex gap-10 w-full">
					<div className="flex flex-col gap-2">
						<label htmlFor="avatar" className="text-xl text-[#0039C8]">
							Avatar
						</label>
						<div className="relative">
							<img
								src={avatar}
								alt="avatar"
								className="rounded-full w-[150px] h-[150px] object-cover"
							/>
							<Input
								id="avatar"
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
							/>
						</div>
					</div>
					<div className="grow flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="name" className="text-xl text-[#0039C8]">
								Agent name
							</label>
							<Input id="name" {...register("name")} placeholder="Agent name" />
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="description" className="text-xl text-[#0039C8]">
								Agent description
							</label>
							<Input
								id="description"
								{...register("description")}
								placeholder="Agent description"
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="strength">Strength</label>
					<Input
						id="strength"
						{...register("strength")}
						placeholder="Strength"
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="inputType">Type of input</label>
					<Input
						id="inputType"
						{...register("inputType")}
						placeholder="Type of input"
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="outputType">Type of output</label>
					<Input
						id="outputType"
						{...register("outputType")}
						placeholder="Type of output"
					/>
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="api">API</label>
					<Input id="api" {...register("api")} placeholder="API endpoint" />
				</div>
				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="price">Price per hour</label>
					<Input
						id="price"
						{...register("price")}
						placeholder="$0.0"
						type="number"
					/>
				</div>
				<Button className="ml-auto bg-[#AFFF01] text-black rounded-full hover:bg-[#AFFF01] text-lg">
					Create new agent
				</Button>
			</form>
		</div>
	);
};
