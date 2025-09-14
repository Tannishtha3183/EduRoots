/* script.js
   Multi-class site logic and data.
   Works offline (all data embedded).
*/

(() => {
  // ----- Data: expanded topics for Class 1 - Class 8 -----
  // Each class: {Maths: [{t,e,f,ex,practice,icon}], Science: [...]}
  const DATA = {
    "Class 1": {
      Maths: [
        { t: "Counting 1–100", e: "Count in order from 1 to 100. Group by tens to read numbers easily.", f: null, ex: "Example: 27 = 2 tens + 7 ones.", practice: "Count objects in groups of 10.", icon: "🔢" },
        { t: "Number writing", e: "Write numbers and learn their shapes (1,2,3 ...).", f: null, ex: "Write 15 as 'fifteen'.", practice: "Write numbers 11–20.", icon: "✍️" },
        { t: "Addition (small)", e: "Combine two small groups to find total.", f: "a + b = sum", ex: "4 + 3 = 7", practice: "5 + 2 = ?", icon: "➕" },
        { t: "Subtraction (small)", e: "Take away from a group to find what's left.", f: "a - b = difference", ex: "7 - 2 = 5", practice: "8 - 3 = ?", icon: "➖" },
        { t: "Shapes", e: "Learn circle, square, triangle, rectangle and their sides/corners.", f: null, ex: "Square has 4 equal sides.", practice: "Draw a triangle and count sides.", icon: "🔺" },
        { t: "Comparisons", e: "Use words: more, less, heavier, lighter, taller and shorter.", f: null, ex: "5 is more than 3.", practice: "Which is bigger: 7 or 9?", icon: "⚖️" },
        { t: "Patterns", e: "Find repeated patterns (ABAB or AABB).", f: null, ex: "Red, blue, red, blue is ABAB.", practice: "Make your own simple pattern.", icon: "🔁" },
        { t: "Measurements (length)", e: "Compare lengths using non-standard units (paperclips, hands).", f: null, ex: "Table is 10 paperclips long.", practice: "Measure pencil using your finger lengths.", icon: "📏" }
      ],
      Science: [
        { t: "Parts of the body", e: "Learn head, eyes, nose, mouth, hands, legs & their uses.", f: null, ex: "Use eyes to see.", practice: "Point to your elbow.", icon: "🧒" },
        { t: "Five senses", e: "Sight, hearing, smell, taste and touch help us explore the world.", f: null, ex: "Taste helps know sweet or sour.", practice: "Name something you can smell.", icon: "👃" },
        { t: "Plants basics", e: "Plants need water, air and sunlight. Parts: root, stem, leaf, flower.", f: null, ex: "Leaves help make food.", practice: "Find a leaf and name its color.", icon: "🌿" },
        { t: "Animals around us", e: "Pets, farm animals and wild animals—where they live and what they eat.", f: null, ex: "Cow is a farm animal and eats grass.", practice: "Name a pet you know.", icon: "🐶" },
        { t: "Clean & healthy", e: "Washing hands, brushing teeth and eating fruit keep us healthy.", f: null, ex: "Brush teeth twice a day.", practice: "List 2 healthy foods.", icon: "🧼" },
        { t: "Day and night", e: "Day happens when our side of Earth faces the sun, night when it turns away.", f: null, ex: "Sunrise in the morning.", practice: "Is the moon out during day or night?", icon: "🌞" },
        { t: "Weather types", e: "Sunny, rainy, cloudy, windy—how weather changes daily.", f: null, ex: "Rain comes with clouds.", practice: "Draw a cloudy sky.", icon: "🌦️" },
        { t: "My family & home", e: "Family members and safe places at home.", f: null, ex: "Home keeps us safe and warm.", practice: "Name 3 family members.", icon: "🏠" }
      ]
    },

    "Class 2": {
      Maths: [
        { t: "Place value (tens/ones)", e: "Understand tens and ones. 43 = 4 tens + 3 ones.", f: null, ex: "56 → 5 tens and 6 ones.", practice: "Write 72 as tens and ones.", icon: "🔢" },
        { t: "Addition with carry", e: "If ones add to 10 or more, carry 1 to tens.", f: "8 + 7 = 15 → write 5 carry 1", ex: "27 + 18 = 45", practice: "45 + 27 = ?", icon: "➕" },
        { t: "Subtraction with borrow", e: "If ones in top number are smaller, borrow 1 ten.", f: null, ex: "40 - 17 = 23", practice: "50 - 28 = ?", icon: "➖" },
        { t: "Multiplication intro", e: "Repeated addition: 3 × 4 = 4 + 4 + 4.", f: "a × b = repeated a b times", ex: "2 × 5 = 10", practice: "3 × 3 = ?", icon: "✖️" },
        { t: "Division intro", e: "Sharing equally; 12 ÷ 3 = 4.", f: "a ÷ b = result", ex: "10 ÷ 2 = 5", practice: "8 ÷ 2 = ?", icon: "➗" },
        { t: "Time basics", e: "Read hours and half-hours on clock. 3:30 is half past 3.", f: null, ex: "12:00 is noon.", practice: "What time is half past 5?", icon: "🕒" },
        { t: "Money", e: "Identify coins and add small amounts.", f: null, ex: "1 rupee + 50 paise = 1.50", practice: "Add ₹1 + 50p", icon: "💰" },
        { t: "Length units", e: "Use cm and m to measure objects.", f: null, ex: "Table = 1 m (100 cm).", practice: "Measure a pencil length in cm.", icon: "📏" }
      ],
      Science: [
        { t: "Healthy food", e: "Eat fruits, vegetables, grains, and proteins for growth.", f: null, ex: "Milk provides calcium.", practice: "Name 2 foods with protein.", icon: "🍎" },
        { t: "Sources of water", e: "Rivers, lakes, wells and rain provide water.", f: null, ex: "Rain fills ponds.", practice: "Where does your drinking water come from?", icon: "💧" },
        { t: "Air & breathing", e: "Air is all around and we need it to breathe.", f: null, ex: "Plants use CO₂ for food.", practice: "Blow bubbles to see air.", icon: "🌬️" },
        { t: "Homes & habitats", e: "Different animals live in different homes (nest, den, hive).", f: null, ex: "Birds live in nests.", practice: "Name an animal home.", icon: "🏡" },
        { t: "Day-night and seasons", e: "Earth's movement gives day/night and seasons.", f: null, ex: "Summer is hotter than winter.", practice: "Which season has most rain in your area?", icon: "🍂" },
        { t: "Cleaning & safety", e: "Wash hands, keep surroundings clean to prevent illness.", f: null, ex: "Wash hands before eating.", practice: "When should you wash hands?", icon: "🧴" },
        { t: "Plant uses", e: "Plants give food, oxygen, wood and shade.", f: null, ex: "Fruits come from plants.", practice: "Name one fruit and its tree.", icon: "🌳" },
        { t: "Simple machines", e: "Tools like levers, wheels and pulleys make work easier.", f: null, ex: "Seesaw is a lever.", practice: "Find a wheel in your home.", icon: "⚙️" }
      ]
    },

    "Class 3": {
      Maths: [
        { t: "Multiplication tables 1–10", e: "Memorize tables to multiply quickly.", f: "3 × 4 = 12", ex: "6 × 7 = 42", practice: "4 × 5 = ?", icon: "🧮" },
        { t: "Division (quotient & remainder)", e: "Split into equal groups; sometimes a remainder left.", f: "12 ÷ 5 = 2 remainder 2", ex: "10 ÷ 3 = 3 R1", practice: "13 ÷ 4 = ?", icon: "➗" },
        { t: "Fractions (half, quarter)", e: "Part of a whole: 1/2, 1/4, 3/4.", f: "fraction = part/whole", ex: "If pizza has 4 slices, 1 slice = 1/4.", practice: "Color half of a circle.", icon: "🥧" },
        { t: "Basic geometry", e: "Learn edges, vertices, and angles (right angle = 90°).", f: null, ex: "Square has 4 right angles.", practice: "Find right angle in room corners.", icon: "📐" },
        { t: "Perimeter of simple shapes", e: "Add all sides to find perimeter.", f: "Perimeter rectangle = 2(l + w)", ex: "Perimeter of 3x4 rectangle = 14", practice: "Perimeter of 2x5 rectangle?", icon: "📏" },
        { t: "Simple data (pictograph)", e: "Use pictures to show counts and read values.", f: null, ex: "Each star = 2 students; 3 stars = 6 students.", practice: "Draw a pictograph for 5 apples, 3 oranges.", icon: "📊" },
        { t: "Patterns & sequences", e: "Find next items in number patterns.", f: null, ex: "2,4,6,... next is 8", practice: "Find next: 3,6,9,...", icon: "🔢" },
        { t: "Word problems", e: "Read carefully, pick operation(s) and solve.", f: null, ex: "If 3 bags have 4 apples each, total = 12.", practice: "2 boxes, 5 toys each = ?", icon: "🧩" }
      ],
      Science: [
        { t: "Living vs non-living", e: "Living things grow, breathe and reproduce; non-living don't.", f: null, ex: "Tree is living; rock is not.", practice: "Is fire living or non-living?", icon: "🌱" },
        { t: "Plant parts & functions", e: "Root, stem, leaf, flower and fruit – each has a job.", f: null, ex: "Roots take water from soil.", practice: "Name the function of leaves.", icon: "🌿" },
        { t: "Human body organs", e: "Heart pumps blood, lungs take oxygen, brain controls body.", f: null, ex: "Heart keeps blood moving.", practice: "Point to your lungs.", icon: "🫀" },
        { t: "Soil & water", e: "Soil types and water importance for plants.", f: null, ex: "Sandy soil drains fast.", practice: "Which soil holds water better?", icon: "🪴" },
        { t: "Weather & clouds", e: "Clouds form from water vapor and bring rain.", f: null, ex: "Cumulus clouds look fluffy.", practice: "Look up and name cloud type.", icon: "☁️" },
        { t: "Food chains (simple)", e: "Who eats whom – sun → plant → herbivore → carnivore.", f: null, ex: "Grass → rabbit → fox.", practice: "Write a 3-step food chain.", icon: "🦊" },
        { t: "Rocks & minerals", e: "Different rocks and how they are used in daily life.", f: null, ex: "Granite used for building.", practice: "Find a rock and describe it.", icon: "🪨" },
        { t: "Safe science at home", e: "Always ask an adult for experiments; use safe materials.", f: null, ex: "Mixing vinegar and baking soda makes bubbles.", practice: "Do a safe vinegar-baking soda demo with adult.", icon: "🧪" }
      ]
    },

    "Class 4": {
      Maths: [
        { t: "Large numbers (4–5 digits)", e: "Read and write numbers up to 10000+.", f: null, ex: "12,345 = 1 ten-thousand + ...", practice: "Write 7,248 in words.", icon: "🔢" },
        { t: "Long addition & subtraction", e: "Add and subtract by columns aligning digits.", f: null, ex: "2345 + 178 = 2523", practice: "754 + 289 = ?", icon: "➕" },
        { t: "Multiplication (2-digit)", e: "Multiply larger numbers using steps.", f: null, ex: "24 × 6 = 144", practice: "23 × 4 = ?", icon: "✖️" },
        { t: "Division (long)", e: "Divide using steps and find quotient and remainder.", f: null, ex: "144 ÷ 12 = 12", practice: "96 ÷ 8 = ?", icon: "➗" },
        { t: "Perimeter & area", e: "Perimeter = total outer length; area = space inside.", f: "Area rectangle = l × w", ex: "3×4 area = 12", practice: "Area of 5×2 rectangle?", icon: "📐" },
        { t: "Fractions (equivalent)", e: "Different fractions equal same part (1/2 = 2/4).", f: null, ex: "1/2 = 2/4", practice: "Find equivalent of 1/3.", icon: "🥧" },
        { t: "Angles basics", e: "Acute (<90°), right (90°), obtuse (>90°).", f: null, ex: "Right angle = corner of square.", practice: "Observe and name an angle in room.", icon: "📐" },
        { t: "Roman numerals", e: "I=1, V=5, X=10; used on clocks and lists.", f: null, ex: "VIII = 8", practice: "Write 14 in Roman numerals.", icon: "🕰️" }
      ],
      Science: [
        { t: "Food & digestion", e: "Food is broken into small parts to give energy.", f: null, ex: "Stomach mixes food.", practice: "Name one food that gives energy.", icon: "🍽️" },
        { t: "Teeth & hygiene", e: "Types of teeth and how to care for them.", f: null, ex: "Molars chew food.", practice: "How many times daily should you brush?", icon: "🪥" },
        { t: "Force and motion", e: "Push or pull moves objects; friction slows them down.", f: null, ex: "Push a ball to move it.", practice: "Roll ball on carpet vs floor; notice which stops first.", icon: "⚽" },
        { t: "States of matter", e: "Solid, liquid and gas can change by heating/cooling.", f: null, ex: "Ice (solid) melts to water (liquid).", practice: "Observe water boiling (adult supervision).", icon: "💧" },
        { t: "Electricity basics", e: "Simple circuits: battery, wires, bulb and switch.", f: null, ex: "Open switch = bulb off.", practice: "Draw a simple circuit diagram.", icon: "🔋" },
        { t: "Light and shadows", e: "Light travels in straight lines and creates shadows when blocked.", f: null, ex: "Move lamp to change shadow size.", practice: "Make small and big shadows with hands.", icon: "🔦" },
        { t: "Plant reproduction", e: "Flowers help make seeds for new plants.", f: null, ex: "Pollination helps seed formation.", practice: "Look at a flower and find the petals.", icon: "🌼" },
        { t: "Safety at home", e: "Electricity and sharp objects need care—always ask an adult.", f: null, ex: "Keep water away from plugs.", practice: "List 3 safety rules.", icon: "⚠️" }
      ]
    },

    "Class 5": {
      Maths: [
        { t: "Decimals (tenths, hundredths)", e: "Decimal point separates whole and part numbers.", f: "0.5 = 1/2", ex: "0.25 = 25 hundredths", practice: "Write 3.5 in words.", icon: "🔢" },
        { t: "Factors & multiples", e: "Factors divide a number; multiples are repeated products.", f: null, ex: "Factors of 12: 1,2,3,4,6,12", practice: "List multiples of 4 up to 20.", icon: "✳️" },
        { t: "Prime & composite", e: "Prime numbers have only 1 and itself as factors.", f: null, ex: "2,3,5,7 are primes", practice: "Is 15 prime?", icon: "🔎" },
        { t: "Geometry: triangles", e: "Triangles can be equilateral, isosceles or scalene.", f: null, ex: "Equilateral all sides equal.", practice: "Draw an isosceles triangle.", icon: "🔺" },
        { t: "Symmetry", e: "An object is symmetric if one half mirrors the other.", f: null, ex: "Butterfly wings are symmetric.", practice: "Fold a paper shape to find symmetry.", icon: "🦋" },
        { t: "Data handling (bar graphs)", e: "Show data in bars to compare values easily.", f: null, ex: "Use bars to show class scores.", practice: "Make a bar graph of 5 values.", icon: "📊" },
        { t: "Perimeter & area (compound)", e: "Find area/perimeter of shapes made from rectangles.", f: null, ex: "Break shape into rectangles.", practice: "Find area of L-shaped block.", icon: "📐" },
        { t: "Patterns & sequences", e: "Detect number patterns and rules.", f: null, ex: "2,4,8,16 is doubling pattern.", practice: "Continue: 5,10,20,...", icon: "🔁" }
      ],
      Science: [
        { t: "Human body systems", e: "Digestive, respiratory and circulatory systems help us live.", f: null, ex: "Lungs bring oxygen to blood.", practice: "Name one organ in each system.", icon: "🫁" },
        { t: "Water cycle", e: "Evaporation, condensation and precipitation move water around Earth.", f: null, ex: "Rain falls after clouds form.", practice: "Draw the water cycle.", icon: "🌧️" },
        { t: "Light & reflection", e: "Light bounces off shiny surfaces (reflection).", f: null, ex: "Mirror shows reflection.", practice: "Use mirror to see reflection.", icon: "🔍" },
        { t: "Simple machines revisited", e: "Inclined plane, lever, pulley reduce effort.", f: null, ex: "Ramp helps push heavy boxes upward.", practice: "Spot an inclined plane in your house.", icon: "🛠️" },
        { t: "Soil & plant growth", e: "Soil supplies nutrients; different soils affect growth.", f: null, ex: "Loamy soil is good for plants.", practice: "Plant a seed in a cup and observe.", icon: "🌱" },
        { t: "Rocks & fossils", e: "Fossils show ancient life; rocks are used for tools and buildings.", f: null, ex: "Fossils found in sedimentary rocks.", practice: "Look for small stones and sort them.", icon: "🪨" },
        { t: "Electric circuits", e: "Series and parallel circuits change current flow.", f: null, ex: "Adding bulbs in series may dim them.", practice: "Draw a series circuit with 2 bulbs.", icon: "💡" },
        { t: "Our environment", e: "Protect trees, water and animals for a healthy planet.", f: null, ex: "Planting trees helps reduce heat.", practice: "List 3 ways to save water.", icon: "🌍" }
      ]
    },

    "Class 6": {
      Maths: [
        { t: "Integers & number line", e: "Positive and negative numbers; add/subtract using number line.", f: null, ex: "-2 + 5 = 3", practice: "What is -3 + 4?", icon: "🔢" },
        { t: "Fractions & decimals", e: "Convert and compare; 1/2 = 0.5", f: null, ex: "3/4 = 0.75", practice: "Convert 1/4 to decimal.", icon: "🥧" },
        { t: "Algebra basics", e: "Use letters for unknowns and solve simple equations.", f: "x + 5 = 9 → x = 4", ex: "2x = 6 → x = 3", practice: "Solve x - 2 = 5.", icon: "🧮" },
        { t: "Ratio & proportion", e: "Compare quantities: if 2:3, then 4:6 maintains proportion.", f: null, ex: "If 2 apples : 3 bananas, 4 apples : 6 bananas.", practice: "If ratio 3:4, what is ? for 6:?", icon: "⚖️" },
        { t: "Statistics: mean", e: "Mean = sum of numbers ÷ count.", f: "mean = (a+b+...)/n", ex: "Mean of 2,3,5 = 10/3", practice: "Mean of 4,6,8?", icon: "📈" },
        { t: "Geometry basics", e: "Polygons, perimeter and area for common shapes.", f: null, ex: "Area of triangle = 1/2 × base × height", practice: "Area of triangle base 4 height 3?", icon: "📐" },
        { t: "Simple interest (intro)", e: "Interest = (P × R × T)/100 gives money earned; basic intro.", f: "SI = (P×R×T)/100", ex: "On ₹100 at 2% for 1 year → ₹2", practice: "Find interest on ₹200 at 1% for 1 year.", icon: "💱" },
        { t: "Graphs & coordinates", e: "Plot points (x,y) and read simple line graphs.", f: null, ex: "(2,3) means x=2 y=3", practice: "Plot (1,2) and (2,3).", icon: "📉" }
      ],
      Science: [
        { t: "Classification of organisms", e: "Group living things: plants, animals, fungi and more by features.", f: null, ex: "Birds have feathers and wings.", practice: "Classify 3 animals you know.", icon: "🦜" },
        { t: "Nutrition & balanced diet", e: "Carbs, proteins, fats, vitamins and minerals keep us healthy.", f: null, ex: "Protein helps build muscles.", practice: "Name a vitamin-rich food.", icon: "🍗" },
        { t: "Motion: speed formula", e: "Speed tells how fast something moves.", f: "speed = distance ÷ time", ex: "10 km in 2 hr → 5 km/hr", practice: "If 30km in 3hr → ? km/hr", icon: "🚗" },
        { t: "Light: reflection & shadows", e: "Light reflects from surfaces and makes shadows when blocked.", f: null, ex: "Mirror reflects image.", practice: "Move a torch and observe shadow.", icon: "🔦" },
        { t: "Electricity basics & safety", e: "Current flows in circuits; be safe and keep water away from plugs.", f: null, ex: "Open switch stops bulb.", practice: "Why is it dangerous to touch plugs with wet hands?", icon: "⚡" },
        { t: "Rocks & minerals deeper", e: "Types of rocks and their uses.", f: null, ex: "Igneous, sedimentary and metamorphic types.", practice: "Find one example of each rock type online.", icon: "🪨" },
        { t: "Environment: food chains", e: "Producers, consumers and decomposers form food chains.", f: null, ex: "Grass → deer → tiger", practice: "Write your local food chain.", icon: "🌾" },
        { t: "Microorganisms (intro)", e: "Tiny organisms: helpful (yogurt bacteria) or harmful (germs).", f: null, ex: "Bacteria help make curd.", practice: "Name one helpful microbe.", icon: "🦠" }
      ]
    },

    "Class 7": {
      Maths: [
        { t: "Rational numbers", e: "Numbers that can be written as p/q (q≠0).", f: null, ex: "-2/3 and 5/4 are rational", practice: "Tell if 0.75 is rational.", icon: "🔢" },
        { t: "Algebraic expressions", e: "Combine like terms, simplify expressions.", f: null, ex: "2x + 3x = 5x", practice: "Simplify 3a + 5a", icon: "🧮" },
        { t: "Linear equations", e: "Solve ax + b = c using inverse operations.", f: "x = (c - b)/a", ex: "x/3 = 5 → x = 15", practice: "Solve 2x + 3 = 9", icon: "✖️" },
        { t: "Geometry: triangles & angles", e: "Sum of triangle angles = 180°; types of triangles.", f: null, ex: "If two angles 50° and 60°, third = 70°", practice: "Find third angle if 30° and 80°.", icon: "📐" },
        { t: "Ratio, proportion & percentages", e: "How quantities compare and change to percent.", f: null, ex: "50% = half", practice: "What is 25% of 200?", icon: "📊" },
        { t: "Probability basics", e: "Chance of event = favorable / total outcomes.", f: null, ex: "Head in coin toss = 1/2", practice: "Chance of even number on die = ?", icon: "🎲" },
        { t: "Mensuration (surface area intro)", e: "Surface area of cubes and cuboids basics.", f: "Surface area cuboid = 2(lw + lh + wh)", ex: "1x2x3 cuboid SA = 2*(2+3+6)=22", practice: "SA of 2x2x2 cube?", icon: "📦" },
        { t: "Data: median & mode", e: "Median = middle value; Mode = most frequent value.", f: null, ex: "Numbers 2,3,3,4: mode = 3", practice: "Find median of 2,5,7,9,10", icon: "📈" }
      ],
      Science: [
        { t: "Nutrition & respiration", e: "Food gives fuel; respiration uses oxygen to release energy in cells.", f: null, ex: "Cells use oxygen to get energy.", practice: "How does breathing help cells?", icon: "🍽️" },
        { t: "Heat transfer", e: "Heat moves by conduction, convection and radiation.", f: null, ex: "Boiling water transfers heat by convection.", practice: "Give an example of conduction.", icon: "🔥" },
        { t: "Acids, bases & indicators", e: "Acids taste sour, bases bitter; indicators change color.", f: null, ex: "Lemon is acidic.", practice: "Test lemon juice with litmus paper (adult help).", icon: "🧪" },
        { t: "Weather & climate", e: "Weather is short-term; climate is long-term patterns.", f: null, ex: "Today’s rain is weather; long rainy zone is climate.", practice: "Describe your local climate.", icon: "🌦️" },
        { t: "Physical vs chemical change", e: "Physical: same substance (ice melting). Chemical: new substance (rusting).", f: null, ex: "Burning paper → chemical change.", practice: "Is tearing paper physical or chemical?", icon: "⚗️" },
        { t: "Sound waves", e: "Sound is vibration that travels through air and other media.", f: null, ex: "Tight string vibrates faster → higher pitch.", practice: "Make sound using a rubber band.", icon: "🎵" },
        { t: "Light: refraction & simple lenses", e: "Light bends when entering new medium (refraction).", f: null, ex: "Spoon looks bent in water.", practice: "Observe straw in a glass of water.", icon: "🔍" },
        { t: "Conservation of resources", e: "Save water, energy, and reduce waste for a healthy planet.", f: null, ex: "Turn off taps to save water.", practice: "List 3 ways to save electricity.", icon: "🌍" }
      ]
    },

    "Class 8": {
      Maths: [
        { t: "Linear equations (two-step)", e: "Solve by isolating x using inverse steps.", f: "2x + 3 = 11 → x = 4", ex: "3x - 6 = 9 → x = 5", practice: "Solve x/2 + 4 = 7", icon: "✖️" },
        { t: "Exponents & powers", e: "Repeated multiplication: a^n.", f: "2^3 = 2×2×2 = 8", ex: "5^2 = 25", practice: "Compute 3^2", icon: "📐" },
        { t: "Quadrilaterals & circles", e: "Square, rectangle, parallelogram; circle properties.", f: "Area circle = πr²", ex: "If r=2, area=π×4", practice: "Find area of circle r=1 (use π≈3.14).", icon: "⭕" },
        { t: "Mensuration (volume)", e: "Find volumes of cuboid, cube and cylinder.", f: "Volume cuboid = l×w×h", ex: "Volume 2×3×4 = 24", practice: "Volume of cube side 3?", icon: "📦" },
        { t: "Data & statistics basics", e: "Mean, median, mode and simple interpretation of graphs.", f: null, ex: "Mean of 2,3,5 = 10/3", practice: "Find mode of 2,2,3,4.", icon: "📊" },
        { t: "Slope of line (intro)", e: "Slope = rise/run shows steepness of a line.", f: "slope = (y2-y1)/(x2-x1)", ex: "Through (1,2) and (3,6) slope=(6-2)/(3-1)=2", practice: "Slope between (0,0) and (2,4)?", icon: "📈" },
        { t: "Pythagoras (intro)", e: "In a right triangle: a² + b² = c² (c is hypotenuse).", f: "a² + b² = c²", ex: "3² + 4² = 5² → 9 + 16 = 25", practice: "Find hypotenuse of 6 & 8 legs.", icon: "🔺" },
        { t: "Probability (advanced intro)", e: "Use equally likely outcomes to calculate chances.", f: "P = favorable/total", ex: "1/6 chance to roll a 3 on a die", practice: "P of even on dice?", icon: "🎲" }
      ],
      Science: [
        { t: "Force, pressure & friction", e: "Force moves objects; pressure = force/area; friction resists motion.", f: "pressure = force/area", ex: "10N on 2m² → p=5 N/m²", practice: "If you press small area harder, pressure increases.", icon: "⚖️" },
        { t: "Sound: properties", e: "Pitch and loudness depend on frequency and amplitude.", f: null, ex: "Tight string = higher pitch.", practice: "Compare sounds of two different-sized bottles.", icon: "🔊" },
        { t: "Cell structure", e: "Cells have nucleus, cytoplasm; plant cells have cell wall and chloroplasts.", f: null, ex: "Chloroplasts help photosynthesis.", practice: "Draw a plant cell and label parts.", icon: "🧫" },
        { t: "Human reproduction (basic)", e: "Understand stages: puberty, reproduction basics (age-appropriate).", f: null, ex: "Seeds in plants and eggs in animals.", practice: "Name one change during puberty.", icon: "🧬" },
        { t: "Chemical reactions intro", e: "Reactants form products; energy may be released or absorbed.", f: null, ex: "Vinegar + baking soda → fizz (CO₂).", practice: "Observe safe reaction with adult.", icon: "⚗️" },
        { t: "Light: dispersion & colors", e: "White light can split into colors (rainbow).", f: null, ex: "Prism creates rainbow.", practice: "Find colors in a rainbow picture.", icon: "🌈" },
        { t: "Ecosystems & food webs", e: "Plants and animals interact, forming food webs and habitats.", f: null, ex: "Many food chains make a web.", practice: "Draw a simple food web for your area.", icon: "🌱" },
        { t: "Conservation & recycling", e: "Reduce, reuse and recycle to protect resources.", f: null, ex: "Recycling paper saves trees.", practice: "List 3 recyclables in your home.", icon: "♻️" }
      ]
    }
  };

  // ----- App state -----
  const CLASSES = Object.keys(DATA);
  let activeClass = CLASSES[0];
  let activeSubject = "Maths";

  // ----- DOM refs -----
  const classListEl = document.getElementById("classList");
  const topicGrid = document.getElementById("topicGrid");
  const activeClassTitle = document.getElementById("activeClassTitle");
  const topicCountEl = document.getElementById("topicCount");
  const searchInput = document.getElementById("search");
  const noResultsEl = document.getElementById("noResults");
  const downloadAllBtn = document.getElementById("downloadAll");

  // ----- Utilities -----
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // ----- Render class list -----
  function renderClassList() {
    classListEl.innerHTML = "";
    CLASSES.forEach(c => {
      const btn = el("div", "class-item", c);
      if (c === activeClass) btn.classList.add("active");
      btn.onclick = () => { activeClass = c; updateUI(); };
      classListEl.appendChild(btn);
    });
  }

  // ----- Render topics -----
  function renderTopics(filterText = "") {
    const topics = DATA[activeClass][activeSubject] || [];
    topicGrid.innerHTML = "";
    const filter = filterText.trim().toLowerCase();

    let count = 0;
    topics.forEach((topic, idx) => {
      const hay = (topic.t + " " + topic.e + " " + topic.ex + " " + (topic.practice || "")).toLowerCase();
      if (filter && !hay.includes(filter)) return;

      count++;
      const card = el("div", "topic");
      const title = el("div", "title");
      const icon = el("div", "icon icon-left");
      icon.innerHTML = `<span class="icon">${topic.icon || "📚"}</span>`;
      const h = el("div", "", "");
      h.innerHTML = `<div style="font-weight:800">${topic.t}</div><div class="small muted">${topic.e}</div>`;
      title.appendChild(icon);
      title.appendChild(h);
      card.appendChild(title);

      if (topic.f) {
        const formula = el("div", "formula", "Formula: " + topic.f);
        card.appendChild(formula);
      }

      const ex = el("div", "example");
      ex.innerHTML = `<strong>Example:</strong> ${topic.ex}`;
      card.appendChild(ex);

      const practice = el("div", "practice");
      practice.innerHTML = `<strong>Try:</strong> ${topic.practice}`;
      card.appendChild(practice);

      // actions
      const actions = el("div", "actions");
      const wsBtn = el("button", "btn-ghost", "📄 Worksheet");
      wsBtn.onclick = () => generateWorksheetForTopic(activeClass, activeSubject, topic);
      actions.appendChild(wsBtn);

      const explainBtn = el("button", "btn-ghost", "❓ More");
      explainBtn.onclick = () => alert(`${topic.t}\n\n${topic.e}\n\nExample: ${topic.ex}\n\nTry: ${topic.practice}`);
      actions.appendChild(explainBtn);

      card.appendChild(actions);
      topicGrid.appendChild(card);
    });

    topicCountEl.textContent = `${count} topic${count !== 1 ? "s" : ""}`;
    noResultsEl.style.display = count === 0 ? "block" : "none";
  }

  // ----- Worksheet generation -----
  // Generate a simple PDF for the selected class & subject OR single topic
  async function generateWorksheetForTopic(cls, subject, topic) {
    // Use jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const left = 40, topStart = 50;
    doc.setFontSize(18);
    doc.text(`${cls} — ${subject}`, left, topStart);
    doc.setFontSize(14);
    doc.text(`${topic.t}`, left, topStart + 22);
    doc.setFontSize(11);
    doc.text(`Explanation: ${topic.e}`, left, topStart + 46, { maxWidth: 520 });
    if (topic.f) doc.text(`Formula: ${topic.f}`, left, topStart + 80);
    doc.text(`Example: ${topic.ex}`, left, topStart + 100, { maxWidth: 520 });

    // Add practice questions (3 variations)
    const qTop = topStart + 140;
    doc.setFontSize(12);
    doc.text("Practice Questions:", left, qTop);
    const questions = makePracticeQuestions(cls, subject, topic);
    questions.forEach((q, i) => {
      doc.text(`${i + 1}. ${q}`, left, qTop + 20 + i * 18, { maxWidth: 520 });
    });

    doc.text("Answers (on next page)", left, qTop + 20 + questions.length * 18 + 18);
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Answers", left, 60);
    doc.setFontSize(11);
    questions.forEach((q, i) => {
      doc.text(`${i + 1}. ${solvePractice(q)}`, left, 90 + i * 18);
    });

    doc.save(`${cls}_${subject}_${topic.t.replace(/\s+/g, "_")}_worksheet.pdf`);
  }

  // Generate a class+subject worksheet containing several topics
  async function generateWorksheetForClass() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const left = 40, topStart = 50;
    const topics = DATA[activeClass][activeSubject] || [];
    doc.setFontSize(18);
    doc.text(`${activeClass} — ${activeSubject} Worksheet`, left, topStart);
    doc.setFontSize(11);
    let y = topStart + 30;

    // Put 6-8 questions (one from each topic or up to available)
    const selections = topics.slice(0, 8);
    let qIndex = 1;
    selections.forEach(topic => {
      doc.setFontSize(13);
      doc.text(`${qIndex}. ${topic.t}`, left, y);
      y += 18;
      doc.setFontSize(11);
      doc.text(`Explain: ${topic.e}`, left + 8, y, { maxWidth: 500 });
      y += 18;
      const qs = makePracticeQuestions(activeClass, activeSubject, topic);
      qs.forEach(q => {
        doc.text(`${qIndex}. ${q}`, left + 8, y, { maxWidth: 500 });
        y += 16;
        qIndex++;
        if (y > 720) {
          doc.addPage();
          y = 60;
        }
      });
    });

    // Answers page
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Answers", left, 60);
    let ay = 90;
    // regenerate same questions for answers
    selections.forEach(topic => {
      const qs = makePracticeQuestions(activeClass, activeSubject, topic);
      qs.forEach(q => {
        doc.setFontSize(11);
        doc.text(`${q} — ${solvePractice(q)}`, left, ay, { maxWidth: 520 });
        ay += 16;
        if (ay > 760) { doc.addPage(); ay = 60; }
      });
    });

    const fileName = `${activeClass}_${activeSubject}_worksheet.pdf`.replace(/\s+/g, "_");
    doc.save(fileName);
  }

  // Very small rule-based question generator (keeps things simple)
  function makePracticeQuestions(cls, subject, topic) {
    // Use keywords to generate plausible practice questions
    const title = topic.t.toLowerCase();
    const qs = [];
    if (/addition|add|\+/.test(title)) qs.push("4 + 3 = ?");
    if (/subtraction|minus|subtract/.test(title)) qs.push("9 - 4 = ?");
    if (/multiplication|times|table|multiply/.test(title)) qs.push("4 × 3 = ?");
    if (/division|÷|divide|share/.test(title)) qs.push("12 ÷ 3 = ?");
    if (/fraction|decimal/.test(title)) qs.push("Convert 1/2 to decimal.");
    if (/area|perimeter|volume|mensuration/.test(title)) qs.push("Find area of a 3 by 4 rectangle.");
    if (/speed|motion/.test(title)) qs.push("If 10 km in 2 hr, speed = ?");
    if (/formula|exponents|power|pythagoras/.test(title)) qs.push("Compute 2^3 = ?");
    if (/probability/.test(title)) qs.push("Chance of head in coin toss = ?");
    if (/shapes|triangle|geometry|angles/.test(title)) qs.push("Sum of angles in triangle = ?");
    if (/plants|leaf|cells|biology|body|organ|nutrition/.test(title)) qs.push("Give one example from topic and explain in one line.");
    if (qs.length === 0) qs.push("Read example and try a similar one on paper.");
    // restrict to up to 3 questions
    return qs.slice(0, 3);
  }

  function solvePractice(q) {
    if (/4 \+ 3/.test(q)) return "7";
    if (/9 - 4/.test(q)) return "5";
    if (/4 × 3/.test(q)) return "12";
    if (/12 ÷ 3/.test(q)) return "4";
    if (/Convert 1\/2 to decimal/.test(q)) return "0.5";
    if (/area of a 3 by 4 rectangle/.test(q)) return "12 (3 × 4)";
    if (/10 km in 2 hr/.test(q)) return "5 km/hr";
    if (/2\^3/.test(q)) return "8";
    if (/Coin toss/.test(q) || /head in coin toss/.test(q)) return "1/2";
    if (/Sum of angles in triangle/.test(q)) return "180°";
    if (/Give one example/.test(q)) return "Example answer: Leaves make food in sunlight.";
    return "Check your working and compare with example.";
  }

  // ----- Update UI -----
  function updateUI() {
    renderClassList();
    // subject buttons
    document.querySelectorAll(".subject-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.subject === activeSubject);
      b.onclick = () => { activeSubject = b.dataset.subject; updateUI(); };
    });

    activeClassTitle.textContent = `${activeClass} — ${activeSubject}`;
    renderTopics(searchInput.value || "");
  }

  // ----- event listeners -----
  searchInput.addEventListener("input", () => renderTopics(searchInput.value));
  downloadAllBtn.addEventListener("click", () => {
    if (!confirm(`Download worksheet for ${activeClass} — ${activeSubject}?`)) return;
    generateWorksheetForClass();
  });

  // init
  renderClassList();
  updateUI();

})();
