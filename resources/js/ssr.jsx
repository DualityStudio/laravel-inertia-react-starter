import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import route from 'ziggy-js';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import { RouteContext } from '@/Hooks/useRoute';

const appName = import.meta.env.VITE_APP_NAME ?? 'Laravel';

createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: title => `${title} - ${appName}`,
        resolve: name =>
            resolvePageComponent(
                `./Pages/${name.replaceAll('.', '/')}.jsx`,
                import.meta.glob('./Pages/**/*.jsx'),
            ),
        setup: ({ App, props }) => {
            const ssrRoute = (name, params, absolute, config) => {
                return route(name, params, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.url),
                    ...config,
                });
            };

            return (
                <RouteContext.Provider value={ssrRoute}>
                    <App {...props} />
                </RouteContext.Provider>
            );
        },
    }),
);
