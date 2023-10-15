import React from 'react';
import { usePage } from '@inertiajs/react';

import { App, SectionBorder } from '@/Components';

import {
    DeleteUserForm,
    LogoutOtherBrowserSessions,
    TwoFactorAuthenticationForm,
    UpdatePasswordForm,
    UpdateProfileInformationForm
} from './Partials';

const Show = ({ sessions, confirmsTwoFactorAuthentication }) => {
    const page = usePage();

    return (
        <App
            title={'Profile'}
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Profile
                </h2>
            )}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    {page.props.jetstream.canUpdateProfileInformation ? (
                        <div>
                            <UpdateProfileInformationForm user={page.props.auth.user} />

                            <SectionBorder />
                        </div>
                    ) : null}

                    {page.props.jetstream.canUpdatePassword ? (
                        <div className="mt-10 sm:mt-0">
                            <UpdatePasswordForm />

                            <SectionBorder />
                        </div>
                    ) : null}

                    {page.props.jetstream.canManageTwoFactorAuthentication ? (
                        <div className="mt-10 sm:mt-0">
                            <TwoFactorAuthenticationForm
                                requiresConfirmation={confirmsTwoFactorAuthentication}
                            />

                            <SectionBorder />
                        </div>
                    ) : null}

                    <div className="mt-10 sm:mt-0">
                        <LogoutOtherBrowserSessions sessions={sessions} />
                    </div>

                    {page.props.jetstream.hasAccountDeletionFeatures ? (
                        <>
                            <SectionBorder />

                            <div className="mt-10 sm:mt-0">
                                <DeleteUserForm />
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </App>
    );
};

export default Show;
