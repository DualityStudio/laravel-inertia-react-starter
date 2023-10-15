import React from 'react';

import { App, Welcome, Container } from '@/Components';

const Dashboard = () => {
    return (
        <App
            title="Dashboard"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            )}
        >
            <Container>
                <Welcome />
            </Container>
        </App>
    );
};

export default Dashboard;
