import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Logo } from '@/Components';

const PrivacyPolicy = ({ policy }) => {
    return (
        <div>
            <Head title="Privacy Policy" />

            <div className="font-sans text-gray-900 dark:text-gray-100 antialiased">
                <div className="pt-4 bg-gray-100 dark:bg-gray-900">
                    <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
                        <div>
                            <Link href="/">
                                <Logo />
                            </Link>
                        </div>

                        <div
                            className="w-full sm:max-w-2xl mt-6 p-6 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg prose dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: policy }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
