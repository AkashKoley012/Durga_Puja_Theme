import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

console.log("Three.js version:", THREE.REVISION);

class EnhancedDurgaPujaApp {
    constructor() {
        // Festival data
        this.durgaPujaDays = [
            {
                day: "mahalaya",
                title: "Mahalaya",
                bengali: "মহালয়া",
                wish: "🌸 শুভ মহালয়া 🌸 মা দুর্গার আগমনী সুরে মঙ্গলময় হোক জীবনের প্রতিটি মুহূর্ত। মা যেন তাঁর করুণাময় আশীর্বাদে তোমার জীবন ভরে দেন শান্তি, আনন্দ আর ভালোবাসায়।",
                description: "✨ দেবী পক্ষের সূচনা, মায়ের আবাহন 🌼",
            },
            {
                day: "shasthi",
                title: "Shashthi",
                bengali: "ষষ্ঠী",
                wish: "🌼 শুভ ষষ্ঠী 🌼 আজ মায়ের আবাহন। মা দুর্গার পবিত্র উপস্থিতি তোমার জীবন ভরিয়ে দিক অফুরন্ত সুখ, শান্তি আর সমৃদ্ধিতে।",
                description: "💫 ষষ্ঠী পূজার মাধ্যমে দুর্গোৎসবের আনুষ্ঠানিক সূচনা 🌸",
            },
            {
                day: "saptami",
                title: "Saptami",
                bengali: "সপ্তমী",
                wish: "🌺 শুভ সপ্তমী 🌺 মা দুর্গা তোমাকে দিন শক্তি, সাহস আর জ্ঞানের আলোক। জীবন ভরে উঠুক নতুন উদ্যমে আর আশীর্বাদে।",
                description: "🌼 সপ্তমীতে পূজিত হয় শক্তির দেবী 🌟",
            },
            {
                day: "ashtami",
                title: "Ashtami",
                bengali: "অষ্টমী",
                wish: "🌹 শুভ অষ্টমী 🌹 আজকের এই শুভ দিনে মা দুর্গা সমস্ত অশুভ শক্তির বিনাশ করুন এবং তোমার জীবনে আনুন শান্তি, আনন্দ ও আলোক।",
                description: "✨ অষ্টমী পূজা — সবচেয়ে তাৎপর্যপূর্ণ দিন 🌼",
            },
            {
                day: "navami",
                title: "Navami",
                bengali: "নবমী",
                wish: "🌸 শুভ নবমী 🌸 মায়ের আশীর্বাদে ভরে উঠুক তোমার জীবন আনন্দ, ভালোবাসা আর সাফল্যে। মা দুর্গার মহাশক্তি তোমায় রক্ষা করুক সর্বদা।",
                description: "🌺 নবমী — নারীশক্তির মহিমার পূজা 💫",
            },
            {
                day: "dashami",
                title: "Vijaya Dashami",
                bengali: "বিজয়া দশমী",
                wish: "🌼 শুভ বিজয়া 🌼 অশুভের উপর শুভের জয়ের এই দিনে জীবনের প্রতিটি মুহূর্ত হোক সত্য, সাহস আর আলোর পথে। মায়ের আশীর্বাদ সর্বদা তোমার সঙ্গী হোক।",
                description: "✨ বিজয়া দশমী — শুভ শক্তির জয়, অশুভের পরাজয় 🌸",
            },
        ];

        this.cameraPresets = [
            { name: "Front View", position: [0, 3, 12], target: [0, 1, 0] },
            { name: "Side View", position: [12, 4, 0], target: [0, 1, 0] },
            { name: "Top View", position: [0, 15, 3], target: [0, 0, 0] },
            { name: "Orbit View", position: [8, 5, 8], target: [0, 1, 0] },
        ];

        // App state
        this.currentDay = "mahalaya";
        this.photoFrames = [];
        this.flowerPetals = [];
        this.diyas = [];
        this.isAudioPlaying = false;
        this.qualityLevel = "high";

        // Loading management
        this.loadingProgress = 0;
        this.loadingSteps = ["Initializing scene...", "Creating starfield...", "Setting up lights...", "Building environment...", "Loading Durga idol...", "Setting up photo memories...", "Creating flower petals...", "Placing diyas...", "Finalizing setup..."];

        this.init();
    }

