import React from 'react';

import { App, SectionBorder } from '@/Components';
import { DeleteTeamForm, TeamMemberManager, UpdateTeamNameForm } from './Partials';

const Show = ({ team, availableRoles, permissions }) => {
    return (
        <App
            title="Team Settings"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Team Settings
                </h2>
            )}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <UpdateTeamNameForm team={team} permissions={permissions} />

                    <div className="mt-10 sm:mt-0">
                        <TeamMemberManager
                            team={team}
                            availableRoles={availableRoles}
                            userPermissions={permissions}
                        />
                    </div>

                    {permissions.canDeleteTeam && !team.personal_team ? (
                        <>
                            <SectionBorder />

                            <div className="mt-10 sm:mt-0">
                                <DeleteTeamForm team={team} />
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </App>
    );
};

export default Show;
