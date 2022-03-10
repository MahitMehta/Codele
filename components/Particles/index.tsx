import React, { useEffect, useRef } from "react";
import Particles from "react-tsparticles";

const ParticlesBG = () => {
    const canvasRef = useRef<any>(null);

    useEffect(() => {
        if (canvasRef?.current) {
            console.log(canvasRef.current);
            canvasRef.current.props.style.height = "100vh !important";
        }
    }, [ canvasRef ]);

    return (
        <Particles
            ref={canvasRef}
            style={{ maxWidth: "100vw", height: "100vh !important" }}
            canvasClassName="f-screen !h-[100vh]"
            height="100vh !important"
            className="fixed top-0 left-0 h-screen w-screen overflow-hidden"
            options={{
                autoPlay: true,
                style: {
                    height: "100vh !important",
                    maxHeight: "100vh !important",
                },
                // Causes a Flicker on Page Load
                // fpsLimit: 60,
                "particles": {
                    "number": {
                        "value": 120,
                        "density": {
                            "enable": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "speed": 4,
                            "size_min": 0.3
                        }
                    },
                    "line_linked": {
                        "enable": true
                    },
                    "move": {
                        collisions: true,
                        enable: true,
                        speed: 0.25,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "bounce",
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                responsive: [
                    {
                        maxWidth: 750,
                        options: {
                            particles: {
                                number: {
                                    value: 60,
                                }
                            }
                        }
                    }
                ],
                interactivity: {
                    detectsOn: "canvas",
                    events:{
                        onHover:{
                            enable: true,
                            parallax: {
                                enable: true,
                                smooth: 100,
                                force: 25,
                            }
                        },
                    }
                }
        }} />
    )
}

export default React.memo(ParticlesBG);