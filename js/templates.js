// Rich educational templates for offline simulation mode

export const defaultStudents = [
  { id: "std_01", name: "Alexander Wright", grades: { math: 92, science: 88, english: 95, social: 90 }, attendance: 98, assessments: 12 },
  { id: "std_02", name: "Beatrix Sen", grades: { math: 74, science: 81, english: 85, social: 78 }, attendance: 92, assessments: 12 },
  { id: "std_03", name: "Charles Vance", grades: { math: 62, science: 68, english: 72, social: 65 }, attendance: 85, assessments: 12 },
  { id: "std_04", name: "Diana Prince", grades: { math: 98, science: 97, english: 94, social: 96 }, attendance: 100, assessments: 12 },
  { id: "std_05", name: "Evan Cole", grades: { math: 85, science: 82, english: 80, social: 84 }, attendance: 94, assessments: 12 },
  { id: "std_06", name: "Fiona Gallagher", grades: { math: 55, science: 64, english: 78, social: 71 }, attendance: 88, assessments: 12 },
  { id: "std_07", name: "George Brooks", grades: { math: 89, science: 94, english: 87, social: 92 }, attendance: 96, assessments: 12 },
  { id: "std_08", name: "Hannah Abbott", grades: { math: 79, science: 76, english: 83, social: 80 }, attendance: 91, assessments: 12 },
  { id: "std_09", name: "Ian Malcolm", grades: { math: 91, science: 95, english: 86, social: 88 }, attendance: 95, assessments: 12 },
  { id: "std_10", name: "Julia Roberts", grades: { math: 83, science: 78, english: 92, social: 89 }, attendance: 93, assessments: 12 }
];

