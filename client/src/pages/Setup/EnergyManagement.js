import { useLocation, Outlet } from 'react-router-dom';

const EnergyManagement = () => {
    const location = useLocation();
    if (location === "/energy-management")
        return (
            <h1>EnergyManagement</h1>
        )
    return <Outlet />
}
export default EnergyManagement