import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import WalletContextProvider from './context/WalletContextProvider.tsx'
import { Home } from './pages/home.tsx'
import { CreateAgentPage } from './pages/agents/create.tsx'
import { CreateJobPage } from './pages/jobs/create.tsx'
import { ProfilePage } from './pages/profile/index.tsx'
import { MyProfilePage } from './pages/profile/profile.tsx'
import { MyJobPage } from './pages/profile/jobs.tsx'
import { JobDetailPage } from './pages/jobs/detail.tsx'
import { MyAgentPage } from './pages/profile/agents.tsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '',
      element: <Home />
    },
    {
      path: 'agent/create',
      element: <CreateAgentPage />
    },
    {
      path: 'job/create',
      element: <CreateJobPage />
    },
    {
      path: 'job/:id',
      element: <JobDetailPage />
    },
    {
      path: 'profile',
      element: <ProfilePage />,
      children: [
        {
          path: '',
          element: <MyProfilePage />,
        },
        {
          path: 'job',
          element: <MyJobPage />,
        },
        {
          path: 'agent',
          element: <MyAgentPage />,
        }
      ]
    }
  ]
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletContextProvider>
      <RouterProvider router={router} />
    </WalletContextProvider>
  </StrictMode>,
)