export const lessonPlanTemplates = {
  math: {
    algebra: {
      title: "Introduction to Quadratic Equations",
      objectives: [
        "Identify quadratic equations in standard form: ax² + bx + c = 0.",
        "Solve quadratic equations using the factoring method.",
        "Apply quadratic equations to solve basic real-world area problems."
      ],
      standards: "CCSS.MATH.CONTENT.HSA.REI.B.4 - Solve quadratic equations in one variable.",
      materials: ["Whiteboard & Markers", "Graphing calculators", "Quadratic Factoring Worksheet", "Projector for algebra tiles visualizer"],
      warmup: "Students will spend 5 minutes solving simple factoring questions on linear equations and binomial expansions (e.g., expand (x + 3)(x + 2)).",
      instruction: `<h3>Direct Instruction (15 minutes)</h3>
<p>Introduce quadratic equations and the standard format: <strong>ax² + bx + c = 0</strong>, where a ≠ 0.</p>
<ul>
  <li>Explain the visual representation: a parabola. Show how the solutions (roots) correspond to x-intercepts.</li>
  <li>Demonstrate the Zero Product Property: if A × B = 0, then A = 0 or B = 0.</li>
  <li>Walk through a worked example: <em>x² - 5x + 6 = 0</em>. Factored form is <em>(x - 2)(x - 3) = 0</em>, yielding roots <em>x = 2</em> and <em>x = 3</em>.</li>
</ul>`,
      practice: `<h3>Guided & Independent Practice (20 minutes)</h3>
<p><strong>Guided Practice:</strong> Solve <em>x² + 6x + 8 = 0</em> together as a class using algebra tiles and algebraic decomposition.</p>
<p><strong>Independent Practice:</strong> Students complete problems 1-8 on the worksheet, transitioning from basic factoring (a=1) to slightly harder equations (e.g., <em>x² - 9 = 0</em>).</p>`,
      differentiation: `<h3>Differentiation Strategy</h3>
<ul>
  <li><strong>Struggling Students:</strong> Use algebra tiles to physically manipulate and visualize the factors. Provide a step-by-step checklist card.</li>
  <li><strong>Advanced Students:</strong> Introduce equations where the leading coefficient <em>a > 1</em> (e.g., <em>2x² + 5x - 3 = 0</em>) or equations requiring rearranging terms first.</li>
</ul>`,
      assessment: "Exit Ticket: Solve the equation <em>x² - 2x - 8 = 0</em> by factoring. List the factors and the solutions."
    },
    geometry: {
      title: "The Pythagorean Theorem & Applications",
      objectives: [
        "State and prove the Pythagorean Theorem (a² + b² = c²).",
        "Calculate the length of an unknown side in a right-angled triangle.",
        "Apply the theorem to solve simple diagonal measurement problems."
      ],
      standards: "CCSS.MATH.CONTENT.8.G.B.7 - Apply the Pythagorean Theorem to determine unknown side lengths.",
      materials: ["Rulers and grid paper", "Cutout triangles for geometric proof", "Right Triangle Activity sheet"],
      warmup: "Review squares and square roots. Have students solve 3², 4², 5², and calculate √36, √100, √169.",
      instruction: `<h3>Direct Instruction (15 minutes)</h3>
<p>Define the components of a right triangle: legs (a, b) and hypotenuse (c - the side opposite the right angle).</p>
<ul>
  <li>Introduce the formula: <strong>a² + b² = c²</strong>.</li>
  <li>Show a visual geometric proof using square areas (the 3-4-5 triangle grid).</li>
  <li>Solve for the hypotenuse: Leg a=6, Leg b=8. 6² + 8² = 36 + 64 = 100. Hypotenuse = √100 = 10.</li>
  <li>Solve for a leg: Leg a=5, Hypotenuse c=13. 5² + b² = 13² => 25 + b² = 169 => b² = 144 => b = 12.</li>
</ul>`,
      practice: `<h3>Guided & Independent Practice (20 minutes)</h3>
<p><strong>Guided Practice:</strong> Model a word problem (e.g., a ladder leaning against a wall). Solve together, drawing the diagram.</p>
<p><strong>Independent Practice:</strong> Students complete practice sheet finding missing sides, including non-perfect square roots (rounding to the nearest tenth).</p>`,
      differentiation: `<h3>Differentiation Strategy</h3>
<ul>
  <li><strong>Struggling Students:</strong> Provide pre-drawn triangles with designated text boxes for a², b², and c² to structure calculations.</li>
  <li><strong>Advanced Students:</strong> Solve 3D space problems (e.g., finding the longest rod that can fit inside a rectangular box of given dimensions).</li>
</ul>`,
      assessment: "Exit Ticket: A right-angled triangle has legs of length 9cm and 12cm. Find the length of the hypotenuse."
    }
  },
  science: {
    photosynthesis: {
      title: "Photosynthesis: Capturing Solar Energy",
      objectives: [
        "Identify the inputs and outputs of the photosynthesis chemical equation.",
        "Explain the role of chloroplasts and chlorophyll in converting light energy to chemical energy.",
        "Describe how environmental factors (light, temperature, CO₂) affect the rate of photosynthesis."
      ],
      standards: "NGSS MS-LS1-6 - Construct a scientific explanation based on evidence for the role of photosynthesis in the cycling of matter and flow of energy.",
      materials: ["Elodea plants in water (for demonstration)", "Light source", "Diagrams of plant cell structures", "Photosynthesis lab guide sheets"],
      warmup: "Brainstorm session: 'What do plants need to grow, and where do they get their mass from?' Prompt students to think beyond soil.",
      instruction: `<h3>Direct Instruction (15 minutes)</h3>
<p>Present the word and chemical equations for photosynthesis:</p>
<p style="text-align: center;"><strong>Carbon Dioxide + Water + Light → Glucose + Oxygen</strong></p>
<p style="text-align: center;"><em>6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂</em></p>
<ul>
  <li>Explore cell anatomy: Focus on the chloroplast and chlorophyll pigment that absorbs red and blue light.</li>
  <li>Explain the two stages (overview): Light-dependent reactions (splitting water, releasing oxygen) and Light-independent Calvin Cycle (fixing carbon to build sugars).</li>
</ul>`,
      practice: `<h3>Guided & Independent Practice (20 minutes)</h3>
<p><strong>Guided Demonstration:</strong> Observe bubbles (oxygen gas) emerging from an aquatic Elodea plant exposed to light. Discuss what happens when the light source is moved closer or further away.</p>
<p><strong>Independent Practice:</strong> Students label diagram worksheets showing inputs/outputs of a leaf, answer comprehension questions, and graph hypothetical rate data.</p>`,
      differentiation: `<h3>Differentiation Strategy</h3>
<ul>
  <li><strong>Struggling Students:</strong> Provide color-coded cards representing Carbon, Hydrogen, Oxygen, and Light to physically assemble equation inputs and outputs.</li>
  <li><strong>Advanced Students:</strong> Research the difference between C3, C4, and CAM pathways in plants adapted to arid environments.</li>
</ul>`,
      assessment: "Quick Quiz: Write out the word equation for photosynthesis and name the plant organelle where this process takes place."
    },
    forces: {
      title: "Newton's Laws of Motion",
      objectives: [
        "Distinguish between Newton's 1st, 2nd, and 3rd laws of motion.",
        "Apply F = ma to calculate force, mass, or acceleration.",
        "Draw force diagram vectors representing balanced and unbalanced forces."
      ],
      standards: "NGSS MS-PS2-1 - Analyze data to support Newtons First and Second Laws.",
      materials: ["Spring scales", "Dynamics carts & weights", "Pulley setup", "Newton's laws workbook"],
      warmup: "Ask: 'Why do you slide forward when a car brakes suddenly?' Review the concepts of inertia and friction.",
      instruction: `<h3>Direct Instruction (15 minutes)</h3>
<p>Introduce Newton's Three Laws:</p>
<ol>
  <li><strong>First Law (Inertia):</strong> Objects at rest stay at rest, objects in motion stay in motion unless acted upon by an external net force.</li>
  <li><strong>Second Law (F=ma):</strong> Acceleration is proportional to force and inversely proportional to mass. Explain units: Newtons (N), kg, m/s².</li>
  <li><strong>Third Law (Action-Reaction):</strong> For every action, there is an equal and opposite reaction.</li>
</ol>`,
      practice: `<h3>Guided & Independent Practice (20 minutes)</h3>
<p><strong>Guided Practice:</strong> Walk through calculating the force needed to accelerate a 5kg cart at 3 m/s² (F = 5 * 3 = 15N). Draw the force diagram showing weight, normal force, applied force, and friction.</p>
<p><strong>Independent Practice:</strong> Solve physics problems using F = ma. Create simple diagrams showing vectors and calculate net forces.</p>`,
      differentiation: `<h3>Differentiation Strategy</h3>
<ul>
  <li><strong>Struggling Students:</strong> Use the formula triangle (F over m and a) to help identify algebraic steps. Provide guided diagrams.</li>
  <li><strong>Advanced Students:</strong> Solve friction-based acceleration problems (e.g., net force includes resistive friction).</li>
</ul>`,
      assessment: "Exit Ticket: Explain in terms of Newton's Third Law why a skateboard moves backward when you step off it forwards."
    }
  },
  english: {
    grammar: {
      title: "Mastering Active vs. Passive Voice",
      objectives: [
        "Differentiate between active and passive voice in sentences.",
        "Identify the subject, action, and receiver in varied sentence structures.",
        "Rewrite passive sentences into active voice to improve narrative flow and clarity."
      ],
      standards: "CCSS.ELA-LITERACY.L.8.1.D - Recognize and use active and passive verbs.",
      materials: ["Highlighting pens", "Active/Passive voice matching cards", "Interactive worksheet"],
      warmup: "Analyze two sentences on the board: 'The dog bit the mailman' vs. 'The mailman was bitten by the dog'. Ask which feels more direct and why.",
      instruction: `<h3>Direct Instruction (15 minutes)</h3>
<ul>
  <li><strong>Active Voice:</strong> The subject performs the action (e.g., <em>"The chef baked the bread."</em> - Subject is chef, action is baked, object is bread). Focus is on the doer.</li>
  <li><strong>Passive Voice:</strong> The target of the action is promoted to the subject position (e.g., <em>"The bread was baked by the chef."</em>). Often uses forms of 'to be' + past participle, and a 'by' phrase.</li>
  <li>Discuss when passive voice is appropriate (scientific writing, when the doer is unknown: <em>"The window was broken"</em>) and why active is preferred for vivid storytelling.</li>
</ul>`,
      practice: `<h3>Guided & Independent Practice (20 minutes)</h3>
<p><strong>Guided Practice:</strong> Transform 3 passive sentences to active on the board as a class, identifying the 'doer' and moving them to the front.</p>
<p><strong>Independent Practice:</strong> Students complete a conversion worksheet, editing a passive-heavy paragraph into a crisp active narrative.</p>`,
      differentiation: `<h3>Differentiation Strategy</h3>
<ul>
  <li><strong>Struggling Students:</strong> Look for the 'by zombies' trick. If you can add 'by zombies' after the verb, it is passive (e.g., 'The cake was eaten [by zombies]'). Use color-coded sentence strips.</li>
  <li><strong>Advanced Students:</strong> Analyze a professional news article. Highlight passive constructs and write an editorial explaining why the author chose passive or active voice in specific instances.</li>
</ul>`,
      assessment: "Exit Ticket: Rewrite this sentence in active voice: 'The critical report was reviewed thoroughly by the head principal.'"
    },
    analysis: {
      title: "Analyzing Literary Themes in Harper Lee's 'To Kill a Mockingbird'",
      objectives: [
        "Define 'literary theme' and differentiate it from the topic of a novel.",
        "Locate and interpret textual evidence supporting the theme of prejudice and empathy.",
        "Write a structured analytical paragraph connecting Atticus Finch's advice to Scout with the symbol of the mockingbird."
      ],
      standards: "CCSS.ELA-LITERACY.RL.9-10.2 - Determine a theme or central idea of a text and analyze in detail its development.",
      materials: ["Excerpts from Chapter 3 & Chapter 10", "Theme analysis organizer sheets", "Sticky notes"],
      warmup: "Quick Write (3 mins): 'What does it mean to walk in someone else's shoes?' Share responses briefly.",
      instruction: `<h3>Direct Instruction (15 minutes)</h3>
<ul>
  <li>Explain that theme is a universal statement or lesson about life, not just a one-word topic (e.g., instead of 'Racism', the theme is 'Prejudice can blind a community, but empathy allows individuals to understand others').</li>
  <li>Review Atticus's quote: <em>"You never really understand a person until you consider things from his point of view... until you climb into his skin and walk around in it."</em></li>
  <li>Connect the mockingbird symbol: Maudie explains that <em>"it's a sin to kill a mockingbird"</em> because they don't do harm; they only make music. Connect this to characters like Boo Radley and Tom Robinson.</li>
</ul>`,
      practice: `<h3>Guided & Independent Practice (20 minutes)</h3>
<p><strong>Guided Practice:</strong> Fill in a theme organizer chart mapping the symbol of the mockingbird to Tom Robinson, utilizing direct quotes from Chapter 10.</p>
<p><strong>Independent Practice:</strong> Students draft an analytical paragraph using the C.E.R. (Claim, Evidence, Reasoning) model to argue how Boo Radley serves as a symbolic mockingbird.</p>`,
      differentiation: `<h3>Differentiation Strategy</h3>
<ul>
  <li><strong>Struggling Students:</strong> Provide fill-in-the-blank C.E.R. sentence frames and pre-selected quotes with page numbers.</li>
  <li><strong>Advanced Students:</strong> Draw comparisons between Boo Radley and Tom Robinson, analyzing why one is protected by the community while the other is condemned, citing textual nuances.</li>
</ul>`,
      assessment: "Exit Ticket: Write a one-sentence theme statement for 'To Kill a Mockingbird' regarding the nature of empathy."
    }
  }
};