    async init() {
        try {
            this.updateProgress(10, this.loadingSteps[0]);
            await this.sleep(200);

            this.setupScene();
            this.setupControls();
            this.updateProgress(20, this.loadingSteps[1]);
            await this.sleep(200);

            this.createRobustStarField();
            this.updateProgress(30, this.loadingSteps[2]);
            await this.sleep(200);

            this.createLights();
            this.updateProgress(40, this.loadingSteps[3]);
            await this.sleep(200);

            this.createEnvironment();
            this.updateProgress(50, this.loadingSteps[4]);
            await this.sleep(300);

            // await this.loadDurgaIdol();
            this.updateProgress(65, this.loadingSteps[5]);
            await this.sleep(200);

            this.setupPhotoMemories();
            this.updateProgress(75, this.loadingSteps[6]);
            await this.sleep(200);

            this.createAlwaysFallingPetals();
            this.updateProgress(85, this.loadingSteps[7]);
            await this.sleep(200);

            this.createEnhancedDiyas();
            this.updateProgress(95, this.loadingSteps[8]);
            await this.sleep(200);

            this.setupEventListeners();
            this.updateProgress(100, "Ready!");
            await this.sleep(500);

            this.animate();
            this.hideLoadingScreen();

            await this.loadDurgaIdol();
            console.log("Enhanced Durga Puja experience initialized successfully");
        } catch (error) {
            console.error("Initialization error:", error);
            this.updateProgress(100, "Loading complete");
            this.hideLoadingScreen();
        }
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    updateProgress(percentage, details) {
        const progressFill = document.getElementById("progress-fill");
        const progressText = document.getElementById("progress-text");
        const loadingDetails = document.getElementById("loading-details");
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (progressText) progressText.textContent = `${percentage}%`;
        if (loadingDetails) loadingDetails.textContent = details;
        this.loadingProgress = percentage;
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        this.scene.fog = new THREE.Fog(0x0a0a0a, 25, 80);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 2, 0);

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("three-canvas"),
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0x0a0a0a, 1);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        console.log("Scene setup complete");
    }

    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 25;
        this.controls.minDistance = 5;

        console.log("Controls setup complete");
    }

    createRobustStarField() {
        // Main star field - NO NaN possible
        const mainStarGeometry = new THREE.BufferGeometry();
        const starCount = 1200;
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);

        const starColors = [new THREE.Color("#FFFFFF"), new THREE.Color("#FFE4B5"), new THREE.Color("#87CEEB"), new THREE.Color("#DDA0DD"), new THREE.Color("#FFF8DC")];

        for (let i = 0; i < starCount; i++) {
            const radius = 35 + Math.random() * 35;
            const theta = Math.random() * Math.PI * 2;
            // Clamp to prevent NaN in acos
            const v = Math.max(-1, Math.min(1, 2 * Math.random() - 1));
            const phi = Math.acos(v);

            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);

            positions[i * 3] = radius * sinPhi * Math.cos(theta);
            positions[i * 3 + 1] = radius * cosPhi;
            positions[i * 3 + 2] = radius * sinPhi * Math.sin(theta);

            const color = starColors[Math.floor(Math.random() * starColors.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        mainStarGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        mainStarGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const mainStarMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: false,
            blending: THREE.AdditiveBlending,
        });

        this.mainStarField = new THREE.Points(mainStarGeometry, mainStarMaterial);
        this.scene.add(this.mainStarField);

        console.log("Robust starfield created");
    }

    createLights() {
        const ambientLight = new THREE.AmbientLight(0x87ceeb, 0.4);
        this.scene.add(ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffd700, 1.5);
        this.directionalLight.position.set(10, 10, 5);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = 2048;
        this.directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(this.directionalLight);

        // Atmospheric point lights
        this.pointLights = [];
        const lightColors = [0xff6347, 0xdaa520, 0x87ceeb, 0xdda0dd];
        const lightPositions = [
            [-8, 8, 8],
            [8, 6, -8],
            [-6, 4, -6],
            [6, 7, 6],
        ];

        lightPositions.forEach((pos, index) => {
            const light = new THREE.PointLight(lightColors[index], 0.8, 25);
            light.position.set(...pos);
            this.pointLights.push(light);
            this.scene.add(light);
        });

        console.log("Lights created");
    }

    createEnvironment() {
        const groundGeometry = new THREE.PlaneGeometry(50, 50, 32, 32);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a2e,
            transparent: true,
            opacity: 0.9,
            shininess: 30,
        });

        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.position.y = -2;
        this.ground.receiveShadow = true;
        this.scene.add(this.ground);

        // Create rangoli pattern
        this.createRangoliPattern();
        console.log("Environment created");
    }

    createRangoliPattern() {
        const rangoliGroup = new THREE.Group();

        for (let ring = 0; ring < 3; ring++) {
            const radius = (ring + 1) * 2.5;
            const segments = (ring + 1) * 12;

            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                const rangoliGeometry = new THREE.CircleGeometry(0.25 - ring * 0.03, 8);
                const rangoliMaterial = new THREE.MeshPhongMaterial({
                    color: ring % 2 === 0 ? 0xdaa520 : 0xff6347,
                    transparent: true,
                    opacity: 0.7,
                    emissive: ring % 2 === 0 ? 0xdaa520 : 0xff6347,
                    emissiveIntensity: 0.1,
                });

                const rangoli = new THREE.Mesh(rangoliGeometry, rangoliMaterial);
                rangoli.rotation.x = -Math.PI / 2;
                rangoli.position.set(x, -1.9, z);
                rangoliGroup.add(rangoli);
            }
        }

        this.scene.add(rangoliGroup);
        this.rangoliGroup = rangoliGroup;
    }

    async loadDurgaIdol() {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load(
                "assets/model/durga.glb",
                (gltf) => {
                    this.idolGroup = new THREE.Group();
                    const model = gltf.scene;

                    // Adaptive scaling
                    const box = new THREE.Box3().setFromObject(model);
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 6 / maxDim;
                    model.scale.setScalar(scale);

                    // Center model
                    box.setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);

                    this.idolGroup.add(model);
                    this.scene.add(this.idolGroup);
                    this.idol = this.idolGroup;

                    // Set frame orbit radius based on model size
                    this.frameOrbitRadius = maxDim * scale * 0.8 + 5;

                    console.log("Durga idol loaded successfully");
                    resolve();
                },
                (progress) => {
                    if (progress.lengthComputable) {
                        // console.log(`Model loading: ${((progress.loaded / progress.total) * 100).toFixed(2)}%`);
                    }
                },
                (error) => {
                    console.warn("GLB model failed to load, creating fallback geometry");
                    this.createFallbackIdol();
                    resolve();
                }
            );
        });
    }

    createFallbackIdol() {
        this.idolGroup = new THREE.Group();

        // Simple geometric representation
        const baseGeometry = new THREE.CylinderGeometry(1.8, 2.2, 0.6, 16);
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0xdaa520,
            shininess: 50,
            emissive: 0xdaa520,
            emissiveIntensity: 0.1,
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -1.5;
        base.castShadow = true;
        this.idolGroup.add(base);

        const bodyGeometry = new THREE.CylinderGeometry(0.9, 1.3, 3.5, 16);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b0000,
            shininess: 60,
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.7;
        body.castShadow = true;
        this.idolGroup.add(body);

        const headGeometry = new THREE.SphereGeometry(0.7, 20, 20);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd4a3,
            shininess: 40,
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 2.8;
        head.castShadow = true;
        this.idolGroup.add(head);

        this.scene.add(this.idolGroup);
        this.idol = this.idolGroup;
        this.frameOrbitRadius = 8;

        console.log("Fallback idol created");
    }

    setupPhotoMemories() {
        this.photoFrames = [];
        const frameCount = 8;
        const orbitRadius = this.frameOrbitRadius || 8;

        // Butterfly canvas for the first frame
        const butterflyCanvas = document.createElement("canvas");
        butterflyCanvas.width = 540;
        butterflyCanvas.height = 690;
        const butterflyCtx = butterflyCanvas.getContext("2d");
        const butterflyTexture = new THREE.CanvasTexture(butterflyCanvas);
        butterflyTexture.minFilter = THREE.LinearFilter;

        let fc = 0;
        // Draw butterfly curve to canvas with color/noise animation
        function drawButterflyToCanvas() {
            const { PI: π, E: e, sin, cos, pow } = Math;
            const ctx = butterflyCtx;
            const W = butterflyCanvas.width,
                H = butterflyCanvas.height;
            ctx.clearRect(0, 0, W, H);

            ctx.save();
            ctx.translate(W / 2, H / 2);
            ctx.scale(7, 7);

            let r,
                x,
                y,
                tempx = 0,
                tempy = 0;
            for (let t = 0; t < 3 * π; t += 0.01) {
                r = pow(e, sin(t)) - 2 * cos(4 * t) + pow(sin((2 * t - π) / 24), 5);
                x = r * cos(t);
                y = -r * sin(t);

                // Colorful animated stroke for the butterfly
                ctx.strokeStyle = `hsl(${(t * 60 + fc) % 360}, 70%, 60%)`;
                ctx.lineWidth = 0.18 + 0.04 * sin(fc / 50);
                ctx.beginPath();
                ctx.moveTo(tempx, tempy);
                ctx.lineTo(x, y);
                ctx.stroke();
                tempx = x;
                tempy = y;
            }
            ctx.restore();
            fc++;
            butterflyTexture.needsUpdate = true;
        }

        // Add the butterfly animation to the render loop
        this._updateButterflyTexture = drawButterflyToCanvas;

        // Create photo frames
        for (let i = 0; i < frameCount; i++) {
            const angle = (i / frameCount) * Math.PI * 2;
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            const frameHeight = 2.5;

            // Frame geometry/material
            const frameGeometry = new THREE.BoxGeometry(2.2, 2.7, 0.15);
            const frameMaterial = new THREE.MeshPhongMaterial({
                color: 0xdaa520,
                shininess: 80,
                emissive: 0xdaa520,
                emissiveIntensity: 0.1,
            });
            const frame = new THREE.Mesh(frameGeometry, frameMaterial);
            frame.position.set(x, frameHeight, z);
            frame.lookAt(0, frameHeight, 0);
            frame.castShadow = false;

            // Photo geometry/material
            let photoGeometry = new THREE.PlaneGeometry(1.8, 2.3);
            let photoMaterial, photo;

            if (i === 0) {
                // Butterfly canvas texture for first frame
                photoMaterial = new THREE.MeshLambertMaterial({
                    map: butterflyTexture,
                    transparent: false,
                    opacity: 1,
                    depthTest: false,
                });
                photo = new THREE.Mesh(photoGeometry, photoMaterial);
            } else {
                // Standard photo for other frames
                photoMaterial = new THREE.MeshLambertMaterial({
                    color: 0xffffff,
                    transparent: false,
                    opacity: 1,
                    depthTest: false,
                });
                photo = new THREE.Mesh(photoGeometry, photoMaterial);

                // Load predefined image
                // const imageNumber = i + 1;
                const imageNumber = i;
                this.loadPhotoTexture(photo, `assets/images/${imageNumber}.jpg`, imageNumber);
            }
            if (photo) {
                photo.userData = {}; // guarantee property exists
                photo.userData.imageNumber = i + 1;
                if (i === 0) {
                    photo.userData.isButterfly = true;
                    photo.userData.butterflyCanvas = butterflyCanvas;
                    photo.userData.clickable = true;
                } else {
                    photo.userData.imagePath = `assets/images/${i + 1}.jpg`;
                    photo.userData.clickable = true;
                }
            }

            photo.position.copy(frame.position);
            photo.position.add(new THREE.Vector3(0, 0, 0.08));
            photo.lookAt(0, frameHeight, 0);
            photo.material.depthTest = false;
            photo.material.depthWrite = false;
            photo.renderOrder = 10;

            const frameData = {
                frame,
                photo,
                angle,
                baseHeight: frameHeight,
                orbitSpeed: 0.002 + Math.random() * 0.001,
                floatOffset: Math.random() * Math.PI * 2,
                floatAmplitude: 0.3 + Math.random() * 0.2,
                imageNumber: i + 1,
            };

            this.photoFrames.push(frameData);
            this.scene.add(frame);
            this.scene.add(photo);
        }

        // Setup mobile gallery if needed
        this.setupMobileGallery();
        console.log("Photo memories setup complete");
    }
    // setupPhotoMemories() {
    //     this.photoFrames = [];
    //     const frameCount = 8;
    //     const orbitRadius = this.frameOrbitRadius || 8;

    //     // Create butterfly offscreen canvas and texture
    //     const butterflyCanvas = document.createElement("canvas");
    //     butterflyCanvas.width = 540;
    //     butterflyCanvas.height = 690;
    //     const butterflyCtx = butterflyCanvas.getContext("2d");
    //     const butterflyTexture = new THREE.CanvasTexture(butterflyCanvas);
    //     butterflyTexture.minFilter = THREE.LinearFilter;

    //     let fc = 0;
    //     // Butterfly drawing function
    //     const drawButterflyToCanvas = () => {
    //         const { PI: π, E: e, sin, cos, pow } = Math;
    //         const ctx = butterflyCtx;
    //         const W = butterflyCanvas.width,
    //             H = butterflyCanvas.height;
    //         ctx.clearRect(0, 0, W, H);

    //         ctx.save();
    //         ctx.translate(W / 2, H / 2);
    //         ctx.scale(7, 7);

    //         let r,
    //             x,
    //             y,
    //             tempx = 0,
    //             tempy = 0;
    //         for (let t = 0; t < 3 * π; t += 0.01) {
    //             r = pow(e, sin(t)) - 2 * cos(4 * t) + pow(sin((2 * t - π) / 24), 5);
    //             x = r * cos(t);
    //             y = -r * sin(t);

    //             ctx.strokeStyle = `hsl(${(t * 60 + fc) % 360}, 70%, 60%)`;
    //             ctx.lineWidth = 0.18 + 0.04 * sin(fc / 50);
    //             ctx.beginPath();
    //             ctx.moveTo(tempx, tempy);
    //             ctx.lineTo(x, y);
    //             ctx.stroke();
    //             tempx = x;
    //             tempy = y;
    //         }
    //         ctx.restore();

    //         fc++;
    //         butterflyTexture.needsUpdate = true;
    //     };

    //     this.updateButterflyTexture = drawButterflyToCanvas;
    //     this.butterflyCanvas = butterflyCanvas; // store for modal

    //     for (let i = 0; i < frameCount; i++) {
    //         const angle = (i / frameCount) * Math.PI * 2;
    //         const x = Math.cos(angle) * orbitRadius;
    //         const z = Math.sin(angle) * orbitRadius;
    //         const frameHeight = 2.5;

    //         const frameGeometry = new THREE.BoxGeometry(2.2, 2.7, 0.15);
    //         const frameMaterial = new THREE.MeshPhongMaterial({
    //             color: 0xdaa520,
    //             shininess: 80,
    //             emissive: 0xdaa520,
    //             emissiveIntensity: 0.1,
    //         });
    //         const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    //         frame.position.set(x, frameHeight, z);
    //         frame.lookAt(0, frameHeight, 0);
    //         frame.castShadow = false;

    //         const photoGeometry = new THREE.PlaneGeometry(1.8, 2.3);
    //         let photoMaterial, photo;

    //         if (i === 0) {
    //             // Use animated butterfly canvas texture
    //             photoMaterial = new THREE.MeshLambertMaterial({
    //                 map: butterflyTexture,
    //                 transparent: false,
    //                 depthTest: false,
    //             });
    //             photo = new THREE.Mesh(photoGeometry, photoMaterial);
    //             photo.userData = {
    //                 isButterfly: true,
    //                 clickable: true,
    //                 imageNumber: i + 1,
    //             };
    //         } else {
    //             photoMaterial = new THREE.MeshLambertMaterial({
    //                 color: 0xffffff,
    //                 transparent: false,
    //                 depthTest: false,
    //             });
    //             photo = new THREE.Mesh(photoGeometry, photoMaterial);
    //             // Load static photo asynchronously
    //             const imageNumber = i + 1;
    //             this.loadPhotoTexture(photo, `assets/images/${imageNumber}.jpg`, imageNumber);
    //             photo.userData = {
    //                 imagePath: `assets/images/${imageNumber}.jpg`,
    //                 clickable: true,
    //                 imageNumber,
    //             };
    //         }

    //         photo.position.copy(frame.position);
    //         photo.position.add(new THREE.Vector3(0, 0, 0.08));
    //         photo.lookAt(0, frameHeight, 0);
    //         photo.material.depthWrite = false;
    //         photo.renderOrder = 10;

    //         this.photoFrames.push({ frame, photo, angle, baseHeight: frameHeight });
    //         this.scene.add(frame);
    //         this.scene.add(photo);
    //     }

    //     this.setupMobileGallery();
    //     console.log("Photo memories setup complete");
    // }

    loadPhotoTexture(photo, imagePath, imageNumber) {
        const loader = new THREE.TextureLoader();
        loader.load(
            imagePath,
            (texture) => {
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                texture.minFilter = THREE.LinearFilter;
                photo.material.map = texture;
                photo.material.needsUpdate = true;

                // Add click handler
                photo.userData = {
                    imageNumber,
                    imagePath,
                    clickable: true,
                };
            },
            undefined,
            (error) => {
                console.warn(`Failed to load image: ${imagePath}`);
                // Use a default colored material
                photo.material.color.setHex(0x444444);
            }
        );
    }

    setupMobileGallery() {
        const galleryImages = document.getElementById("gallery-images");
        if (galleryImages) {
            for (let i = 1; i <= 8; i++) {
                const imageDiv = document.createElement("div");
                imageDiv.className = "gallery-image";

                const img = document.createElement("img");
                img.src = `assets/images/${i}.jpg`;
                img.alt = `Festival Memory ${i}`;
                img.onerror = () => {
                    // Fallback for missing images
                    imageDiv.style.background = "#444";
                    imageDiv.innerHTML = `<span style="color: #888; font-size: 10px;">Image ${i}</span>`;
                };

                imageDiv.appendChild(img);
                imageDiv.addEventListener("click", () => {
                    this.openPhotoModal(`assets/images/${i}.jpg`, i);
                });

                galleryImages.appendChild(imageDiv);
            }
        }
    }

    createAlwaysFallingPetals() {
        this.flowerPetals = [];
        const petalCount = 60;
        const colors = [0xffb6c1, 0xffc0cb, 0xff69b4, 0xffd700, 0xfff8dc, 0xffa500];

        for (let i = 0; i < petalCount; i++) {
            // Create teardrop shape
            const shape = new THREE.Shape();
            shape.moveTo(0, 0);
            shape.quadraticCurveTo(0.15, 0.04, 0.22, 0.35);
            shape.quadraticCurveTo(0.18, 0.75, 0, 1);
            shape.quadraticCurveTo(-0.18, 0.75, -0.22, 0.35);
            shape.quadraticCurveTo(-0.15, 0.04, 0, 0);

            const geometry = new THREE.ShapeGeometry(shape);
            const size = 0.25 + Math.random() * 0.3;
            geometry.scale(size, size, 1);

            const material = new THREE.MeshBasicMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Start above scene
            mesh.position.set((Math.random() - 0.5) * 50, Math.random() * 15 + 20, (Math.random() - 0.5) * 50);

            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            mesh.userData = {
                velocity: new THREE.Vector3((Math.random() - 0.5) * 0.02, -0.008 - Math.random() * 0.012, (Math.random() - 0.5) * 0.02),
                swayAmplitude: Math.random() * 0.02 + 0.008,
                swayFrequency: Math.random() * 1.8 + 1.1,
                rotSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01,
                },
            };

            this.scene.add(mesh);
            this.flowerPetals.push(mesh);
        }

        console.log(`Created ${this.flowerPetals.length} always-falling flower petals`);
    }

    // createEnhancedDiyas() {
    //     this.diyas = [];
    //     const diyaCount = 16;

    //     for (let i = 0; i < diyaCount; i++) {
    //         const angle = (i / diyaCount) * Math.PI * 2;
    //         const radius = 14 + (Math.random() - 0.5) * 2;
    //         const x = Math.cos(angle) * radius;
    //         const z = Math.sin(angle) * radius;

    //         // Diya base
    //         const diyaGeometry = new THREE.CylinderGeometry(0.4, 0.25, 0.12, 16);
    //         const diyaMaterial = new THREE.MeshPhongMaterial({
    //             color: 0x8b4513,
    //             shininess: 30,
    //         });
    //         const diya = new THREE.Mesh(diyaGeometry, diyaMaterial);
    //         diya.position.set(x, -1.88, z);
    //         diya.castShadow = true;

    //         // Flame
    //         const flameGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    //         const flameMaterial = new THREE.MeshBasicMaterial({
    //             color: 0xff6347,
    //             transparent: true,
    //             opacity: 0.9,
    //         });
    //         const flame = new THREE.Mesh(flameGeometry, flameMaterial);
    //         flame.position.set(x, -1.65, z);
    //         flame.scale.y = 2;

    //         // Light
    //         const flameLight = new THREE.PointLight(0xff6347, 1.2, 6);
    //         flameLight.position.set(x, -1.6, z);

    //         const diyaData = {
    //             diya,
    //             flame,
    //             light: flameLight,
    //             baseIntensity: 1.2,
    //             flickerSpeed: 1.5 + Math.random() * 2,
    //             flickerOffset: i * 0.3,
    //         };

    //         this.diyas.push(diyaData);
    //         this.scene.add(diya);
    //         this.scene.add(flame);
    //         this.scene.add(flameLight);
    //     }

    //     console.log("Enhanced diyas created");
    // }

    createEnhancedDiyas() {
        this.diyas = [];
        const diyaCount = 20;

        for (let i = 0; i < diyaCount; i++) {
            const angle = (i / diyaCount) * Math.PI * 2;
            const radius = 15 + (Math.random() - 0.5) * 2; // Increased radius to match photo frames
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const diyaData = this.createEnhancedDiya(x, z, i);
            this.diyas.push(diyaData);
        }

        console.log("Enhanced diyas created");
    }

    createEnhancedDiya(x, z, index) {
        // More detailed diya base
        const diyaGeometry = new THREE.CylinderGeometry(0.4, 0.25, 0.12, 16);
        const diyaMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b4513,
            shininess: 30,
            emissive: 0x2d1810,
            emissiveIntensity: 0.1,
        });

        const diya = new THREE.Mesh(diyaGeometry, diyaMaterial);
        diya.position.set(x, -1.88, z);
        diya.castShadow = true;

        // Enhanced flame with multiple layers
        const flameGroup = new THREE.Group();

        // Inner flame core
        const innerFlameGeometry = new THREE.SphereGeometry(0.08, 8, 8);
        const innerFlameMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff99,
            transparent: true,
            opacity: 0.9,
        });
        const innerFlame = new THREE.Mesh(innerFlameGeometry, innerFlameMaterial);
        innerFlame.scale.y = 2.2;
        flameGroup.add(innerFlame);

        // Outer flame
        const outerFlameGeometry = new THREE.SphereGeometry(0.12, 8, 8);
        const outerFlameMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6347,
            transparent: true,
            opacity: 0.7,
        });
        const outerFlame = new THREE.Mesh(outerFlameGeometry, outerFlameMaterial);
        outerFlame.scale.y = 1.8;
        flameGroup.add(outerFlame);

        flameGroup.position.set(x, -1.65, z);

        // Enhanced point light with warm color
        const flameLight = new THREE.PointLight(0xff6347, 1.2, 6);
        flameLight.position.set(x, -1.6, z);
        flameLight.castShadow = false;

        // Ember particles
        const emberParticles = this.createEmberParticles(x, -1.5, z);

        const diyaData = {
            diya,
            flameGroup,
            innerFlame,
            outerFlame,
            light: flameLight,
            emberParticles,
            baseIntensity: 1.2,
            flickerSpeed: 1.8 + Math.random() * 2.5,
            flickerOffset: index * 0.4,
            baseFlameScale: { inner: 2.2, outer: 1.8 },
        };

        this.scene.add(diya);
        this.scene.add(flameGroup);
        this.scene.add(flameLight);
        this.scene.add(emberParticles);

        return diyaData;
    }

    createEmberParticles(x, y, z) {
        const emberGeometry = new THREE.BufferGeometry();
        const emberCount = 8;
        const positions = new Float32Array(emberCount * 3);
        const colors = new Float32Array(emberCount * 3);

        for (let i = 0; i < emberCount; i++) {
            positions[i * 3] = x + (Math.random() - 0.5) * 0.2;
            positions[i * 3 + 1] = y + Math.random() * 1.5;
            positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.2;

            colors[i * 3] = 1.0; // Red
            colors[i * 3 + 1] = 0.3 + Math.random() * 0.4; // Green
            colors[i * 3 + 2] = 0.0; // Blue
        }

        emberGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        emberGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const emberMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
        });

        return new THREE.Points(emberGeometry, emberMaterial);
    }

    setupEventListeners() {
        window.addEventListener("resize", () => this.onWindowResize());

        // Day navigation
        document.querySelectorAll(".nav-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const day = btn.getAttribute("data-day");
                this.switchDay(day);
            });
        });

        // Controls
        this.addEventListenerSafe("audio-toggle", "click", () => this.toggleAudio());
        this.addEventListenerSafe("camera-preset", "click", () => this.toggleCameraMenu());
        this.addEventListenerSafe("quality-toggle", "click", () => this.toggleQualityPanel());
        this.addEventListenerSafe("fullscreen-toggle", "click", () => this.toggleFullscreen());

        // Camera presets
        document.querySelectorAll(".camera-preset-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const presetIndex = parseInt(btn.getAttribute("data-preset"));
                this.setCameraPreset(presetIndex);
                this.toggleCameraMenu();
            });
        });

        // Quality controls
        document.querySelectorAll('input[name="quality"]').forEach((radio) => {
            radio.addEventListener("change", (e) => {
                this.setQuality(e.target.value);
            });
        });

        // Modal controls
        this.addEventListenerSafe("modal-backdrop", "click", () => this.closeModal());
        this.addEventListenerSafe("modal-close", "click", () => this.closeModal());

        // Canvas click for photo selection
        const canvas = document.getElementById("three-canvas");
        if (canvas) {
            canvas.addEventListener("click", (e) => this.onCanvasClick(e));
        }

        console.log("Event listeners setup complete");
    }

    addEventListenerSafe(elementId, event, callback) {
        const element = document.getElementById(elementId);
        if (element) {
            element.addEventListener(event, callback);
        }
    }

    onCanvasClick(event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        const intersects = raycaster.intersectObjects(
            this.photoFrames.map((f) => f.photo),
            false
        );

        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            // if (intersected.userData.clickable) {
            //     this.openPhotoModal(intersected.userData.imagePath, intersected.userData.imageNumber);
            // }
            if (intersected.userData.clickable) {
                if (intersected.userData.isButterfly) {
                    this.openPhotoModal(intersected.userData.butterflyCanvas, intersected.userData.imageNumber);
                } else {
                    this.openPhotoModal(intersected.userData.imagePath, intersected.userData.imageNumber);
                }
            }
        }
    }

    // openPhotoModal(imageSource, imageNumber) {
    //     const modal = document.getElementById("photo-modal");
    //     const modalImage = document.getElementById("modal-image");
    //     const modalWishTitle = document.getElementById("modal-wish-title");
    //     const modalWishText = document.getElementById("modal-wish-text");

    //     if (modal && modalImage && modalWishTitle && modalWishText) {
    //         // New logic: detect if source is a canvas (butterfly) or image path
    //         if (typeof imageSource === "string") {
    //             // Standard image frame
    //             modalImage.src = imageSource;
    //             modalImage.style.display = "";
    //         } else if (imageSource instanceof HTMLCanvasElement) {
    //             // Butterfly canvas frame
    //             // Show canvas in modal, hide img element
    //             modalImage.style.display = "none";
    //             // Remove old canvas if present
    //             let oldCanvas = document.getElementById("modal-butterfly-canvas");
    //             if (oldCanvas) oldCanvas.remove();
    //             // // Clone butterfly canvas and style it
    //             // let butterflyClone = imageSource.cloneNode(true);
    //             // butterflyClone.id = "modal-butterfly-canvas";
    //             // butterflyClone.style.width = "100%";
    //             // butterflyClone.style.height = "auto";
    //             // modalImage.parentNode.appendChild(butterflyClone);
    //             // Show original canvas directly:
    //             butterflyCanvas.id = "modal-butterfly-canvas"; // ensure id is set
    //             butterflyCanvas.style.width = "100%";
    //             butterflyCanvas.style.height = "auto";
    //             modalImage.parentNode.appendChild(butterflyCanvas);
    //         }

    //         modalWishTitle.textContent = `Festival Memory ${imageNumber}`;
    //         const currentDayData = this.durgaPujaDays.find((day) => day.day === this.currentDay);
    //         if (currentDayData) modalWishText.textContent = currentDayData.wish;

    //         modal.classList.remove("hidden");
    //     }
    // }

    // closeModal() {
    //     const modal = document.getElementById("photo-modal");
    //     if (modal) {
    //         modal.classList.add("hidden");
    //     }
    // }
    openPhotoModal(imageSource, imageNumber) {
        const modal = document.getElementById("photo-modal");
        const modalImage = document.getElementById("modal-image");
        const modalWishTitle = document.getElementById("modal-wish-title");
        const modalWishText = document.getElementById("modal-wish-text");

        if (!modal || !modalImage || !modalWishTitle || !modalWishText) return;

        // Clear any previous modal butterfly canvas
        const oldCanvas = document.getElementById("modal-butterfly-canvas");
        if (oldCanvas) oldCanvas.remove();

        if (typeof imageSource === "string") {
            // Normal photo
            modalImage.src = imageSource;
            modalImage.style.display = "";
        } else if (imageSource instanceof HTMLCanvasElement) {
            // Butterfly canvas, show original canvas, no clone to keep animation
            modalImage.style.display = "none";
            imageSource.id = "modal-butterfly-canvas";
            imageSource.style.width = "100%";
            imageSource.style.height = "auto";
            modalImage.parentNode.appendChild(imageSource);
        }

        modalWishTitle.textContent = `Festival Memory ${imageNumber}`;
        const currentDayData = this.durgaPujaDays.find((day) => day.day === this.currentDay);
        modalWishText.textContent = currentDayData ? currentDayData.wish : "";

        modal.classList.remove("hidden");
    }

    closeModal() {
        const modal = document.getElementById("photo-modal");
        const modalImage = document.getElementById("modal-image");
        const butterflyCanvas = document.getElementById("modal-butterfly-canvas");

        if (modal) modal.classList.add("hidden");

        if (modalImage) modalImage.style.display = "";

        if (butterflyCanvas) {
            // Move butterfly canvas back off-screen to prevent loss of reference
            butterflyCanvas.remove();

            // Append back to offscreen container if needed or keep reference in app
            // For this example assume you have a hidden container div to reattach
            const offscreenContainer = document.getElementById("offscreen-canvas-container");
            if (offscreenContainer) offscreenContainer.appendChild(butterflyCanvas);
        }
    }

    switchDay(day) {
        if (!day) return;

        this.currentDay = day;

        // Update active navigation
        document.querySelectorAll(".nav-btn").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.getAttribute("data-day") === day) {
                btn.classList.add("active");
            }
        });

        // Update wish display
        const dayData = this.durgaPujaDays.find((d) => d.day === day);
        if (dayData) {
            const elements = {
                "wish-day-title": dayData.title,
                "wish-day-bengali": dayData.bengali,
                "wish-message": dayData.wish,
                "wish-description": dayData.description,
            };

            Object.entries(elements).forEach(([id, text]) => {
                const element = document.getElementById(id);
                if (element) element.textContent = text;
            });

            // Add animation
            const wishPanel = document.getElementById("wish-panel");
            if (wishPanel) {
                wishPanel.classList.add("fade-in");
                setTimeout(() => wishPanel.classList.remove("fade-in"), 500);
            }
        }
    }

    toggleAudio() {
        const audioToggle = document.getElementById("audio-toggle");
        const backgroundAudio = document.getElementById("background-audio");

        if (backgroundAudio && audioToggle) {
            if (this.isAudioPlaying) {
                backgroundAudio.pause();
                audioToggle.classList.remove("active");
                this.isAudioPlaying = false;
            } else {
                backgroundAudio.play().catch((error) => {
                    console.log("Audio play failed:", error);
                });
                audioToggle.classList.add("active");
                this.isAudioPlaying = true;
            }
        }
    }

    toggleCameraMenu() {
        const menu = document.getElementById("camera-menu");
        if (menu) {
            menu.classList.toggle("hidden");
        }
    }

    toggleQualityPanel() {
        const panel = document.getElementById("quality-panel");
        const toggle = document.getElementById("quality-toggle");
        if (panel && toggle) {
            panel.classList.toggle("active");
            toggle.classList.toggle("active");
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((error) => {
                console.log("Fullscreen failed:", error);
            });
        } else {
            document.exitFullscreen();
        }
    }

    setCameraPreset(index) {
        if (index < 0 || index >= this.cameraPresets.length) return;

        const preset = this.cameraPresets[index];
        this.camera.position.set(...preset.position);
        this.camera.lookAt(...preset.target);
        this.controls.target.set(...preset.target);
        this.controls.update();
    }

    setQuality(level) {
        this.qualityLevel = level;

        switch (level) {
            case "high":
                this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                this.renderer.shadowMap.enabled = true;
                break;
            case "medium":
                this.renderer.setPixelRatio(1);
                this.renderer.shadowMap.enabled = true;
                break;
            case "low":
                this.renderer.setPixelRatio(0.5);
                this.renderer.shadowMap.enabled = false;
                break;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation updates
    updateStarField() {
        if (this.mainStarField) {
            this.mainStarField.rotation.y += 0.0003;
        }
    }

    updatePhotoFrames() {
        const time = Date.now() * 0.001;

        this.photoFrames.forEach((frameData) => {
            frameData.angle += frameData.orbitSpeed;

            const radius = this.frameOrbitRadius || 8;
            const x = Math.cos(frameData.angle) * radius;
            const z = Math.sin(frameData.angle) * radius;

            const floatY = frameData.baseHeight + Math.sin(time * 1.5 + frameData.floatOffset) * frameData.floatAmplitude;

            frameData.frame.position.set(x, floatY, z);
            frameData.photo.position.set(x, floatY, z + 0.08);

            frameData.frame.lookAt(0, floatY, 0);
            frameData.photo.lookAt(0, floatY, 0);
        });
    }

    updateFallingPetals() {
        const time = Date.now() * 0.001;

        this.flowerPetals.forEach((petal) => {
            // Apply gravity and wind
            petal.position.add(petal.userData.velocity);

            // Swaying motion
            const swayX = Math.sin(time * petal.userData.swayFrequency + petal.position.y) * petal.userData.swayAmplitude;
            const swayZ = Math.cos(time * petal.userData.swayFrequency * 0.7 + petal.position.y) * petal.userData.swayAmplitude;

            petal.position.x += swayX;
            petal.position.z += swayZ;

            // Rotation
            petal.rotation.x += petal.userData.rotSpeed.x;
            petal.rotation.y += petal.userData.rotSpeed.y;
            petal.rotation.z += petal.userData.rotSpeed.z;

            // Reset when fallen
            if (petal.position.y < -3) {
                petal.position.set((Math.random() - 0.5) * 50, Math.random() * 15 + 20, (Math.random() - 0.5) * 50);
                // Reset velocity
                petal.userData.velocity.set((Math.random() - 0.5) * 0.02, -0.008 - Math.random() * 0.012, (Math.random() - 0.5) * 0.02);
            }
        });
    }

    // updateLights() {
    //     const time = Date.now() * 0.001;

    //     // Animate point lights
    //     this.pointLights.forEach((light, index) => {
    //         const offset = index * 0.7;
    //         light.intensity = 0.8 + 0.4 * Math.sin(time * 1.3 + offset);
    //     });

    //     // Animate diya lights
    //     this.diyas.forEach((diyaData) => {
    //         const flicker = Math.sin(time * diyaData.flickerSpeed + diyaData.flickerOffset) * 0.3 + 0.8;
    //         diyaData.light.intensity = diyaData.baseIntensity * flicker;
    //         diyaData.flame.scale.y = 2 + Math.sin(time * 4 + diyaData.flickerOffset) * 0.2;
    //     });
    // }

    updateLights() {
        const time = Date.now() * 0.001;

        // Animate point lights
        this.pointLights.forEach((light, index) => {
            const offset = index * 0.7;
            light.intensity = 0.8 + 0.4 * Math.sin(time * 1.3 + offset);
        });

        // Enhanced diya light animation
        this.diyas.forEach((diyaData) => {
            // Complex flickering
            const flicker = Math.sin(time * diyaData.flickerSpeed + diyaData.flickerOffset) * 0.3 + Math.sin(time * diyaData.flickerSpeed * 1.7 + diyaData.flickerOffset) * 0.1 + 0.8;

            diyaData.light.intensity = diyaData.baseIntensity * flicker;

            // Animate flame scales
            const flameFlicker = Math.sin(time * 5 + diyaData.flickerOffset) * 0.1 + 1;
            diyaData.innerFlame.scale.y = diyaData.baseFlameScale.inner * flameFlicker;
            diyaData.outerFlame.scale.y = diyaData.baseFlameScale.outer * (flameFlicker * 0.9);

            // Animate ember particles
            if (diyaData.emberParticles) {
                const positions = diyaData.emberParticles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(time + i) * 0.005;
                    if (positions[i + 1] > diyaData.light.position.y + 2) {
                        positions[i + 1] = diyaData.light.position.y + 0.1;
                    }
                }
                diyaData.emberParticles.geometry.attributes.position.needsUpdate = true;
            }
        });
    }

    updateIdol() {
        if (!this.idol) return;

        const time = Date.now() * 0.001;
        this.idol.rotation.y = time * 0.05;

        // Animate rangoli
        if (this.rangoliGroup) {
            this.rangoliGroup.rotation.y = time * 0.02;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Call butterfly texture update if exists
        if (typeof this.updateButterflyTexture === "function") {
            this.updateButterflyTexture();
        }

        // Update all systems
        this.updateStarField();
        this.updatePhotoFrames();
        this.updateFallingPetals();
        this.updateLights();
        this.updateIdol();

        if (this.controls) {
            this.controls.update();
        }
        // Render the scene
        this.renderer.render(this.scene, this.camera);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById("loading-screen");
        if (loadingScreen) {
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 1000);
        }

        console.log("Application fully loaded and ready");
    }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, initializing Enhanced Durga Puja experience...");
    new EnhancedDurgaPujaApp();
});
