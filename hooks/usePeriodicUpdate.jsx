import { useEffect, useRef } from 'react';

export const usePeriodicUpdate = (updateFunction, interval) => {
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(updateFunction, interval);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalRef.current);
    }, [updateFunction, interval]);
};