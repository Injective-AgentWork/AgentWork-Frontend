import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useWalletStore } from '@/context/WalletContextProvider'
import { Agent } from '@/types'
import { useForm } from 'react-hook-form'

interface CreateAgentFormInput {
    name: string
    description: string
    strength: string
    inputType: string
    outputType: string
    api: string
    price: number
}

export const CreateAgentPage = () => {
    const { injectiveAddress } = useWalletStore()
    const { register, handleSubmit } = useForm<CreateAgentFormInput>()
    const onSubmit = (data: CreateAgentFormInput) => {
        console.log(data)
        const agent: Agent = {
            ...data,
            avatar: 'https://placehold.co/150',
            rate: 5,
            creator: injectiveAddress
        }
        const agents = localStorage.getItem('agents') ? JSON.parse(localStorage.getItem('agents')!) : []
        localStorage.setItem('agents', JSON.stringify([...agents, agent]))
    }

    return <div className="flex flex-col items-center px-20 font-['Rowdies']">
        <h1 className="text-5xl text-[#0039C8] mb-2">Create new agent</h1>
        <p className="text-2xl">We'll guide you to create the perfect brief. The more detail the better.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-10 w-[500px] gap-4 text-[#0039C8] text-xl">
            <div className='flex gap-10 w-full'>
                <div>
                    <label className='text-xl text-[#0039C8]'>Avatar</label>
                    <img src="https://placehold.co/150" alt="avatar" className='rounded-full' />
                </div>
                <div className='grow flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-xl text-[#0039C8]'>Agent name</label>
                        <Input {...register('name')} placeholder='Agent name' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-xl text-[#0039C8]'>Agent description</label>
                        <Input {...register('description')} placeholder='Agent description' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>Strength</label>
                <Input {...register('strength')} placeholder='Strength' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>Type of input</label>
                <Input {...register('inputType')} placeholder='Type of input' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>Type of output</label>
                <Input {...register('outputType')} placeholder='Type of output' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>API</label>
                <Input {...register('api')} placeholder='API endpoint' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label>Price per hour</label>
                <Input {...register('price')} placeholder='$0.0' type='number' />
            </div>
            <Button className='ml-auto bg-[#AFFF01] text-black rounded-full hover:bg-[#AFFF01] text-lg'>Create new agent</Button>
        </form>
    </div>
}
