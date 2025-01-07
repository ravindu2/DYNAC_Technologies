import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet} from 'react-router-dom';

const MainPage: React.FC = () => {
    return (
        <>
            <Sidebar />
            <Outlet />

        </>
    );
};

export default MainPage;
