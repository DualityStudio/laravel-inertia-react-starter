import React from 'react';

import { App, Welcome, Card, Container } from '@/Components';

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
                <Card>
                    <Card.Header>
                        <Card.Title>Card Title</Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <p>Card Body</p>
                    </Card.Body>

                    <Card.Footer>
                        <p>Card Footer</p>
                    </Card.Footer>
                </Card>

                {/*<Welcome />*/}
            </Container>
        </App>
    );
};

export default Dashboard;
