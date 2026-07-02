// AI Generation Engine supporting local simulation and direct Gemini API queries

import { lessonPlanTemplates, quizTemplates, markingTemplates } from './templates.js';

// Call Gemini API client-side if a key is provided
async function callGemini(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });
  
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'Failed to connect to Gemini API');
  }
  
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ----------------------------------------------------
// Lesson Plan Generation
// ----------------------------------------------------
export async function generateLessonPlan({ subject, topic, grade, duration, learningStyle, apiKey }) {
  if (apiKey) {
    const prompt = `Generate a structured, professional lesson plan for:
Subject: ${subject}
Topic: ${topic}
Grade Level: ${grade}
Duration: ${duration}
Learning Style focus: ${learningStyle}
Please format your response in clean HTML (using h3, h4, p, ul, li, strong tags - no outer html, head or body tags) containing the following sections:
- Title
- Objectives (bullet points)
- Standards (academic alignment)
- Materials Needed
- Warm-up Activity (5-10 mins)
- Direct Instruction (detailed walkthrough)
- Guided & Independent Practice
- Differentiation Strategy (for struggling vs advanced learners)
- Assessment / Exit Ticket`;

    try {
      const htmlContent = await callGemini(prompt, apiKey);
      return {
        title: `Lesson Plan: ${topic}`,
        html: htmlContent,
        metadata: { subject, topic, grade, duration, learningStyle, isSimulated: false }
      };
    } catch (e) {
      console.warn("Gemini API error, falling back to simulated generation:", e);
      // Fallback to simulation
    }
  }

  // Simulation Mode
  await new Promise(r => setTimeout(r, 1500)); // Mock network lag
  
  const subKey = subject.toLowerCase();
  const topKey = topic.toLowerCase().replace(/\s+/g, '');
  
  let baseTemplate = null;
  // Try to find matching template
  if (lessonPlanTemplates[subKey] && lessonPlanTemplates[subKey][topKey]) {
    baseTemplate = lessonPlanTemplates[subKey][topKey];
  } else {
    // Generate a fallback procedural template
    baseTemplate = generateProceduralLesson(subject, topic, grade);
  }

  // Inject learning style custom recommendation
  const styleInjects = {
    visual: "<li><strong>Visual Focus:</strong> Use color-coded diagrams, concept maps on the board, and step-by-step infographic handouts.</li>",
    auditory: "<li><strong>Auditory Focus:</strong> Pair students up for conversational reviews, conduct a class debate, or read text excerpts aloud.</li>",
    reading: "<li><strong>Reading/Writing Focus:</strong> Allocate 7 minutes for silent journaling, read a descriptive passage, or complete a written vocabulary table.</li>",
    kinesthetic: "<li><strong>Kinesthetic Focus:</strong> Students perform physical demonstrations, manipulate models/tiles, or participate in a matching card gallery walk.</li>"
  };

  const styleText = styleInjects[learningStyle] || "";
  
  const fullHtml = `
    <h2>${baseTemplate.title}</h2>
    <p><strong>Grade Level:</strong> ${grade} | <strong>Duration:</strong> ${duration} | <strong>Focus Style:</strong> ${learningStyle.toUpperCase()}</p>
    <hr>
    <h3>Objectives</h3>
    <ul>
      ${baseTemplate.objectives.map(o => `<li>${o}</li>`).join('')}
    </ul>
    
    <h3>Standards & Alignments</h3>
    <p><em>${baseTemplate.standards}</em></p>
    
    <h3>Materials Needed</h3>
    <ul>
      ${baseTemplate.materials.map(m => `<li>${m}</li>`).join('')}
    </ul>
    
    <h3>Warm-Up (5-10 minutes)</h3>
    <p>${baseTemplate.warmup}</p>
    
    ${baseTemplate.instruction}
    
    ${baseTemplate.practice}
    
    <h3>Differentiation Strategy</h3>
    <ul>
      ${styleText}
      <li><strong>Struggling Students:</strong> Break worksheets into smaller steps. Offer visual scaffolding and one-on-one guide sheets.</li>
      <li><strong>Advanced Students:</strong> Provide extension assignments, independent study packets, or ask them to peer-tutor classmates.</li>
    </ul>
    
    <h3>Assessment & Reflection</h3>
    <p>${baseTemplate.assessment}</p>
  `;

  return {
    title: baseTemplate.title,
    html: fullHtml,
    metadata: { subject, topic, grade, duration, learningStyle, isSimulated: true }
  };
}

