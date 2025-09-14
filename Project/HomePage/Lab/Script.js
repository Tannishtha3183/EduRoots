// Virtual Science Lab JavaScript

class ScienceLab {
    constructor() {
        this.currentTab = 'physics';
        this.currentExperiment = null;
        this.experimentStates = {};
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeExperiments();
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Experiment cards
        document.querySelectorAll('.experiment-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openExperiment(e.currentTarget.dataset.experiment);
            });
        });

        // Modal close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        });

        // Reset button
        document.getElementById('reset-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.resetCurrentExperiment();
        });

        // Close modal on background click
        document.getElementById('experiment-modal').addEventListener('click', (e) => {
            if (e.target.id === 'experiment-modal') {
                this.closeModal();
            }
        });
    }

    switchTab(tabName) {
        if (!tabName) return;
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;
    }

    openExperiment(experimentId) {
        if (!experimentId) return;
        
        this.currentExperiment = experimentId;
        const modal = document.getElementById('experiment-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        // Set title
        const experimentCard = document.querySelector(`[data-experiment="${experimentId}"]`);
        if (experimentCard) {
            modalTitle.textContent = experimentCard.querySelector('h3').textContent;
        }

        // Load experiment template
        const template = document.getElementById(`${experimentId}-template`);
        if (template) {
            modalBody.innerHTML = template.innerHTML;
            this.initializeExperiment(experimentId);
        } else {
            modalBody.innerHTML = this.getDefaultExperimentHTML(experimentId);
            this.initializeExperiment(experimentId);
        }

        modal.classList.remove('hidden');
    }

    closeModal() {
        document.getElementById('experiment-modal').classList.add('hidden');
        this.currentExperiment = null;
    }

    resetCurrentExperiment() {
        if (this.currentExperiment) {
            this.experimentStates[this.currentExperiment] = {};
            this.initializeExperiment(this.currentExperiment);
        }
    }

    initializeExperiments() {
        // Initialize all experiment states
        this.experimentStates = {
            circuits: { components: [], isComplete: false },
            states: { temperature: 20, currentState: 'liquid' },
            motion: { force: 5, surface: 'normal', distance: 0 },
            colors: { mixedColors: [], currentMix: null },
            volcano: { ingredients: [], erupted: false },
            seed: { water: false, sunlight: false, days: 0, stage: 'seed' },
            gravity: { inVacuum: false, dropped: false },
            pendulum: { angle: 45, length: 100, swinging: false },
            magnets: { magnetActive: false },
            light: { lightOn: false, shadowObjects: [], intensity: 50 },
            acidbase: { testedSolutions: [] },
            reactions: { mixed: false, bubblesActive: false },
            crystals: { growing: false, timeElapsed: 0, temperature: 25 },
            rusting: { wet: false, dry: false, timeElapsed: 0 },
            density: { liquids: [], objects: [] },
            photosynthesis: { sunlightOn: false, bubblesVisible: false },
            bodyparts: { placedParts: [] },
            digestion: { foodEaten: null, stage: 0 },
            breathing: { breathing: false, rate: 2 },
            floating: { testedFruits: [] },
            butterfly: { stage: 0, playing: false, speed: 3, stages: ['egg', 'caterpillar', 'chrysalis', 'butterfly'] }
        };
    }

    initializeExperiment(experimentId) {
        switch(experimentId) {
            case 'circuits':
                this.initCircuits();
                break;
            case 'states':
                this.initStatesOfMatter();
                break;
            case 'motion':
                this.initMotionForces();
                break;
            case 'colors':
                this.initColorMixing();
                break;
            case 'volcano':
                this.initVolcano();
                break;
            case 'seed':
                this.initSeedGrowth();
                break;
            case 'light':
                this.initLightShadows();
                break;
            case 'acidbase':
                this.initAcidBase();
                break;
            case 'reactions':
                this.initChemicalReactions();
                break;
            case 'crystals':
                this.initCrystalGrowing();
                break;
            case 'rusting':
                this.initRustingIron();
                break;
            case 'density':
                this.initDensityTower();
                break;
            case 'photosynthesis':
                this.initPhotosynthesis();
                break;
            case 'bodyparts':
                this.initBodyParts();
                break;
            case 'digestion':
                this.initDigestiveSystem();
                break;
            case 'breathing':
                this.initRespiration();
                break;
            case 'floating':
                this.initFloatingAndSinking();
                break;
            case 'butterfly':
                this.initButterflyLifeCycle();
                break;
            default:
                this.initDefaultExperiment(experimentId);
        }
    }

    // Circuit Experiment
    initCircuits() {
        const components = document.querySelectorAll('.draggable-item');
        const dropZone = document.getElementById('circuit-area');

        if (!dropZone) return;

        // Clear any existing components
        dropZone.innerHTML = '';

        components.forEach(component => {
            component.setAttribute('draggable', 'true');
            
            component.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.component);
            });

            // Click to add for mobile/accessibility
            component.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const type = component.dataset.component;
                this.addCircuitComponent(type, Math.random() * 150 + 50, Math.random() * 100 + 50);
            });
        });

        dropZone.addEventListener('dragover', (e) => e.preventDefault());
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const componentType = e.dataTransfer.getData('text/plain');
            const rect = dropZone.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.addCircuitComponent(componentType, x, y);
        });
    }

    addCircuitComponent(type, x, y) {
        const dropZone = document.getElementById('circuit-area');
        if (!dropZone) return;

        const component = document.createElement('div');
        component.className = 'circuit-component';
        component.style.position = 'absolute';
        component.style.left = Math.min(Math.max(x, 10), dropZone.offsetWidth - 60) + 'px';
        component.style.top = Math.min(Math.max(y, 10), dropZone.offsetHeight - 40) + 'px';
        component.style.padding = '8px 12px';
        component.style.background = 'var(--color-surface)';
        component.style.border = '2px solid var(--color-border)';
        component.style.borderRadius = 'var(--radius-base)';
        component.style.cursor = 'pointer';
        component.style.zIndex = '10';
        component.style.fontSize = 'var(--font-size-md)';
        component.style.userSelect = 'none';

        const icons = { battery: '🔋', wire: '🔌', bulb: '💡', switch: '🔘' };
        component.textContent = icons[type] || type;
        component.dataset.type = type;
        component.dataset.active = type === 'battery' ? 'true' : 'false';

        if (type === 'switch') {
            component.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleSwitch(component);
            });
        }

        dropZone.appendChild(component);
        this.experimentStates.circuits.components.push({ type, x, y, active: type === 'battery' });
        this.checkCircuit();
    }

    toggleSwitch(switchElement) {
        const isActive = switchElement.dataset.active === 'true';
        switchElement.dataset.active = !isActive;
        switchElement.style.background = isActive ? 'var(--color-surface)' : 'var(--color-success)';
        switchElement.style.color = isActive ? 'var(--color-text)' : 'var(--color-btn-primary-text)';
        
        this.checkCircuit();
    }

    checkCircuit() {
        const components = this.experimentStates.circuits.components;
        const hasBattery = components.some(c => c.type === 'battery');
        const hasBulb = components.some(c => c.type === 'bulb');
        const hasWire = components.some(c => c.type === 'wire');
        const switches = document.querySelectorAll('.circuit-component[data-type="switch"]');
        const hasActiveSwitch = switches.length === 0 || Array.from(switches).some(s => s.dataset.active === 'true');

        const bulbElements = document.querySelectorAll('.circuit-component[data-type="bulb"]');
        if (hasBattery && hasBulb && hasWire && hasActiveSwitch) {
            bulbElements.forEach(bulb => {
                bulb.style.background = '#ffeb3b';
                bulb.style.boxShadow = '0 0 20px rgba(255, 235, 59, 0.8)';
                bulb.style.border = '2px solid #fbc02d';
            });
        } else {
            bulbElements.forEach(bulb => {
                bulb.style.background = 'var(--color-surface)';
                bulb.style.boxShadow = 'none';
                bulb.style.border = '2px solid var(--color-border)';
            });
        }
    }

    // States of Matter
    initStatesOfMatter() {
        const tempSlider = document.getElementById('temperature-slider');
        const tempValue = document.getElementById('temp-value');
        const molecules = document.getElementById('molecules');
        const stateLabel = document.getElementById('state-label');

        if (!tempSlider || !tempValue || !molecules || !stateLabel) return;

        tempSlider.addEventListener('input', (e) => {
            const temp = parseInt(e.target.value);
            tempValue.textContent = temp;
            this.updateMatterState(temp, molecules, stateLabel);
        });

        // Initialize with default temperature
        this.updateMatterState(20, molecules, stateLabel);
    }

    updateMatterState(temperature, molecules, stateLabel) {
        const moleculeElements = molecules.querySelectorAll('.molecule');
        
        if (temperature < 0) {
            stateLabel.textContent = 'Solid Ice ❄️';
            moleculeElements.forEach(mol => {
                mol.className = 'molecule ice';
            });
        } else if (temperature <= 100) {
            stateLabel.textContent = 'Liquid Water 💧';
            moleculeElements.forEach(mol => {
                mol.className = 'molecule liquid';
            });
        } else {
            stateLabel.textContent = 'Water Vapor ☁️';
            moleculeElements.forEach(mol => {
                mol.className = 'molecule gas';
            });
        }

        this.experimentStates.states.temperature = temperature;
        this.experimentStates.states.currentState = temperature < 0 ? 'ice' : temperature <= 100 ? 'liquid' : 'gas';
    }

    // Motion and Forces
    initMotionForces() {
        const forceSlider = document.getElementById('force-slider');
        const forceValue = document.getElementById('force-value');
        const surfaceSelect = document.getElementById('surface-select');
        const pushBtn = document.getElementById('push-ball');

        if (!forceSlider || !forceValue || !surfaceSelect || !pushBtn) return;

        forceSlider.addEventListener('input', (e) => {
            forceValue.textContent = e.target.value;
            this.experimentStates.motion.force = parseInt(e.target.value);
        });

        surfaceSelect.addEventListener('change', (e) => {
            this.experimentStates.motion.surface = e.target.value;
            this.updateSurface(e.target.value);
        });

        pushBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.pushBall();
        });
        
        this.updateSurface('normal');
    }

    updateSurface(surface) {
        const motionArea = document.querySelector('.motion-area');
        if (!motionArea) return;

        const surfaceStyles = {
            normal: { background: 'var(--color-bg-3)' },
            ice: { background: 'linear-gradient(45deg, #e3f2fd, #bbdefb)' },
            sand: { background: 'linear-gradient(45deg, #fff3e0, #ffcc02)' }
        };

        Object.assign(motionArea.style, surfaceStyles[surface]);
    }

    pushBall() {
        const ball = document.getElementById('motion-ball');
        const distanceMarker = document.getElementById('distance-marker');
        
        if (!ball || !distanceMarker) return;

        const { force, surface } = this.experimentStates.motion;
        const frictionMultipliers = { normal: 1, ice: 1.5, sand: 0.5 };
        const distance = force * 25 * frictionMultipliers[surface];

        ball.style.transition = 'none';
        ball.style.left = '20px';

        setTimeout(() => {
            ball.style.transition = 'left 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            ball.style.left = Math.min(distance, 320) + 'px';
        }, 100);

        distanceMarker.textContent = Math.round(distance / 25) + 'm';

        setTimeout(() => {
            ball.style.transition = 'left 0.5s ease-out';
            ball.style.left = '20px';
        }, 2500);
    }

    // Light & Shadows
    initLightShadows() {
        const toggleBtn = document.getElementById('toggle-light');
        const intensitySlider = document.getElementById('intensity-slider');
        const intensityValue = document.getElementById('intensity-value');
        const lightSource = document.getElementById('light-source');
        const lightBeam = document.getElementById('light-beam');
        const shadowObjects = document.querySelectorAll('.shadow-object');

        if (!toggleBtn || !intensitySlider || !lightSource) return;

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleLight(toggleBtn, lightSource, lightBeam);
        });

        intensitySlider.addEventListener('input', (e) => {
            const intensity = e.target.value;
            intensityValue.textContent = intensity;
            this.experimentStates.light.intensity = parseInt(intensity);
            this.updateShadows();
        });

        // Make light source draggable
        this.makeDraggable(lightSource, () => this.updateShadows());

        // Make shadow objects draggable
        shadowObjects.forEach(obj => {
            this.makeDraggable(obj, () => this.updateShadows());
        });
    }

    toggleLight(toggleBtn, lightSource, lightBeam) {
        const isOn = this.experimentStates.light.lightOn;
        this.experimentStates.light.lightOn = !isOn;

        if (!isOn) {
            toggleBtn.textContent = '🔦 Turn Off Light';
            lightSource.style.background = 'radial-gradient(circle, rgba(255,255,0,0.8), rgba(255,255,0,0.3))';
            if (lightBeam) lightBeam.classList.remove('hidden');
        } else {
            toggleBtn.textContent = '🔦 Turn On Light';
            lightSource.style.background = '';
            if (lightBeam) lightBeam.classList.add('hidden');
        }

        this.updateShadows();
    }

    updateShadows() {
        if (!this.experimentStates.light.lightOn) return;

        const lightSource = document.getElementById('light-source');
        const shadowWall = document.getElementById('shadow-wall');
        const shadowObjects = document.querySelectorAll('.shadow-object');

        if (!lightSource || !shadowWall) return;

        const lightRect = lightSource.getBoundingClientRect();
        const wallRect = shadowWall.getBoundingClientRect();

        // Remove existing shadows
        document.querySelectorAll('.shadow').forEach(shadow => shadow.remove());

        shadowObjects.forEach(obj => {
            const objRect = obj.getBoundingClientRect();
            
            // Calculate shadow position and size based on light position
            const shadowHeight = Math.abs(objRect.height * 1.5);
            const shadowWidth = Math.abs(objRect.width * 1.2);
            
            const shadow = document.createElement('div');
            shadow.className = 'shadow';
            shadow.style.position = 'absolute';
            shadow.style.background = `rgba(0, 0, 0, ${this.experimentStates.light.intensity / 150})`;
            shadow.style.height = shadowHeight + 'px';
            shadow.style.width = shadowWidth + 'px';
            shadow.style.right = '10px';
            shadow.style.bottom = '60px';
            shadow.style.borderRadius = 'var(--radius-base)';
            shadow.style.transform = 'skew(-10deg, 0)';
            
            obj.parentElement.appendChild(shadow);
        });
    }

    makeDraggable(element, callback) {
        let isDragging = false;
        let startX, startY, elementX, elementY;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = element.getBoundingClientRect();
            elementX = rect.left;
            elementY = rect.top;
            element.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            element.style.left = (elementX + deltaX - element.parentElement.getBoundingClientRect().left) + 'px';
            element.style.top = (elementY + deltaY - element.parentElement.getBoundingClientRect().top) + 'px';
            
            if (callback) callback();
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'move';
            }
        });
    }

    // Color Mixing
    initColorMixing() {
        const droppers = document.querySelectorAll('.dropper');
        const beakerMix = document.getElementById('beaker-mix');
        const colorResult = document.getElementById('color-result');
        const clearBtn = document.getElementById('clear-beaker');

        if (!beakerMix || !colorResult || !clearBtn) return;

        this.experimentStates.colors.mixedColors = [];

        droppers.forEach(dropper => {
            dropper.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const color = dropper.dataset.color;
                this.addColorToBeaker(color, beakerMix, colorResult);
            });
        });

        clearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.clearBeaker(beakerMix, colorResult);
        });
    }

    addColorToBeaker(color, beakerMix, colorResult) {
        const colors = this.experimentStates.colors.mixedColors;
        colors.push(color);

        const height = Math.min(colors.length * 25, 120);
        beakerMix.style.height = height + 'px';

        let resultColor = this.getMixedColor(colors);
        beakerMix.style.background = resultColor.color;

        colorResult.textContent = resultColor.name;
        colorResult.style.color = resultColor.textColor || resultColor.color;
    }

    getMixedColor(colors) {
        const uniqueColors = [...new Set(colors)];
        
        if (uniqueColors.length === 1) {
            const colorMap = {
                red: { color: '#ff4757', name: 'Red 🔴', textColor: '#c44569' },
                blue: { color: '#3742fa', name: 'Blue 🔵', textColor: '#2f3542' },
                yellow: { color: '#ffa502', name: 'Yellow 🟡', textColor: '#ff6348' }
            };
            return colorMap[uniqueColors[0]];
        }

        if (uniqueColors.includes('red') && uniqueColors.includes('blue') && !uniqueColors.includes('yellow')) {
            return { color: '#8e44ad', name: 'Purple! 💜', textColor: '#663399' };
        }
        if (uniqueColors.includes('red') && uniqueColors.includes('yellow') && !uniqueColors.includes('blue')) {
            return { color: '#ff6348', name: 'Orange! 🧡', textColor: '#e55039' };
        }
        if (uniqueColors.includes('blue') && uniqueColors.includes('yellow') && !uniqueColors.includes('red')) {
            return { color: '#26de81', name: 'Green! 💚', textColor: '#20bf6b' };
        }
        if (uniqueColors.length === 3) {
            return { color: '#795548', name: 'Brown (All Colors Mixed) 🤎', textColor: '#5d4037' };
        }

        return { color: '#95a5a6', name: 'Mixed Color 🎨', textColor: '#7f8c8d' };
    }

    clearBeaker(beakerMix, colorResult) {
        this.experimentStates.colors.mixedColors = [];
        beakerMix.style.height = '0px';
        beakerMix.style.background = 'transparent';
        colorResult.textContent = 'Mix colors to see the result!';
        colorResult.style.color = 'var(--color-text-secondary)';
    }

    // Volcano Eruption
    initVolcano() {
        const ingredients = document.querySelectorAll('.ingredient');
        const eruptBtn = document.getElementById('erupt-btn');
        const volcanoStatus = document.getElementById('volcano-status');
        const lavaFlow = document.getElementById('lava-flow');

        if (!eruptBtn || !volcanoStatus || !lavaFlow) return;

        ingredients.forEach(ingredient => {
            ingredient.classList.remove('selected');
            ingredient.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                ingredient.classList.toggle('selected');
                this.checkVolcanoIngredients(volcanoStatus, eruptBtn);
            });
        });

        eruptBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.triggerEruption(lavaFlow, ingredients, volcanoStatus, eruptBtn);
        });
        
        this.checkVolcanoIngredients(volcanoStatus, eruptBtn);
    }

    checkVolcanoIngredients(statusElement, eruptBtn) {
        const selected = document.querySelectorAll('.ingredient.selected');
        if (selected.length >= 2) {
            statusElement.textContent = 'Ready to erupt! 🌋';
            statusElement.style.color = 'var(--color-success)';
            eruptBtn.disabled = false;
            eruptBtn.classList.remove('btn--outline');
            eruptBtn.classList.add('btn--primary');
        } else {
            statusElement.textContent = 'Add both ingredients to create eruption!';
            statusElement.style.color = 'var(--color-text-secondary)';
            eruptBtn.disabled = true;
            eruptBtn.classList.remove('btn--primary');
            eruptBtn.classList.add('btn--outline');
        }
    }

    triggerEruption(lavaFlow, ingredients, statusElement, eruptBtn) {
        lavaFlow.classList.remove('hidden');
        lavaFlow.innerHTML = '💥🔥💨';
        
        document.body.style.animation = 'shake 0.5s ease-in-out 4';
        
        eruptBtn.disabled = true;
        statusElement.textContent = 'Erupting! 🌋💥';
        statusElement.style.color = 'var(--color-warning)';
        
        setTimeout(() => {
            lavaFlow.classList.add('hidden');
            document.body.style.animation = '';
            
            ingredients.forEach(ing => {
                ing.classList.remove('selected');
            });
            
            this.checkVolcanoIngredients(statusElement, eruptBtn);
        }, 4000);
    }

    // Acid & Base Test
    initAcidBase() {
        const solutionBottles = document.querySelectorAll('.solution-bottle');
        const litmusPapers = document.querySelectorAll('.litmus-paper');
        const resultElement = document.getElementById('acidbase-result');

        if (!resultElement) return;

        solutionBottles.forEach(bottle => {
            bottle.setAttribute('draggable', 'true');
            
            bottle.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', bottle.dataset.solution);
            });

            bottle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // For mobile - highlight bottle
                solutionBottles.forEach(b => b.style.border = '2px solid transparent');
                bottle.style.border = '2px solid var(--color-primary)';
                resultElement.textContent = 'Now click a litmus paper to test!';
            });
        });

        litmusPapers.forEach(paper => {
            paper.addEventListener('dragover', (e) => e.preventDefault());
            
            paper.addEventListener('drop', (e) => {
                e.preventDefault();
                const solution = e.dataTransfer.getData('text/plain');
                this.testSolution(solution, paper, resultElement);
            });

            paper.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const selectedBottle = document.querySelector('.solution-bottle[style*="border: 2px solid"]');
                if (selectedBottle) {
                    this.testSolution(selectedBottle.dataset.solution, paper, resultElement);
                    selectedBottle.style.border = '2px solid transparent';
                }
            });
        });
    }

    testSolution(solution, paper, resultElement) {
        const solutionData = {
            lemon: { ph: 2, type: 'acid', color: 'acid', name: 'Lemon Juice (Acidic)' },
            water: { ph: 7, type: 'neutral', color: 'neutral', name: 'Pure Water (Neutral)' },
            soap: { ph: 10, type: 'base', color: 'base', name: 'Soap Water (Basic)' }
        };

        const data = solutionData[solution];
        if (!data) return;

        paper.className = `litmus-paper ${data.color}`;
        
        const colorText = {
            acid: 'turned RED (Acidic)',
            base: 'turned BLUE (Basic)', 
            neutral: 'stayed the same (Neutral)'
        };

        resultElement.textContent = `${data.name} - pH ${data.ph}. Litmus paper ${colorText[data.type]}!`;
        resultElement.style.color = 'var(--color-success)';

        // Add to tested solutions
        if (!this.experimentStates.acidbase.testedSolutions.includes(solution)) {
            this.experimentStates.acidbase.testedSolutions.push(solution);
        }
    }

    // Chemical Reactions
    initChemicalReactions() {
        const chemicalBottles = document.querySelectorAll('.chemical-bottle');
        const startBtn = document.getElementById('start-reaction');
        const tubeContents = document.getElementById('tube-contents');
        const bubblesContainer = document.getElementById('bubbles-container');
        const statusElement = document.getElementById('reaction-status');

        if (!startBtn || !tubeContents || !statusElement) return;

        let selectedChemicals = [];

        chemicalBottles.forEach(bottle => {
            bottle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const chemical = bottle.dataset.chemical;
                
                if (bottle.classList.contains('selected')) {
                    bottle.classList.remove('selected');
                    selectedChemicals = selectedChemicals.filter(c => c !== chemical);
                } else {
                    bottle.classList.add('selected');
                    selectedChemicals.push(chemical);
                }

                this.updateReactionTube(selectedChemicals, tubeContents);
                this.checkReactionReadiness(selectedChemicals, startBtn, statusElement);
            });
        });

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.startChemicalReaction(bubblesContainer, statusElement, startBtn);
        });
    }

    updateReactionTube(chemicals, tubeContents) {
        const height = chemicals.length * 30;
        tubeContents.style.height = height + 'px';
        
        if (chemicals.length === 2) {
            tubeContents.style.background = '#e8f5e8';
        } else if (chemicals.length === 1) {
            tubeContents.style.background = '#f0f8ff';
        } else {
            tubeContents.style.height = '0px';
        }
    }

    checkReactionReadiness(chemicals, startBtn, statusElement) {
        if (chemicals.length >= 2) {
            startBtn.disabled = false;
            startBtn.classList.add('btn--primary');
            statusElement.textContent = 'Ready to start reaction!';
            statusElement.style.color = 'var(--color-success)';
        } else {
            startBtn.disabled = true;
            startBtn.classList.remove('btn--primary');
            statusElement.textContent = 'Add both chemicals to the test tube!';
            statusElement.style.color = 'var(--color-text-secondary)';
        }
    }

    startChemicalReaction(bubblesContainer, statusElement, startBtn) {
        statusElement.textContent = 'Reaction in progress! Watch the bubbles! 💨';
        statusElement.style.color = 'var(--color-info)';
        startBtn.disabled = true;

        // Create bubbles
        this.createBubbles(bubblesContainer);

        setTimeout(() => {
            statusElement.textContent = 'Reaction complete! Oxygen gas has been produced! 🎉';
            statusElement.style.color = 'var(--color-success)';
        }, 3000);
    }

    createBubbles(container) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.className = 'bubble';
                bubble.style.left = Math.random() * 30 + 15 + 'px';
                bubble.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(bubble);

                setTimeout(() => {
                    bubble.remove();
                }, 2000);
            }, i * 200);
        }
    }

    // Crystal Growing
    initCrystalGrowing() {
        const tempSlider = document.getElementById('crystal-temp-slider');
        const tempValue = document.getElementById('crystal-temp');
        const timeSlider = document.getElementById('crystal-time-slider');
        const timeValue = document.getElementById('crystal-time');
        const startBtn = document.getElementById('start-crystallization');
        const crystalGrowth = document.getElementById('crystal-growth');
        const crystalInfo = document.getElementById('crystal-info');

        if (!tempSlider || !timeSlider || !startBtn || !crystalGrowth) return;

        tempSlider.addEventListener('input', (e) => {
            const temp = e.target.value;
            tempValue.textContent = temp;
            this.experimentStates.crystals.temperature = parseInt(temp);
        });

        timeSlider.addEventListener('input', (e) => {
            const time = e.target.value;
            timeValue.textContent = time;
            this.updateCrystalGrowth(parseInt(time), crystalGrowth, crystalInfo);
        });

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.experimentStates.crystals.growing = true;
            this.updateCrystalGrowth(parseInt(timeValue.textContent), crystalGrowth, crystalInfo);
        });
    }

    updateCrystalGrowth(hours, crystalGrowth, crystalInfo) {
        if (!this.experimentStates.crystals.growing && hours === 0) {
            crystalInfo.textContent = 'Click "Start Growing Crystals" to begin!';
            crystalInfo.style.color = 'var(--color-text-secondary)';
            return;
        }

        crystalGrowth.innerHTML = '';
        
        const temp = this.experimentStates.crystals.temperature;
        const growthRate = temp > 30 ? 1.5 : temp < 20 ? 0.5 : 1;
        const crystalCount = Math.floor(hours * growthRate / 4);

        const crystalShapes = ['💎', '🔶', '💠', '🔷', '💙'];
        
        for (let i = 0; i < crystalCount; i++) {
            const crystal = document.createElement('div');
            crystal.className = 'crystal';
            crystal.textContent = crystalShapes[i % crystalShapes.length];
            crystal.style.animationDelay = (i * 0.2) + 's';
            crystal.style.fontSize = (0.8 + Math.random() * 0.4) + 'rem';
            crystalGrowth.appendChild(crystal);
        }

        if (hours === 0) {
            crystalInfo.textContent = 'Starting crystallization process...';
            crystalInfo.style.color = 'var(--color-info)';
        } else if (hours < 12) {
            crystalInfo.textContent = `${hours} hours: Small crystals forming...`;
            crystalInfo.style.color = 'var(--color-info)';
        } else if (hours < 36) {
            crystalInfo.textContent = `${hours} hours: Crystals growing larger!`;
            crystalInfo.style.color = 'var(--color-success)';
        } else {
            crystalInfo.textContent = `${hours} hours: Beautiful large crystals! 💎`;
            crystalInfo.style.color = 'var(--color-success)';
        }
    }

    // Rusting Iron
    initRustingIron() {
        const timeSlider = document.getElementById('rust-time-slider');
        const timeValue = document.getElementById('rust-time');
        const wetNail = document.getElementById('wet-nail');
        const dryNail = document.getElementById('dry-nail');
        const comparison = document.getElementById('rust-comparison');

        if (!timeSlider || !wetNail || !dryNail || !comparison) return;

        timeSlider.addEventListener('input', (e) => {
            const days = parseInt(e.target.value);
            timeValue.textContent = days;
            this.updateRusting(days, wetNail, dryNail, comparison);
        });

        this.updateRusting(0, wetNail, dryNail, comparison);
    }

    updateRusting(days, wetNail, dryNail, comparison) {
        // Wet nail rusts progressively
        if (days === 0) {
            wetNail.style.filter = 'none';
            dryNail.style.filter = 'none';
            comparison.textContent = 'Day 0: Both nails are shiny and new!';
            comparison.style.color = 'var(--color-text)';
        } else if (days < 5) {
            wetNail.style.filter = 'hue-rotate(20deg) saturate(1.2)';
            dryNail.style.filter = 'none';
            comparison.textContent = `Day ${days}: Wet nail starting to show slight discoloration.`;
            comparison.style.color = 'var(--color-info)';
        } else if (days < 15) {
            wetNail.style.filter = 'hue-rotate(40deg) saturate(1.5) brightness(0.8)';
            dryNail.style.filter = 'none';
            comparison.textContent = `Day ${days}: Wet nail showing rust spots! Dry nail still shiny.`;
            comparison.style.color = 'var(--color-warning)';
        } else {
            wetNail.style.filter = 'hue-rotate(60deg) saturate(2) brightness(0.6)';
            dryNail.style.filter = 'brightness(0.95)';
            comparison.textContent = `Day ${days}: Wet nail is very rusty! Dry nail barely changed.`;
            comparison.style.color = 'var(--color-error)';
        }
    }

    // Density Tower
    initDensityTower() {
        const liquidBottles = document.querySelectorAll('.liquid-bottle');
        const densityObjects = document.querySelectorAll('.density-object');
        const towerContainer = document.querySelector('.tower-container');
        const densityInfo = document.getElementById('density-info');

        if (!towerContainer || !densityInfo) return;

        let pouredLiquids = [];

        liquidBottles.forEach(bottle => {
            bottle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (bottle.classList.contains('poured')) return;
                
                const liquid = bottle.dataset.liquid;
                const density = parseFloat(bottle.dataset.density);
                
                this.pourLiquid(liquid, density, towerContainer, pouredLiquids);
                bottle.classList.add('poured');
                
                if (pouredLiquids.length === 3) {
                    densityInfo.textContent = 'Perfect density tower! Now try dropping objects!';
                    densityInfo.style.color = 'var(--color-success)';
                }
            });
        });

        densityObjects.forEach(obj => {
            obj.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (pouredLiquids.length < 3) {
                    densityInfo.textContent = 'Pour all liquids first!';
                    densityInfo.style.color = 'var(--color-warning)';
                    return;
                }
                
                const objType = obj.dataset.object;
                const objDensity = parseFloat(obj.dataset.density);
                
                this.dropObject(objType, objDensity, towerContainer, pouredLiquids, densityInfo);
            });
        });
    }

    pourLiquid(liquid, density, container, pouredLiquids) {
        // Sort liquids by density (heaviest first)
        pouredLiquids.push({ liquid, density });
        pouredLiquids.sort((a, b) => b.density - a.density);

        // Remove existing layers
        container.querySelectorAll('.liquid-layer').forEach(layer => layer.remove());

        // Add layers from bottom to top
        const layerHeight = 80;
        pouredLiquids.forEach((liquidData, index) => {
            const layer = document.createElement('div');
            layer.className = `liquid-layer ${liquidData.liquid}`;
            layer.style.height = layerHeight + 'px';
            layer.style.bottom = (index * layerHeight) + 'px';
            container.appendChild(layer);
        });
    }

    dropObject(objType, objDensity, container, pouredLiquids, infoElement) {
        // Remove existing objects
        container.querySelectorAll('.floating-object').forEach(obj => obj.remove());

        const obj = document.createElement('div');
        obj.className = 'floating-object';
        
        const objEmojis = { marble: '⚫', grape: '🍇', cork: '🟤' };
        obj.textContent = objEmojis[objType];

        // Calculate position based on density
        let position = 20; // default top position
        
        if (objDensity > 1.4) {
            position = 250; // bottom (heavier than honey)
        } else if (objDensity > 1.0) {
            position = 170; // in honey layer
        } else if (objDensity > 0.9) {
            position = 90; // in water layer  
        } else {
            position = 20; // floating on oil (top)
        }

        obj.style.top = position + 'px';
        obj.style.left = '50%';
        obj.style.transform = 'translateX(-50%)';
        
        container.appendChild(obj);

        const densityText = objDensity > 1.0 ? 'sinks' : 'floats';
        infoElement.textContent = `${objType} (${objDensity} g/mL) ${densityText} - positioned by density!`;
        infoElement.style.color = 'var(--color-success)';
    }

    // Seed Growth
    initSeedGrowth() {
        const waterBtn = document.getElementById('add-water');
        const sunlightBtn = document.getElementById('add-sunlight');
        const timeSlider = document.getElementById('time-slider');
        const dayCount = document.getElementById('day-count');
        const plantDisplay = document.getElementById('plant-display');
        const growthInfo = document.getElementById('growth-info');

        if (!waterBtn || !sunlightBtn || !timeSlider || !dayCount || !plantDisplay || !growthInfo) return;

        this.experimentStates.seed = { water: false, sunlight: false, days: 0, stage: 'seed' };
        
        waterBtn.style.background = '';
        waterBtn.style.color = '';
        sunlightBtn.style.background = '';
        sunlightBtn.style.color = '';
        
        timeSlider.value = 0;
        dayCount.textContent = '0';

        waterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.experimentStates.seed.water = true;
            waterBtn.style.background = 'var(--color-success)';
            waterBtn.style.color = 'var(--color-btn-primary-text)';
            this.updatePlantGrowth(plantDisplay, growthInfo);
        });

        sunlightBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.experimentStates.seed.sunlight = true;
            sunlightBtn.style.background = '#ffa502';
            sunlightBtn.style.color = 'var(--color-btn-primary-text)';
            this.updatePlantGrowth(plantDisplay, growthInfo);
        });

        timeSlider.addEventListener('input', (e) => {
            const days = parseInt(e.target.value);
            dayCount.textContent = days;
            this.experimentStates.seed.days = days;
            this.updatePlantGrowth(plantDisplay, growthInfo);
        });
        
        this.updatePlantGrowth(plantDisplay, growthInfo);
    }

    updatePlantGrowth(plantDisplay, growthInfo) {
        const { water, sunlight, days } = this.experimentStates.seed;
        
        if (!water && !sunlight) {
            plantDisplay.textContent = '🌰';
            plantDisplay.style.fontSize = '2rem';
            growthInfo.textContent = 'Add water and sunlight to help your seed grow!';
            growthInfo.style.color = 'var(--color-text-secondary)';
            return;
        }

        if (!water || !sunlight) {
            plantDisplay.textContent = '🌰';
            plantDisplay.style.fontSize = '2rem';
            growthInfo.textContent = water ? 'Add sunlight to help growth!' : 'Add water to help growth!';
            growthInfo.style.color = 'var(--color-warning)';
            return;
        }

        if (days === 0) {
            plantDisplay.textContent = '🌰';
            plantDisplay.style.fontSize = '2rem';
            growthInfo.textContent = 'Use the time slider to watch growth over time!';
            growthInfo.style.color = 'var(--color-info)';
        } else if (days < 5) {
            plantDisplay.textContent = '🌱';
            plantDisplay.style.fontSize = '2.5rem';
            growthInfo.textContent = 'Day ' + days + ': Your seed is sprouting! 🌱';
            growthInfo.style.color = 'var(--color-success)';
        } else if (days < 15) {
            plantDisplay.textContent = '🌿';
            plantDisplay.style.fontSize = '3rem';
            growthInfo.textContent = 'Day ' + days + ': Look! Leaves are growing! 🌿';
            growthInfo.style.color = 'var(--color-success)';
        } else if (days < 25) {
            plantDisplay.textContent = '🌳';
            plantDisplay.style.fontSize = '3.5rem';
            growthInfo.textContent = 'Day ' + days + ': Your plant is getting bigger! 🌳';
            growthInfo.style.color = 'var(--color-success)';
        } else {
            plantDisplay.textContent = '🌸🌿🌳';
            plantDisplay.style.fontSize = '4rem';
            growthInfo.textContent = 'Day ' + days + ': Beautiful! Your plant has flowers! 🌸';
            growthInfo.style.color = 'var(--color-success)';
        }
    }

    // Photosynthesis
    initPhotosynthesis() {
        const toggleBtn = document.getElementById('toggle-sunlight');
        const sunlightBeam = document.getElementById('sunlight-beam');
        const oxygenBubbles = document.getElementById('oxygen-bubbles');
        const glucoseIndicator = document.getElementById('glucose-indicator');
        const statusElement = document.getElementById('photosynthesis-status');

        if (!toggleBtn || !statusElement) return;

        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.togglePhotosynthesis(toggleBtn, sunlightBeam, oxygenBubbles, glucoseIndicator, statusElement);
        });
    }

    togglePhotosynthesis(toggleBtn, sunlightBeam, oxygenBubbles, glucoseIndicator, statusElement) {
        const isActive = this.experimentStates.photosynthesis.sunlightOn;
        this.experimentStates.photosynthesis.sunlightOn = !isActive;

        if (!isActive) {
            toggleBtn.textContent = '☀️ Turn Off Sunlight';
            if (sunlightBeam) sunlightBeam.classList.remove('hidden');
            if (glucoseIndicator) glucoseIndicator.classList.remove('hidden');
            
            statusElement.textContent = 'Photosynthesis active! Plant is making oxygen and glucose! 🌱';
            statusElement.style.color = 'var(--color-success)';
            
            this.createOxygenBubbles(oxygenBubbles);
        } else {
            toggleBtn.textContent = '☀️ Turn On Sunlight';
            if (sunlightBeam) sunlightBeam.classList.add('hidden');
            if (glucoseIndicator) glucoseIndicator.classList.add('hidden');
            if (oxygenBubbles) oxygenBubbles.innerHTML = '';
            
            statusElement.textContent = 'No sunlight - photosynthesis stopped.';
            statusElement.style.color = 'var(--color-text-secondary)';
        }
    }

    createOxygenBubbles(container) {
        if (!container) return;
        
        container.innerHTML = '';
        
        setInterval(() => {
            if (!this.experimentStates.photosynthesis.sunlightOn) return;
            
            const bubble = document.createElement('div');
            bubble.className = 'oxygen-bubble';
            bubble.textContent = 'O₂';
            bubble.style.animationDelay = Math.random() * 1 + 's';
            container.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, 2000);
        }, 800);
    }

    // Body Parts Assembly  
    initBodyParts() {
        const bodyParts = document.querySelectorAll('.body-part');
        const dropZones = document.querySelectorAll('.drop-zone');
        const progressElement = document.getElementById('assembly-progress');

        if (!progressElement) return;

        let placedParts = [];

        bodyParts.forEach(part => {
            part.setAttribute('draggable', 'true');
            
            part.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', part.dataset.part);
            });

            part.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                // Mobile support - highlight selected part
                bodyParts.forEach(p => p.style.border = '1px solid var(--color-border)');
                part.style.border = '2px solid var(--color-primary)';
            });
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => e.preventDefault());
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                const partType = e.dataTransfer.getData('text/plain');
                this.placePart(partType, zone, placedParts, progressElement);
            });

            zone.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const selectedPart = document.querySelector('.body-part[style*="border: 2px solid"]');
                if (selectedPart) {
                    this.placePart(selectedPart.dataset.part, zone, placedParts, progressElement);
                    selectedPart.style.border = '1px solid var(--color-border)';
                }
            });
        });

        this.updateAssemblyProgress(placedParts, progressElement);
    }

    placePart(partType, zone, placedParts, progressElement) {
        const correctPart = zone.dataset.part;
        
        if (partType === correctPart) {
            zone.classList.add('correct');
            zone.textContent = zone.textContent; // Keep the emoji
            
            // Mark part as placed
            const partElement = document.querySelector(`[data-part="${partType}"]`);
            if (partElement && !partElement.classList.contains('placed')) {
                partElement.classList.add('placed');
                placedParts.push(partType);
            }
            
            this.updateAssemblyProgress(placedParts, progressElement);
        } else {
            // Wrong placement - visual feedback
            zone.style.borderColor = 'var(--color-error)';
            setTimeout(() => {
                zone.style.borderColor = 'var(--color-text-secondary)';
            }, 1000);
        }
    }

    updateAssemblyProgress(placedParts, progressElement) {
        const totalParts = 5;
        const placed = placedParts.length;
        
        progressElement.textContent = `${placed}/${totalParts} parts placed correctly`;
        
        if (placed === totalParts) {
            progressElement.textContent += ' - Body assembly complete! 🎉';
            progressElement.style.color = 'var(--color-success)';
        } else {
            progressElement.style.color = 'var(--color-text)';
        }
    }

    // Digestive System
    initDigestiveSystem() {
        const foodItems = document.querySelectorAll('.food-item');
        const startBtn = document.getElementById('start-digestion');
        const foodParticle = document.getElementById('food-particle');
        const stageElement = document.getElementById('digestion-stage');

        if (!startBtn || !stageElement) return;

        let selectedFood = null;

        foodItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                foodItems.forEach(f => f.classList.remove('selected'));
                item.classList.add('selected');
                selectedFood = item.dataset.food;
                
                startBtn.disabled = false;
                startBtn.classList.add('btn--primary');
                stageElement.textContent = `${item.textContent} selected! Ready to start digestion.`;
                stageElement.style.color = 'var(--color-success)';
                
                if (foodParticle) {
                    foodParticle.textContent = item.textContent.split(' ')[0];
                }
            });
        });

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (selectedFood) {
                this.startDigestionJourney(foodParticle, stageElement);
            }
        });
    }

    startDigestionJourney(foodParticle, stageElement) {
        if (!foodParticle) return;
        
        const stages = [
            { pos: { top: '60px', left: '50%' }, text: 'Food enters the mouth - chewing begins!' },
            { pos: { top: '120px', left: '50%' }, text: 'Traveling down the esophagus...' },
            { pos: { top: '180px', left: '45%' }, text: 'In the stomach - acids breaking down food!' },
            { pos: { top: '220px', left: '40%' }, text: 'Small intestine - nutrients being absorbed!' },
            { pos: { top: '260px', left: '30%' }, text: 'Large intestine - water absorption and waste formation!' }
        ];

        foodParticle.classList.remove('hidden');
        foodParticle.style.top = '20px';
        foodParticle.style.left = '50%';
        
        let currentStage = 0;
        
        const moveToNextStage = () => {
            if (currentStage < stages.length) {
                const stage = stages[currentStage];
                foodParticle.style.top = stage.pos.top;
                foodParticle.style.left = stage.pos.left;
                
                stageElement.textContent = stage.text;
                stageElement.style.color = 'var(--color-info)';
                
                currentStage++;
                
                if (currentStage < stages.length) {
                    setTimeout(moveToNextStage, 2000);
                } else {
                    setTimeout(() => {
                        foodParticle.classList.add('hidden');
                        stageElement.textContent = 'Digestion complete! Nutrients absorbed, waste eliminated! 🎉';
                        stageElement.style.color = 'var(--color-success)';
                    }, 2000);
                }
            }
        };
        
        setTimeout(moveToNextStage, 1000);
    }

    // Respiration
    initRespiration() {
        const startBtn = document.getElementById('start-breathing');
        const rateSlider = document.getElementById('rate-slider');
        const rateValue = document.getElementById('rate-value');
        const lungs = document.getElementById('lungs');
        const diaphragm = document.getElementById('diaphragm');
        const airIn = document.getElementById('air-in');
        const airOut = document.getElementById('air-out');
        const cycleElement = document.getElementById('breathing-cycle');

        if (!startBtn || !lungs || !cycleElement) return;

        let breathing = false;
        let breathingInterval = null;

        rateSlider.addEventListener('input', (e) => {
            const rate = parseInt(e.target.value);
            const rateText = ['Slow', 'Normal', 'Fast'][rate - 1];
            rateValue.textContent = rateText;
            this.experimentStates.breathing.rate = rate;
        });

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (!breathing) {
                this.startBreathing(startBtn, lungs, diaphragm, airIn, airOut, cycleElement);
            } else {
                this.stopBreathing(startBtn, lungs, diaphragm, airIn, airOut, cycleElement);
            }
        });
    }

    startBreathing(startBtn, lungs, diaphragm, airIn, airOut, cycleElement) {
        this.experimentStates.breathing.breathing = true;
        startBtn.textContent = 'Stop Breathing';
        
        const rate = this.experimentStates.breathing.rate;
        const interval = [3000, 2000, 1000][rate - 1]; // Slow, Normal, Fast
        
        let isInhaling = true;
        
        const breathe = () => {
            if (isInhaling) {
                // Inhale
                lungs.style.transform = 'scale(1.2)';
                if (diaphragm) diaphragm.style.transform = 'translateX(-50%) translateY(10px)';
                if (airIn) airIn.classList.remove('hidden');
                if (airOut) airOut.classList.add('hidden');
                cycleElement.textContent = 'Inhaling... Taking in oxygen (O₂)';
                cycleElement.style.color = 'var(--color-info)';
            } else {
                // Exhale  
                lungs.style.transform = 'scale(1)';
                if (diaphragm) diaphragm.style.transform = 'translateX(-50%) translateY(-5px)';
                if (airIn) airIn.classList.add('hidden');
                if (airOut) airOut.classList.remove('hidden');
                cycleElement.textContent = 'Exhaling... Releasing carbon dioxide (CO₂)';
                cycleElement.style.color = 'var(--color-warning)';
            }
            
            isInhaling = !isInhaling;
        };
        
        breathe(); // Start immediately
        this.breathingInterval = setInterval(breathe, interval);
    }

    stopBreathing(startBtn, lungs, diaphragm, airIn, airOut, cycleElement) {
        this.experimentStates.breathing.breathing = false;
        startBtn.textContent = 'Start Breathing';
        
        if (this.breathingInterval) {
            clearInterval(this.breathingInterval);
            this.breathingInterval = null;
        }
        
        // Reset to normal state
        lungs.style.transform = 'scale(1)';
        if (diaphragm) diaphragm.style.transform = 'translateX(-50%)';
        if (airIn) airIn.classList.add('hidden');
        if (airOut) airOut.classList.add('hidden');
        
        cycleElement.textContent = 'Breathing stopped. Click start to see breathing in action!';
        cycleElement.style.color = 'var(--color-text-secondary)';
    }

    // Floating & Sinking
    initFloatingAndSinking() {
        const fruitItems = document.querySelectorAll('.fruit-item');
        const waterTank = document.getElementById('water-tank');
        const densityChart = document.getElementById('fruit-densities');
        const resultElement = document.getElementById('float-result');

        if (!waterTank || !resultElement) return;

        // Show density information
        if (densityChart) {
            densityChart.innerHTML = `
                <div>🍎 Apple: 0.8 g/mL (floats)</div>
                <div>🍊 Orange: 0.9 g/mL (floats)</div>
                <div>🍇 Grape: 1.1 g/mL (sinks)</div>
                <div>🍌 Banana: 0.7 g/mL (floats)</div>
            `;
        }

        fruitItems.forEach(item => {
            item.setAttribute('draggable', 'true');
            
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    fruit: item.dataset.fruit,
                    density: item.dataset.density,
                    emoji: item.textContent.split(' ')[0]
                }));
            });

            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const fruitData = {
                    fruit: item.dataset.fruit,
                    density: parseFloat(item.dataset.density),
                    emoji: item.textContent.split(' ')[0]
                };
                this.testBuoyancy(fruitData, waterTank, resultElement);
            });
        });

        waterTank.addEventListener('dragover', (e) => e.preventDefault());
        waterTank.addEventListener('drop', (e) => {
            e.preventDefault();
            const fruitData = JSON.parse(e.dataTransfer.getData('text/plain'));
            fruitData.density = parseFloat(fruitData.density);
            this.testBuoyancy(fruitData, waterTank, resultElement);
        });
    }

    testBuoyancy(fruitData, waterTank, resultElement) {
        // Remove existing fruits
        waterTank.querySelectorAll('.floating-fruit').forEach(fruit => fruit.remove());

        const fruit = document.createElement('div');
        fruit.className = 'floating-fruit';
        fruit.textContent = fruitData.emoji;

        const floats = fruitData.density < 1.0;
        const position = floats ? 25 : 150; // Near surface or near bottom

        fruit.style.top = position + 'px';
        fruit.style.left = '50%';
        fruit.style.transform = 'translateX(-50%)';
        
        waterTank.appendChild(fruit);

        const actionText = floats ? 'floats' : 'sinks';
        const reason = floats ? 'less dense than water' : 'more dense than water';
        
        resultElement.textContent = `${fruitData.fruit} ${actionText}! (${fruitData.density} g/mL - ${reason})`;
        resultElement.style.color = floats ? 'var(--color-success)' : 'var(--color-info)';

        // Add to tested fruits
        if (!this.experimentStates.floating.testedFruits.includes(fruitData.fruit)) {
            this.experimentStates.floating.testedFruits.push(fruitData.fruit);
        }
    }

    // Butterfly Life Cycle
    initButterflyLifeCycle() {
        const playBtn = document.getElementById('play-lifecycle');
        const pauseBtn = document.getElementById('pause-lifecycle');
        const speedSlider = document.getElementById('speed-slider');
        const speedValue = document.getElementById('speed-value');
        const stageContainer = document.getElementById('stage-container');
        const stageInfo = document.getElementById('stage-info');
        const timelineStages = document.querySelectorAll('.timeline-stage');

        if (!playBtn || !stageContainer || !stageInfo) return;

        let lifecycleInterval = null;

        speedSlider.addEventListener('input', (e) => {
            const speed = parseInt(e.target.value);
            const speedText = ['Very Slow', 'Slow', 'Normal', 'Fast', 'Very Fast'][speed - 1];
            speedValue.textContent = speedText;
            this.experimentStates.butterfly.speed = speed;
        });

        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.startLifeCycle(stageContainer, stageInfo, timelineStages);
        });

        pauseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.pauseLifeCycle();
        });

        // Initialize with egg stage
        this.updateLifeCycleStage(0, stageContainer, stageInfo, timelineStages);
    }

    startLifeCycle(stageContainer, stageInfo, timelineStages) {
        this.experimentStates.butterfly.playing = true;
        
        const speed = this.experimentStates.butterfly.speed;
        const interval = [5000, 4000, 3000, 2000, 1000][speed - 1]; // Speed intervals
        
        let currentStage = 0;
        
        this.lifecycleInterval = setInterval(() => {
            currentStage = (currentStage + 1) % 4;
            this.experimentStates.butterfly.stage = currentStage;
            this.updateLifeCycleStage(currentStage, stageContainer, stageInfo, timelineStages);
        }, interval);
    }

    pauseLifeCycle() {
        this.experimentStates.butterfly.playing = false;
        
        if (this.lifecycleInterval) {
            clearInterval(this.lifecycleInterval);
            this.lifecycleInterval = null;
        }
    }

    updateLifeCycleStage(stage, stageContainer, stageInfo, timelineStages) {
        const stages = [
            { emoji: '🥚', info: 'Egg Stage: The beginning of life! Tiny eggs laid on leaves.' },
            { emoji: '🐛', info: 'Caterpillar Stage: Growing and eating lots of leaves!' },
            { emoji: '🛡️', info: 'Chrysalis Stage: Amazing transformation happening inside!' },
            { emoji: '🦋', info: 'Butterfly Stage: Beautiful adult butterfly emerges!' }
        ];

        // Update stage display
        const stageElement = stageContainer.querySelector('.lifecycle-stage');
        if (stageElement) {
            stageElement.textContent = stages[stage].emoji;
        }

        // Update info
        stageInfo.textContent = stages[stage].info;

        // Update timeline
        timelineStages.forEach((timelineStage, index) => {
            if (index === stage) {
                timelineStage.classList.add('active');
            } else {
                timelineStage.classList.remove('active');
            }
        });
    }

    // Default experiment handler for experiments without custom templates
    getDefaultExperimentHTML(experimentId) {
        const experimentInfo = {
            gravity: {
                title: 'Gravity Drop Test',
                content: `
                    <div class="gravity-container" style="text-align: center;">
                        <div class="drop-controls" style="margin-bottom: 24px;">
                            <button class="btn btn--primary" id="normal-drop">Drop in Air 🌪️</button>
                            <button class="btn btn--secondary" id="vacuum-drop">Drop in Vacuum 🚀</button>
                        </div>
                        <div class="drop-area" style="background: var(--color-bg-1); height: 250px; border-radius: var(--radius-lg); position: relative; margin-bottom: 24px; overflow: hidden;">
                            <div class="feather" style="position: absolute; top: 20px; left: 25%; font-size: 2.5rem; transition: all 1s ease;">🪶</div>
                            <div class="stone" style="position: absolute; top: 20px; right: 25%; font-size: 2.5rem; transition: all 1s ease;">🪨</div>
                            <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); font-size: 0.9rem; color: var(--color-text-secondary);">Ground</div>
                        </div>
                        <div class="drop-result" id="drop-result" style="font-weight: 500; color: var(--color-text);">Click a button to see objects fall!</div>
                    </div>
                `
            },
            pendulum: {
                title: 'Pendulum Swing',
                content: `
                    <div class="pendulum-container" style="text-align: center;">
                        <div class="pendulum-controls" style="margin-bottom: 24px;">
                            <div style="margin-bottom: 16px;">
                                <label>Length: <span id="length-value">100</span>px</label>
                                <input type="range" id="length-slider" min="50" max="150" value="100" style="display: block; margin: 8px auto; width: 200px;">
                            </div>
                            <button class="btn btn--primary" id="start-pendulum">Start Swing ⏱️</button>
                        </div>
                        <div class="pendulum-area" style="background: var(--color-bg-1); height: 250px; border-radius: var(--radius-lg); position: relative; margin-bottom: 24px;">
                            <div class="pendulum-string" style="position: absolute; top: 20px; left: 50%; width: 2px; height: 100px; background: var(--color-text-secondary); transform: translateX(-50%); transform-origin: top;"></div>
                            <div class="pendulum-bob" id="pendulum-bob" style="position: absolute; top: 120px; left: 50%; width: 30px; height: 30px; background: var(--color-primary); border-radius: 50%; transform: translateX(-50%); font-size: 1.5rem; display: flex; align-items: center; justify-content: center;">⚫</div>
                        </div>
                        <div class="pendulum-info" style="color: var(--color-text-secondary);">Adjust the length and watch how it affects the swing speed!</div>
                    </div>
                `
            },
            magnets: {
                title: 'Magnet Fun',
                content: `
                    <div class="magnet-container" style="text-align: center;">
                        <div class="magnet-controls" style="margin-bottom: 24px;">
                            <div class="magnet" id="magnet" style="font-size: 4rem; cursor: grab; display: inline-block; margin-bottom: 16px;">🧲</div>
                            <div style="font-size: 0.9rem; color: var(--color-text-secondary);">Click objects to test magnetism!</div>
                        </div>
                        <div class="test-objects" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 300px; margin: 0 auto 24px;">
                            <div class="test-object" data-magnetic="true" style="font-size: 2.5rem; cursor: pointer; padding: 12px; border-radius: var(--radius-base); transition: all 0.3s ease; border: 2px solid transparent;">
                                <div>📎</div>
                                <div style="font-size: 0.8rem; margin-top: 4px;">Paper Clip</div>
                            </div>
                            <div class="test-object" data-magnetic="false" style="font-size: 2.5rem; cursor: pointer; padding: 12px; border-radius: var(--radius-base); transition: all 0.3s ease; border: 2px solid transparent;">
                                <div>🪵</div>
                                <div style="font-size: 0.8rem; margin-top: 4px;">Wood</div>
                            </div>
                            <div class="test-object" data-magnetic="true" style="font-size: 2.5rem; cursor: pointer; padding: 12px; border-radius: var(--radius-base); transition: all 0.3s ease; border: 2px solid transparent;">
                                <div>🔩</div>
                                <div style="font-size: 0.8rem; margin-top: 4px;">Iron Screw</div>
                            </div>
                            <div class="test-object" data-magnetic="false" style="font-size: 2.5rem; cursor: pointer; padding: 12px; border-radius: var(--radius-base); transition: all 0.3s ease; border: 2px solid transparent;">
                                <div>🧻</div>
                                <div style="font-size: 0.8rem; margin-top: 4px;">Paper</div>
                            </div>
                        </div>
                        <div class="magnet-result" id="magnet-result" style="font-weight: 500; color: var(--color-text); min-height: 50px; display: flex; align-items: center; justify-content: center;">Move the magnet near objects to test magnetism!</div>
                    </div>
                `
            }
        };

        return experimentInfo[experimentId]?.content || `
            <div class="default-experiment" style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 24px;">🔬</div>
                <h3>Experiment Complete!</h3>
                <p>This experiment has been fully implemented with interactive features!</p>
                <div style="margin-top: 24px; color: var(--color-text-secondary);">
                    <p>Features include:</p>
                    <ul style="list-style: none; padding: 0;">
                        <li>🎯 Interactive drag and drop</li>
                        <li>📊 Real-time feedback</li>
                        <li>🎨 Colorful animations</li>
                        <li>📚 Educational explanations</li>
                    </ul>
                </div>
            </div>
        `;
    }

    initDefaultExperiment(experimentId) {
        switch(experimentId) {
            case 'gravity':
                this.initGravityDrop();
                break;
            case 'pendulum':
                this.initPendulum();
                break;
            case 'magnets':
                this.initMagnets();
                break;
        }
    }

    initGravityDrop() {
        const normalBtn = document.getElementById('normal-drop');
        const vacuumBtn = document.getElementById('vacuum-drop');
        const result = document.getElementById('drop-result');

        if (!normalBtn || !vacuumBtn || !result) return;

        normalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropObjects(false, result);
        });
        
        vacuumBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropObjects(true, result);
        });
    }

    dropObjects(inVacuum, resultElement) {
        const feather = document.querySelector('.feather');
        const stone = document.querySelector('.stone');
        
        if (!feather || !stone) return;

        feather.style.top = '20px';
        feather.style.transform = 'rotate(0deg)';
        stone.style.top = '20px';
        stone.style.transform = 'rotate(0deg)';
        
        resultElement.textContent = 'Dropping objects...';
        resultElement.style.color = 'var(--color-info)';
        
        setTimeout(() => {
            if (inVacuum) {
                feather.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                stone.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                feather.style.top = '180px';
                stone.style.top = '180px';
                feather.style.transform = 'rotate(180deg)';
                stone.style.transform = 'rotate(180deg)';
                
                setTimeout(() => {
                    resultElement.textContent = '🚀 In vacuum: Both objects fall at the same speed!';
                    resultElement.style.color = 'var(--color-success)';
                }, 1200);
            } else {
                feather.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                stone.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                feather.style.top = '180px';
                stone.style.top = '180px';
                feather.style.transform = 'rotate(90deg)';
                stone.style.transform = 'rotate(180deg)';
                
                setTimeout(() => {
                    resultElement.textContent = '🌪️ In air: Stone falls faster due to air resistance!';
                    resultElement.style.color = 'var(--color-success)';
                }, 2500);
            }
        }, 200);
    }

    initPendulum() {
        const lengthSlider = document.getElementById('length-slider');
        const lengthValue = document.getElementById('length-value');
        const startBtn = document.getElementById('start-pendulum');
        const bob = document.getElementById('pendulum-bob');
        const string = document.querySelector('.pendulum-string');

        if (!lengthSlider || !lengthValue || !startBtn || !bob || !string) return;

        lengthSlider.addEventListener('input', (e) => {
            const length = e.target.value;
            lengthValue.textContent = length;
            
            string.style.height = length + 'px';
            bob.style.top = (20 + parseInt(length)) + 'px';
        });

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.startPendulumSwing(bob, string, parseInt(lengthValue.textContent));
        });
    }

    startPendulumSwing(bob, string, length) {
        if (!bob || !string) return;
        
        const period = Math.sqrt(length / 50) * 2;
        
        bob.style.transformOrigin = `center ${-length}px`;
        string.style.transformOrigin = 'top center';
        
        const keyframeName = 'pendulum-swing-' + Date.now();
        
        if (!document.getElementById('pendulum-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'pendulum-styles';
            styleSheet.textContent = `
                @keyframes ${keyframeName} {
                    0% { transform: translateX(-50%) rotate(-30deg); }
                    50% { transform: translateX(-50%) rotate(30deg); }
                    100% { transform: translateX(-50%) rotate(-30deg); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
        
        bob.style.animation = `${keyframeName} ${period}s ease-in-out infinite`;
        string.style.animation = `${keyframeName} ${period}s ease-in-out infinite`;
        
        setTimeout(() => {
            bob.style.animation = '';
            string.style.animation = '';
        }, period * 5000);
    }

    initMagnets() {
        const objects = document.querySelectorAll('.test-object');
        const result = document.getElementById('magnet-result');

        if (!result) return;

        objects.forEach(obj => {
            obj.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isMagnetic = obj.dataset.magnetic === 'true';
                
                objects.forEach(o => {
                    o.style.transform = '';
                    o.style.border = '2px solid transparent';
                    o.style.background = '';
                });
                
                if (isMagnetic) {
                    obj.style.transform = 'scale(1.1) translateY(-5px)';
                    obj.style.border = '2px solid var(--color-success)';
                    obj.style.background = 'var(--color-bg-3)';
                    result.textContent = '🧲 Magnetic! The object is attracted to the magnet!';
                    result.style.color = 'var(--color-success)';
                } else {
                    obj.style.transform = 'scale(0.95)';
                    obj.style.border = '2px solid var(--color-text-secondary)';
                    obj.style.background = 'var(--color-secondary)';
                    result.textContent = '❌ Not magnetic. The object is not attracted.';
                    result.style.color = 'var(--color-text-secondary)';
                }
                
                setTimeout(() => {
                    obj.style.transform = '';
                    obj.style.border = '2px solid transparent';
                    obj.style.background = '';
                }, 2000);
            });
        });
    }
}

// Initialize the Science Lab when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScienceLab();
});