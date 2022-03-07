import React, { useLayoutEffect } from "react";

const useDimensions = () => {
    const [dimensions, setDimensions] = React.useState({ 
        height: 0,
        width: 0
      })

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

    return dimensions;
}   

export default useDimensions;