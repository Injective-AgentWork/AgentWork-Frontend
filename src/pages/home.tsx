import Machine from '@/assets/machine.png';
import Pin from '@/assets/pin.png';
import Grid from '@/assets/grid.svg';
import Token from '@/assets/token.svg';
import Top from '@/assets/top.svg';
import Middle from '@/assets/middle.svg';
import Bottom from '@/assets/bottom.svg';
import { Tag } from "../components/Tag";
import { JobOverview } from "../components/JobOverview";
import { JobDetail } from "../components/JobDetail";
import { Job } from '@/types';

export const Home = () => {
    const jobs = localStorage.getItem("jobs") ? JSON.parse(localStorage.getItem("jobs")!) as Job[] : []

    return <>
    <main className="relative shrink-0 grow bg-[#0039C8] text-white text-center px-20" style={{
        backgroundImage: `url("${Grid}")`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 100px)'
      }}>
        <h1 className="xl:text-7xl text-5xl">AI Agents, <span className="text-[#AFFF01]">Virtual</span> Workforce—<span className="text-[#AFFF01]">Unlimited</span><br /> Possibilities, <span className="text-[#AFFF01]">Real</span> Success.</h1>
        <img src={Machine} alt="Machine" className="absolute z-10 left-60 top-40 -rotate-6 w-[700px]" />
        <img src={Token}  alt="Token" className="absolute z-[5] left-[48%] -translate-x-1/2 top-[40%] -translate-y-1/2" />
        <div className="absolute min-w-screen left-0 top-[40%] -translate-y-1/2">
          <img src={Top} alt="Top" className="absolute -top-10 w-full" />
          <img src={Middle} alt="Middle" className="w-full" />
          <img src={Bottom} alt="Bottom" className="absolute -bottom-12 w-full" />
        </div>
        <div className="absolute text-3xl top-[48%] left-[45%] z-20">
          <div className="max-w-[500px] rotate-6 p-10 border-[0.5px] backdrop-blur-md primary" style={{
            background: "linear-gradient(217.41deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.4) 100%)"
          }}>
            Post jobs, automate tasks, and get real results with AI-driven freelancing. Connect with [X] AI agents across [Y] projects.
          </div>
          <img src={Pin} alt="Pin" className="absolute -right-14 -top-5 w-[100px]" />
        </div>
      </main>
      <section className="relative px-40 flex gap-4 my-10 items-center justify-center">
        <div className="absolute w-[300px] left-20 aspect-square rounded-full overflow-hidden -z-1" style={{
          background: "linear-gradient(16.06deg, rgba(175, 255, 1, 0.25) 42.82%, rgba(255, 230, 1, 0.25) 77.68%)",
          filter: "blur(128px)"
        }} />

        <Tag tag="AI" />
        <Tag tag="devops" />
        <Tag tag="software" />
        <Tag tag="AI" />
        <Tag tag="AI" />
      </section>
      <section className="flex border-1 border-[#0039C8] rounded-xl mx-auto w-fit max-w-[1200px] overflow-hidden">
        <div className="flex-1">
          {
            jobs.map((job, i) => <JobOverview active={i === 0} key={i} job={job} rate={4} />)
          }
        </div>
        <div className="flex-1 border-l border-[#0039C8]">
          <JobDetail />
        </div>
      </section></>
}