export const quizTemplates = {
  math: {
    algebra: [
      {
        question: "What is the standard form of a quadratic equation?",
        type: "mc",
        options: ["ax + b = 0", "ax² + bx + c = 0", "y = mx + b", "a² + b² = c²"],
        answer: "ax² + bx + c = 0"
      },
      {
        question: "What are the roots of the equation x² - 5x + 6 = 0?",
        type: "mc",
        options: ["x = 2 and x = 3", "x = -2 and x = -3", "x = 1 and x = 6", "x = -1 and x = -6"],
        answer: "x = 2 and x = 3"
      },
      {
        question: "According to the Zero Product Property, if A × B = 0, what must be true?",
        type: "mc",
        options: ["A must be 0", "B must be 0", "Both A and B must be 0", "A = 0 or B = 0"],
        answer: "A = 0 or B = 0"
      },
      {
        question: "Solve the quadratic equation x² - 9 = 0.",
        type: "mc",
        options: ["x = 9", "x = 3", "x = 3 and x = -3", "x = 4.5 and x = -4.5"],
        answer: "x = 3 and x = -3"
      },
      {
        question: "True or False: A quadratic equation always has exactly two distinct real roots.",
        type: "tf",
        options: ["True", "False"],
        answer: "False"
      }
    ],
    geometry: [
      {
        question: "Which side of a right triangle is the hypotenuse?",
        type: "mc",
        options: ["The shortest side", "The side adjacent to the right angle", "The side opposite the right angle", "The vertical side"],
        answer: "The side opposite the right angle"
      },
      {
        question: "A right triangle has legs of length 3 and 4. What is the length of the hypotenuse?",
        type: "mc",
        options: ["5", "7", "12", "25"],
        answer: "5"
      },
      {
        question: "If a = 5 and c = 13 in the Pythagorean theorem (a² + b² = c²), what is the value of b?",
        type: "mc",
        options: ["8", "12", "144", "18"],
        answer: "12"
      },
      {
        question: "True or False: The Pythagorean Theorem can be applied to acute and obtuse triangles.",
        type: "tf",
        options: ["True", "False"],
        answer: "False"
      },
      {
        question: "A ladder is placed against a wall. The foot of the ladder is 6 feet from the wall, and it reaches 8 feet up. How long is the ladder?",
        type: "mc",
        options: ["14 feet", "10 feet", "12 feet", "7.5 feet"],
        answer: "10 feet"
      }
    ]
  },
  science: {
    photosynthesis: [
      {
        question: "Which organelle is the primary site of photosynthesis in plant cells?",
        type: "mc",
        options: ["Mitochondrion", "Chloroplast", "Nucleus", "Ribosome"],
        answer: "Chloroplast"
      },
      {
        question: "What green pigment absorbs light energy during photosynthesis?",
        type: "mc",
        options: ["Carotenoid", "Chlorophyll", "Hemoglobin", "Melanin"],
        answer: "Chlorophyll"
      },
      {
        question: "Which of the following are the primary reactants (inputs) of photosynthesis?",
        type: "mc",
        options: ["Glucose and Oxygen", "Carbon Dioxide and Water", "Oxygen and Carbon Dioxide", "Glucose and Water"],
        answer: "Carbon Dioxide and Water"
      },
      {
        question: "What is the primary gas released as a byproduct of photosynthesis?",
        type: "mc",
        options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Hydrogen"],
        answer: "Oxygen"
      },
      {
        question: "True or False: Plants perform photosynthesis only during the day, and do not perform cellular respiration.",
        type: "tf",
        options: ["True", "False"],
        answer: "False"
      }
    ],
    forces: [
      {
        question: "Newton's First Law is also known as the Law of what?",
        type: "mc",
        options: ["Gravity", "Inertia", "Acceleration", "Momentum"],
        answer: "Inertia"
      },
      {
        question: "What is the equation representing Newton's Second Law?",
        type: "mc",
        options: ["E = mc²", "a² + b² = c²", "F = ma", "v = d/t"],
        answer: "F = ma"
      },
      {
        question: "How much force is required to accelerate a 10kg mass at 4 m/s²?",
        type: "mc",
        options: ["2.5 N", "14 N", "40 N", "0.4 N"],
        answer: "40 N"
      },
      {
        question: "True or False: Balanced forces acting on an object cause the object to accelerate.",
        type: "tf",
        options: ["True", "False"],
        answer: "False"
      },
      {
        question: "Newton's Third Law states: 'For every action, there is an...'",
        type: "mc",
        options: ["unequal and direct reaction", "equal and opposite reaction", "equivalent force in the same direction", "increase in overall entropy"],
        answer: "equal and opposite reaction"
      }
    ]
  },
  english: {
    grammar: [
      {
        question: "Which of the following sentences is written in the active voice?",
        type: "mc",
        options: ["The book was read by the student.", "The student read the book.", "The book has been read.", "Reading books is done by students."],
        answer: "The student read the book."
      },
      {
        question: "Identify the passive sentence in the options below.",
        type: "mc",
        options: ["The chef prepared a five-star meal.", "The meal was prepared by the five-star chef.", "The chef is preparing the meal now.", "The chef will prepare a meal."],
        answer: "The meal was prepared by the five-star chef."
      },
      {
        question: "Rewrite in active voice: 'The trophy was won by the school team.'",
        type: "mc",
        options: ["The school team won the trophy.", "Winning the trophy was the school team.", "The trophy has been won by our team.", "The school team is winning the trophy."],
        answer: "The school team won the trophy."
      },
      {
        question: "True or False: Passive voice should always be avoided in scientific report writing.",
        type: "tf",
        options: ["True", "False"],
        answer: "False"
      },
      {
        question: "What grammatical auxiliary verb is typically associated with passive voice constructs?",
        type: "mc",
        options: ["to do", "to have", "to be", "to go"],
        answer: "to be"
      }
    ],
    analysis: [
      {
        question: "What is a literary theme?",
        type: "mc",
        options: ["The list of main characters", "The sequence of events (plot)", "The central message or universal truth of the text", "The settings where the story takes place"],
        answer: "The central message or universal truth of the text"
      },
      {
        question: "Why is it considered 'a sin to kill a mockingbird' in the novel?",
        type: "mc",
        options: ["Mockingbirds are endangered species.", "They sing beautiful songs and cause no harm to gardens or crops.", "They are sacred religious symbols in Alabama.", "Atticus Finch dislikes hunting in general."],
        answer: "They sing beautiful songs and cause no harm to gardens or crops."
      },
      {
        question: "Whose advice forms the core message of empathy: '...climb into his skin and walk around in it'?",
        type: "mc",
        options: ["Calpurnia", "Aunt Alexandra", "Atticus Finch", "Heck Tate"],
        answer: "Atticus Finch"
      },
      {
        question: "Which character represents a symbolic mockingbird?",
        type: "mc",
        options: ["Bob Ewell", "Boo Radley", "Miss Stephanie", "Cecil Jacobs"],
        answer: "Boo Radley"
      },
      {
        question: "True or False: A novel can only have a single, definitive theme.",
        type: "tf",
        options: ["True", "False"],
        answer: "False"
      }
    ]
  }
};

