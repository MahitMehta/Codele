import React from "react";
import Particles from "react-tsparticles";

const ParticlesBG = () => {
    return (
        <Particles
            params={{
                autoPlay: true,
                fpsLimit: 60,
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

export default ParticlesBG;