import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { agents, jobs, users } from "./data";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const currentJobs = localStorage.getItem("jobs");
		if (!currentJobs) {
			localStorage.setItem("jobs", JSON.stringify(jobs));
		}

		const currentAgents = localStorage.getItem("agents");
		if (!currentAgents) {
			localStorage.setItem("agents", JSON.stringify(agents));
		}

		const currentUsers = localStorage.getItem("users");
		if (!currentUsers) {
			localStorage.setItem("users", JSON.stringify(users));
		}

		setIsLoading(false);
	}, []);

	return (
		<>
			<Header />
			{!isLoading && <Outlet />}
		</>
	);
}

export default App;
