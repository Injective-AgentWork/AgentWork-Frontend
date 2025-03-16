import { useEffect } from "react";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { agents, jobs } from "./data";

function App() {
  useEffect(() => {
    const currentJobs = localStorage.getItem("jobs")
    if (!currentJobs) {
      localStorage.setItem("jobs", JSON.stringify(jobs))
    }

    const currentAgents = localStorage.getItem("agents")
    if (!currentAgents) {
      localStorage.setItem("agents", JSON.stringify(agents))
    }
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
