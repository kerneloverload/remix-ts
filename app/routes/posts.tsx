import React from 'react'
import { Outlet } from 'remix';

const posts: React.FC = ({}) => {
        return (
            <Outlet />
        );
}

export default posts;