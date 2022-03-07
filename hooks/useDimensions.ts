import React, { useLayoutEffect } from "react";
import { useDebounce } from "use-debounce";

interface IUseDimensionsProps {
    enableDebounce?: boolean; 
    debounceWait?: number; 
}

const useDimensions = ({ enableDebounce = false, debounceWait = 150 } : IUseDimensionsProps = { enableDebounce: false, debounceWait: 150  }) => {
    const [dimensions, setDimensions] = React.useState({ 
        height: 0,
        width: 0
      })

    const [ debouncedDimensions ] = useDebounce(dimensions, debounceWait);

    useLayoutEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useLayoutEffect(() => {
        setDimensions({ height: window.innerHeight, width: window.innerWidth });
    }, []);

    return enableDebounce ? debouncedDimensions : dimensions;
}   

export default useDimensions;