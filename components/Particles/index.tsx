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
                        "value": 160,
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
                        "enable": false
                    },
                    "move": {
                        collisions: true,
                        enable: true,
                        speed: 0.5,
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
        }} />
    )
}

export default ParticlesBG;