import { createContext, useContext } from 'react';

export const RouteContext = createContext(null);

const useRoute = () => {
    const fn = useContext(RouteContext);

    if (!fn) {
        throw new Error('Route function must be provided');
    }

    return fn;
};

export default useRoute;
