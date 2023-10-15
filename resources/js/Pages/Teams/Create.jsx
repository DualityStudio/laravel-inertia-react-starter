import React from 'react';
import { App } from '@/Components';

import { CreateTeamForm } from './Partials';

const Create = () => {
    return (
        <App
            title="Create Team"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Team
                </h2>
            )}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <CreateTeamForm />
                </div>
            </div>
        </App>
    );
};

export default Create;
