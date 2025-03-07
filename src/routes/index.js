import { useRoutes } from 'react-router-dom';
import DashboardRoutes from '@routes/Dashboard';

export default function Routes() {
  const routes = useRoutes(DashboardRoutes);
  return routes;
}