export const markingTemplates = {
  essay_rubrics: {
    argumentative: {
      name: "Argumentative Essay Rubric",
      criteria: [
        { name: "Thesis & Focus", max: 25, description: "Clear, arguable, and prominent thesis statement; stays focused on the central prompt." },
        { name: "Evidence & Support", max: 30, description: "Relevant textual evidence, statistics, or logical reasoning; integration and citation quality." },
        { name: "Structure & Coherence", max: 25, description: "Logical transitions between paragraphs, structured introduction, body, and conclusion." },
        { name: "Mechanics & Style", max: 20, description: "Spelling, punctuation, sentence variety, formal tone, and grammatical accuracy." }
      ]
    },
    analytical: {
      name: "Literary Analysis Rubric",
      criteria: [
        { name: "Insight & Analysis", max: 30, description: "Depth of interpretation, understanding of symbols/themes, and critical reasoning." },
        { name: "Evidence & Quotes", max: 25, description: "Direct quotes from source materials; analysis of syntax or literary devices." },
        { name: "Organization", max: 25, description: "Introduction sets up clear claim, transitions build ideas, conclusion sums up value of analysis." },
        { name: "Grammar & Academic Tone", max: 20, description: "Sophisticated vocabulary, active voice, standard academic formatting and styling." }
      ]
    }
  },
  submissions: [
    {
      id: "sub_01",
      studentId: "std_01",
      subject: "english",
      topic: "analysis",
      rubricId: "analytical",
      prompt: "Explain how Boo Radley serves as a symbolic mockingbird in 'To Kill a Mockingbird'. Support your answer with textual evidence.",
      content: `In Harper Lee's masterpiece 'To Kill a Mockingbird', the central symbol is established through Atticus and Miss Maudie's explanation that "it's a sin to kill a mockingbird" because mockingbirds do nothing but produce beautiful music for people to enjoy. Arthur "Boo" Radley fits this definition perfectly. He is a pure, harmless individual who has been deeply damaged by his environment but continues to perform quiet acts of kindness.

First, Boo Radley's actions are entirely benevolent and protective. Throughout the novel, he leaves gifts in the oak tree knot-hole for Jem and Scout, mends Jem's torn pants, and wraps a blanket around Scout during the fire at Maudie's house. These actions mirror the mockingbird's song—simple gifts of beauty and warmth. Ultimately, Boo saves Jem and Scout from the murderous Bob Ewell, risking his safety to protect the children.

At the end of the novel, Sheriff Heck Tate decides to report that Bob Ewell fell on his own knife, shielding Boo from the public spotlight. Scout remarks that dragooning Boo into the limelight would be "sort of like shootin' a mockingbird." Heck Tate's choice highlights the need to protect vulnerable innocents from a cruel society. By comparing Boo Radley to a mockingbird, Harper Lee reinforces the theme that society must protect its gentlest souls rather than exposing them to prejudice or gossip.`,
      simulatedGrading: {
        score: 96,
        criteriaScores: {
          "Insight & Analysis": 29,
          "Evidence & Quotes": 24,
          "Organization": 24,
          "Grammar & Academic Tone": 19
        },
        feedback: "Excellent work, Alexander! Your analysis is sophisticated and well-grounded in the text. You integrate direct quotes seamlessly and draw a highly logical connection between Boo's benevolent actions and the mockingbird symbol. Your writing style is highly academic and shows strong critical thinking skills. To improve even further, try to expand slightly on how the town's gossipy perception of Boo contrasts with his true nature in the final paragraph."
      }
    },
    {
      id: "sub_02",
      studentId: "std_03",
      subject: "english",
      topic: "analysis",
      rubricId: "analytical",
      prompt: "Explain how Boo Radley serves as a symbolic mockingbird in 'To Kill a Mockingbird'. Support your answer with textual evidence.",
      content: `Boo Radley is like a mockingbird in the book. Mockingbirds are nice birds that just sing and don't hurt anyone. Atticus says don't kill them.

Boo Radley is nice too. He leaves stuff in the tree for Scout and Jem. He leaves soap figures and gum. He also puts a blanket on Scout when it was cold during the fire. Jem got his pants stuck on the fence when they snuck into the Radley yard, and Boo fixed them up. This shows he is not a monster like the town says.

Also, at the end Bob Ewell tries to hurt the kids and Boo stops him. He kills Bob Ewell to save them. The sheriff says Ewell fell on his knife because he doesn't want Boo to get in trouble. Scout says if they made Boo famous it would be like killing a mockingbird. So Boo is the mockingbird because he is a good guy who did not do anything bad but got treated badly by the town.`,
      simulatedGrading: {
        score: 72,
        criteriaScores: {
          "Insight & Analysis": 21,
          "Evidence & Quotes": 18,
          "Organization": 18,
          "Grammar & Academic Tone": 15
        },
        feedback: "Good effort, Charles! You have identified the key points of the novel well, including the gifts in the tree, the blanket, the pants, and the saving of the children. However, your analysis remains a bit superficial. To improve, try incorporating direct textual quotes (with page numbers or exact phrases) rather than just summarizing the plot. Also, work on varying your sentence structures and maintaining a more formal academic tone (avoid casual phrasing like 'leaves stuff' or 'good guy')."
      }
    },
    {
      id: "sub_03",
      studentId: "std_02",
      subject: "english",
      topic: "analysis",
      rubricId: "analytical",
      prompt: "Explain how Boo Radley serves as a symbolic mockingbird in 'To Kill a Mockingbird'. Support your answer with textual evidence.",
      content: `In 'To Kill a Mockingbird', Harper Lee uses the mockingbird to represent innocent people who only do good. Arthur "Boo" Radley is a primary example of this. Even though the kids are scared of him and think he is a monster, Boo shows that he is actually caring and harmless.

Boo acts like a mockingbird when he interacts with Jem and Scout. He leaves gifts in the tree, like chewing gum and a broken pocket watch. When Scout is cold, he wraps a blanket around her without her noticing. These small things prove he is kind. Later, he protects them from Bob Ewell. Without Boo, Jem and Scout might have died.

At the end, Scout understands Boo. When Atticus asks if she understands why the sheriff is lying about Ewell's death, she says that telling the town about Boo would be 'like shooting a mockingbird'. Boo Radley is a mockingbird because he only does good things for the kids, and putting him in the news would destroy his peaceful, quiet life.`,
      simulatedGrading: {
        score: 84,
        criteriaScores: {
          "Insight & Analysis": 25,
          "Evidence & Quotes": 21,
          "Organization": 21,
          "Grammar & Academic Tone": 17
        },
        feedback: "Well done, Beatrix! This is a solid, well-organized essay that shows a clear understanding of the symbol. You've structured your paragraphs nicely and hit all the key narrative milestones. Your integration of the quote at the end is strong. To reach the next grade tier, try analyzing *why* the town's prejudice makes it dangerous for Boo to be exposed, and integrate one or two more direct quotes to back up your descriptions of his gifts."
      }
    }
  ]
};
