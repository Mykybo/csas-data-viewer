import Overview from '@/components/Overview'
import { RouteProps } from 'react-router-dom'

const routes: RouteProps[] = [
  {
    component: Overview,
    exact: true,
    path: '/',
  },
]

export default routes
