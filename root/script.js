class ParticleGalaxy {
            constructor() {
                this.scene = null;
                this.camera = null;
                this.renderer = null;
                this.particles = null;
                this.mouseX = 0;
                this.mouseY = 0;
                this.windowHalfX = window.innerWidth/2 ;
                this.windowHalfY = window.innerHeight/2;
                this.time = 0;
                
                this.init();
                this.createGalaxy();
                this.animate();
                this.setupEventListeners();
            }

            init() {
                const canvas = document.getElementById('galaxy');
                
                // Scene
                this.scene = new THREE.Scene();

                // Camera
                this.camera = new THREE.PerspectiveCamera(
                    75,
                    window.innerWidth / window.innerHeight,
                    1,
                    3000
                );
                this.camera.position.z = 1000;

                // Renderer
                this.renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    antialias: true,
                    alpha: true
                });
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }

            createGalaxy() {
                const particleCount = 20000;
                const geometry = new THREE.BufferGeometry();
                
                const positions = new Float32Array(particleCount * 3);
                const colors = new Float32Array(particleCount * 3);
                
                // Color palette
                const colorOptions = [
                    { r: 0.4, g: 0.7, b: 1.0 }, // Light blue
                    { r: 0.26, g: 0.65, b: 0.96 }, // Blue
                    { r: 0.13, g: 0.59, b: 0.95 }, // Darker blue
                    { r: 1.0, g: 1.0, b: 1.0 }, // White
                    { r: 0.89, g: 0.95, b: 0.99 }, // Very light blue
                    { r: 0.73, g: 0.87, b: 0.98 }, // Light blue-grey
                ];

                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;
                    
                    // Create uniform sphere distribution for infinite look
                    const radius = Math.random() * 2500 + 200; // Larger spread
                    const theta = Math.random() * Math.PI * 2; // Horizontal angle
                    const phi = Math.acos(2 * Math.random() - 1); // Vertical angle for sphere
                    
                    // Position particles in 3D sphere
                    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                    positions[i3 + 2] = radius * Math.cos(phi);

                    // Color
                    const colorChoice = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                    colors[i3] = colorChoice.r;
                    colors[i3 + 1] = colorChoice.g;
                    colors[i3 + 2] = colorChoice.b;
                }

                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

                // Create texture for particles
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const context = canvas.getContext('2d');
                
                const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
                gradient.addColorStop(0, 'rgba(255,255,255,1)');
                gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
                gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
                gradient.addColorStop(1, 'rgba(255,255,255,0)');
                
                context.fillStyle = gradient;
                context.fillRect(0, 0, 64, 64);
                
                const texture = new THREE.CanvasTexture(canvas);

                // Material
                const material = new THREE.PointsMaterial({
                    size: 3,
                    map: texture,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                    transparent: true,
                    vertexColors: true
                });

                this.particles = new THREE.Points(geometry, material);
                this.scene.add(this.particles);

                // Hide loading and show content
                document.getElementById('loading').style.display = 'none';
                const content = document.getElementById('content');
                setTimeout(() => {
                    content.style.transition = 'opacity 2s ease-in-out';
                    content.style.opacity = '1';
                }, 100);
            }

            animate() {
                requestAnimationFrame(() => this.animate());
                
                this.time += 0.01;

                // Mouse interaction
                this.camera.position.x += (this.mouseX * 0.5 - this.camera.position.x) * 0.05;
                this.camera.position.y += (-this.mouseY * 0.5 - this.camera.position.y) * 0.05;
                
                // Gentle rotation
                this.particles.rotation.y += 0.0005;
                this.particles.rotation.x += 0.0002;

                // Floating animation through position updates
                const positions = this.particles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(this.time + positions[i] * 0.01) * 0.1;
                }
                this.particles.geometry.attributes.position.needsUpdate = true;

                this.camera.lookAt(this.scene.position);
                this.renderer.render(this.scene, this.camera);
            }

            setupEventListeners() {
                document.addEventListener('mousemove', (event) => {
                    this.mouseX = (event.clientX - this.windowHalfX);
                    this.mouseY = (event.clientY - this.windowHalfY);
                });

                window.addEventListener('resize', () => {
                    this.windowHalfX = window.innerWidth / 2;
                    this.windowHalfY = window.innerHeight / 2;
                    
                    this.camera.aspect = window.innerWidth / window.innerHeight;
                    this.camera.updateProjectionMatrix();
                    
                    this.renderer.setSize(window.innerWidth, window.innerHeight);
                });

                document.addEventListener('touchmove', (event) => {
                    if (event.touches.length === 1) {
                        event.preventDefault();
                        this.mouseX = (event.touches[0].clientX - this.windowHalfX);
                        this.mouseY = (event.touches[0].clientY - this.windowHalfY);
                    }
                }, { passive: false });
            }
        }

        // Error handling
        window.addEventListener('error', (e) => {
            console.error('Error loading galaxy:', e);
            document.getElementById('loading').innerHTML = '<div style="color: red;">Error loading galaxy. Please refresh the page.</div>';
        });

        // Initialize when ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new ParticleGalaxy();
            });
        } else {
            new ParticleGalaxy();
        }