function generateProceduralLesson(subject, topic, grade) {
  const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  return {
    title: `${capitalizedTopic}: Core Fundamentals`,
    objectives: [
      `Define and explain the key concepts of ${topic} at a ${grade} level.`,
      `Apply core principles of ${topic} to solve problems or analyze scenarios.`,
      `Discuss the relevance of ${topic} to everyday situations.`
    ],
    standards: `GEN.ED.STD.${subject.toUpperCase().substring(0,3)}.01 - Understand and apply core concepts of ${capitalizedTopic}.`,
    materials: [`Interactive slides on ${topic}`, `${capitalizedTopic} review worksheets`, `Student writing journals`, `Graphic organizers`],
    warmup: `Ask students: "What do you think of when you hear the term '${topic}'?" Write their keywords on the board.`,
    instruction: `<h3>Direct Instruction (15 minutes)</h3>
<p>Introduce the lesson topic: <strong>${capitalizedTopic}</strong>. Explain its foundation and importance within ${subject}.</p>
<ul>
  <li>Define key vocabulary terms related to ${topic}.</li>
  <li>Walk through two practical examples on the whiteboard step-by-step.</li>
  <li>Ask concept check questions to ensure students are following before moving to practice.</li>
</ul>`,
    practice: `<h3>Guided & Independent Practice (20 minutes)</h3>
<p><strong>Guided Practice:</strong> Complete a matching activity or solve the first three worksheet problems as a class.</p>
<p><strong>Independent Practice:</strong> Students work individually or in pairs to complete the ${capitalizedTopic} practice sheet, demonstrating mastery of the concepts.</p>`,
    assessment: `Exit Ticket: Write down one major takeaway and one question you still have about ${capitalizedTopic}.`
  };
}

// ----------------------------------------------------
// Quiz Generation
// ----------------------------------------------------
export async function generateQuiz({ subject, topic, grade, numQuestions, type, apiKey }) {
  if (apiKey) {
    const prompt = `Generate a quiz based on:
Subject: ${subject}
Topic: ${topic}
Grade: ${grade}
Number of Questions: ${numQuestions}
Quiz Type: ${type === 'mc' ? 'Multiple Choice' : 'True/False'}
Return ONLY a valid JSON array of question objects (do not wrap in markdown \`\`\`json blocks). Each object must have:
- question: (string)
- type: (string "mc" or "tf")
- options: (array of strings, e.g. 4 options for mc, 2 options for tf)
- answer: (string, must exactly match one of the options)`;

    try {
      const jsonText = await callGemini(prompt, apiKey);
      // Clean potential JSON markdown blocks
      const cleanJson = jsonText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const questions = JSON.parse(cleanJson);
      return {
        title: `${topic} Quiz (${grade})`,
        questions,
        metadata: { subject, topic, grade, type, isSimulated: false }
      };
    } catch (e) {
      console.warn("Gemini API error, falling back to simulated quiz:", e);
    }
  }

  // Simulation Mode
  await new Promise(r => setTimeout(r, 1200));

  const subKey = subject.toLowerCase();
  const topKey = topic.toLowerCase().replace(/\s+/g, '');
  
  let sourceQuestions = [];
  if (quizTemplates[subKey] && quizTemplates[subKey][topKey]) {
    sourceQuestions = quizTemplates[subKey][topKey];
  } else {
    sourceQuestions = generateProceduralQuizQuestions(subject, topic, type);
  }

  // Filter by type if requested
  let filtered = sourceQuestions;
  if (type !== 'any') {
    filtered = sourceQuestions.filter(q => q.type === type);
    // If we filtered out too many, generate procedural ones of that type
    while (filtered.length < numQuestions) {
      filtered.push(generateSingleProceduralQuestion(topic, type, filtered.length + 1));
    }
  }

  // Slice to requested length
  const finalQuestions = filtered.slice(0, numQuestions);

  return {
    title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz`,
    questions: finalQuestions,
    metadata: { subject, topic, grade, type, isSimulated: true }
  };
}

function generateProceduralQuizQuestions(subject, topic, type) {
  const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
  return [
    {
      question: `What is the primary definition of ${cap}?`,
      type: "mc",
      options: [
        `A fundamental principle explaining processes related to ${topic}`,
        `A historical document detailing ancient events`,
        `A mathematical constant used to compute coordinates`,
        `An obsolete theory that has been disproven`
      ],
      answer: `A fundamental principle explaining processes related to ${topic}`
    },
    {
      question: `Which of the following is most closely associated with ${cap}?`,
      type: "mc",
      options: [
        `The chemical synthesis of elements`,
        `Core components and rules of ${topic}`,
        `Standard gravity equations`,
        `The grammatical rules of syntax`
      ],
      answer: `Core components and rules of ${topic}`
    },
    {
      question: `True or False: The study of ${topic} is critical to modern academic fields.`,
      type: "tf",
      options: ["True", "False"],
      answer: "True"
    },
    {
      question: `What is a primary advantage of analyzing ${cap}?`,
      type: "mc",
      options: [
        `It makes complex systems easy to predict and categorize.`,
        `It requires no intellectual effort.`,
        `It solves global energy issues immediately.`,
        `It replaces the need for empirical experiments.`
      ],
      answer: `It makes complex systems easy to predict and categorize.`
    },
    {
      question: `True or False: ${cap} is dynamic and changes as new scientific or academic evidence emerges.`,
      type: "tf",
      options: ["True", "False"],
      answer: "True"
    }
  ];
}

function generateSingleProceduralQuestion(topic, type, index) {
  const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
  if (type === 'tf') {
    return {
      question: `True or False: Concept ${index} regarding ${cap} has been validated by researchers.`,
      type: "tf",
      options: ["True", "False"],
      answer: "True"
    };
  } else {
    return {
      question: `What is the primary role of component ${index} in ${cap}?`,
      type: "mc",
      options: [
        `To regulate and optimize ${topic} systems`,
        `To disrupt active circuits`,
        `To balance simple equations`,
        `To construct grammatical sentences`
      ],
      answer: `To regulate and optimize ${topic} systems`
    };
  }
}

// ----------------------------------------------------
// Assignment Marking
// ----------------------------------------------------
export async function gradeAssignment({ subject, topic, rubricId, studentName, content, apiKey }) {
  const rubric = markingTemplates.essay_rubrics[rubricId] || {
    name: "General Rubric",
    criteria: [
      { name: "Content & Accuracy", max: 40 },
      { name: "Structure & Style", max: 30 },
      { name: "Grammar & Formatting", max: 30 }
    ]
  };

  if (apiKey) {
    const prompt = `Grade the following student assignment.
Student Name: ${studentName}
Subject: ${subject}
Topic: ${topic}
Assignment Submission Content:
"""
${content}
"""

Rubric Criteria:
${rubric.criteria.map(c => `- ${c.name} (Max Score: ${c.max} points): ${c.description || ''}`).join('\n')}

Analyze the submission. Give exact scores for each criteria and return a JSON object ONLY (no markdown formatting). The JSON must look like:
{
  "score": (number, the sum of criteria scores),
  "criteriaScores": {
    "${rubric.criteria[0].name}": (number),
    ...
  },
  "feedback": "(string, constructive paragraph of feedback addressing the student by name)"
}`;

    try {
      const jsonText = await callGemini(prompt, apiKey);
      const cleanJson = jsonText.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson);
    } catch (e) {
      console.warn("Gemini API error, falling back to simulated marking:", e);
    }
  }

  // Simulation Mode
  await new Promise(r => setTimeout(r, 2000));

  // Try to find standard template matches first
  const match = markingTemplates.submissions.find(s => 
    content.trim().substring(0, 50).toLowerCase() === s.content.trim().substring(0, 50).toLowerCase()
  );

  if (match) {
    return {
      score: match.simulatedGrading.score,
      criteriaScores: match.simulatedGrading.criteriaScores,
      feedback: match.simulatedGrading.feedback.replace("Alexander", studentName).replace("Charles", studentName).replace("Beatrix", studentName)
    };
  }

  // Procedural scoring based on text analysis
  const wordCount = content.trim().split(/\s+/).length;
  let rawQuality = 0.75; // Baseline

  // Simple heuristics for demo
  if (wordCount < 50) rawQuality = 0.50; // Too short
  else if (wordCount > 150) rawQuality = 0.88; // Good length
  
  if (content.includes("because") || content.includes("therefore") || content.includes("evidence")) {
    rawQuality += 0.08; // Analytical keywords
  }
  
  // Cap quality
  rawQuality = Math.min(0.98, Math.max(0.40, rawQuality));

  const criteriaScores = {};
  let calculatedScore = 0;

  rubric.criteria.forEach(c => {
    // Add small random noise to make it feel natural
    const noise = (Math.random() * 0.1) - 0.05;
    const critQuality = Math.min(1.0, Math.max(0.3, rawQuality + noise));
    const score = Math.round(c.max * critQuality);
    criteriaScores[c.name] = score;
    calculatedScore += score;
  });

  const feedbackText = generateProceduralFeedback(studentName, topic, calculatedScore, wordCount);

  return {
    score: calculatedScore,
    criteriaScores,
    feedback: feedbackText
  };
}

function generateProceduralFeedback(studentName, topic, score, wordCount) {
  const greeting = `Hi ${studentName},\n\n`;
  if (score >= 90) {
    return greeting + `Exceptional work on your '${topic}' assignment! You demonstrate a deep understanding of the concepts and support your ideas with logical structure. Your writing length (${wordCount} words) is perfect, and your reasoning is clean and accurate. Keep up the high standard!`;
  } else if (score >= 80) {
    return greeting + `Solid submission for the '${topic}' prompt. Your core concepts are correct, and you structured your points clearly. To get to the top tier, try adding more specific evidence or expanding on your explanation details. Good job overall!`;
  } else if (score >= 70) {
    return greeting + `Good attempt. You have captured the main ideas of '${topic}', but your explanations could be deeper and more detailed. I suggest checking your spellings and making sure every claim you make has evidence backing it up. Let's work together to boost this in the next topic.`;
  } else {
    return greeting + `Thank you for submitting your work on '${topic}'. The essay is a bit short (${wordCount} words) and leaves out several key points of the rubric. I would like you to review the lesson notes and schedule a brief tutoring session with me so we can go over these concepts together.`;
  }
}
