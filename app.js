// Central Application Orchestrator

import { 
  initStore, 
  getStudents, 
  getLessons, 
  getQuizzes, 
  getGrades, 
  getSettings, 
  saveLesson, 
  saveQuiz, 
  saveGradedAssignment, 
  saveSettings, 
  resetAllData 
} from './js/data-store.js';

import { 
  generateLessonPlan, 
  generateQuiz, 
  gradeAssignment 
} from './js/ai-engine.js';

import { 
  renderClassDistribution, 
  renderSubjectAverages, 
  renderStudentTrend 
} from './js/analytics.js';

import { markingTemplates } from './js/templates.js';

// Application State
let activeView = 'dashboard';
let currentGeneratedLesson = null;
let currentGeneratedQuiz = null;
let currentGeneratedMarking = null;
let currentPlaytestQuiz = null;
let currentPlaytestState = {
  questionIndex: 0,
  score: 0,
  answers: []
};

// ----------------------------------------------------
// Initialization
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initStore();
  setupUITheme();
  setupNavigation();
  setupDevicePreview();
  setupDashboard();
  setupLessonPlanner();
  setupQuizGenerator();
  setupAssignmentMarker();
  setupStudentAnalytics();
  setupSettings();
  
  // Set up responsive canvas layout on load and window resize
  window.addEventListener('resize', handleCanvasResize);
  handleCanvasResize();
});

// ----------------------------------------------------
// UI Theme Orchestration
// ----------------------------------------------------
function setupUITheme() {
  const settings = getSettings();
  applyTheme(settings.theme);

  const themeToggleBtn = document.getElementById('theme-toggle');
  themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    const isLight = body.classList.contains('light-theme');
    const newTheme = isLight ? 'dark' : 'light';
    applyTheme(newTheme);
    
    // Save to settings
    const currentSettings = getSettings();
    currentSettings.theme = newTheme;
    saveSettings(currentSettings);
  });
}

function applyTheme(theme) {
  const sunIcon = document.getElementById('theme-sun');
  const moonIcon = document.getElementById('theme-moon');
  const themeSelect = document.getElementById('settings-theme-select');

  if (theme === 'light') {
    document.body.classList.add('light-theme');
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
    if (themeSelect) themeSelect.value = 'light';
  } else {
    document.body.classList.remove('light-theme');
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
    if (themeSelect) themeSelect.value = 'dark';
  }
}

// ----------------------------------------------------
// Sidebar Router & Navigation
// ----------------------------------------------------
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-list .nav-item, .sidebar-footer .nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-target');
      if (!target) return;
      switchView(target);
    });
  });
}

function switchView(viewName) {
  activeView = viewName;
  
  // Update sidebar active states
  document.querySelectorAll('.nav-list .nav-item, .sidebar-footer .nav-item').forEach(item => {
    if (item.getAttribute('data-target') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Switch View Visibility
  document.querySelectorAll('.view-section').forEach(sec => {
    if (sec.id === `view-${viewName}`) {
      sec.classList.add('active');
    } else {
      sec.classList.remove('active');
    }
  });

  // Update Page Title
  const titleMap = {
    dashboard: 'Dashboard Overview',
    lessons: 'AI Lesson Architect',
    quizzes: 'AI Quiz Builder',
    grading: 'AI Assignment Marking',
    analytics: 'Student Performance Analytics',
    settings: 'System Settings'
  };
  document.getElementById('page-title').textContent = titleMap[viewName] || 'Teacher Assistant AI';

  // Specific View Entry Hooks
  if (viewName === 'dashboard') {
    refreshDashboardStats();
  } else if (viewName === 'analytics') {
    renderRosterTable();
    document.getElementById('roster-view-panel').style.display = 'block';
    document.getElementById('student-profile-panel').style.display = 'none';
  } else if (viewName === 'grading') {
    populateGradingStudents();
  }
}

// ----------------------------------------------------
// Mobile Device Frame Preview Logic
// ----------------------------------------------------
function setupDevicePreview() {
  const layoutWrapper = document.getElementById('layout-wrapper');
  const previewToggle = document.getElementById('preview-toggle');
  const disablePreviewBtn = document.getElementById('disable-preview-btn');
  const scaleSlider = document.getElementById('device-scale-slider');
  const zoomLabel = document.getElementById('zoom-value-label');
  const deviceSelect = document.getElementById('device-width-select');
  const deviceFrame = document.getElementById('device-frame');

  // Toggle Preview Mode
  const togglePreview = () => {
    const isActive = layoutWrapper.classList.contains('device-preview-active');
    if (isActive) {
      layoutWrapper.classList.remove('device-preview-active');
      deviceFrame.style.transform = 'none';
      deviceFrame.style.width = '100%';
      deviceFrame.style.height = '100%';
      deviceFrame.style.border = 'none';
      deviceFrame.style.borderRadius = '0';
      deviceFrame.style.boxShadow = 'none';
      document.getElementById('device-notch').style.display = 'none';
    } else {
      layoutWrapper.classList.add('device-preview-active');
      document.getElementById('device-notch').style.display = 'block';
      deviceFrame.style.border = '12px solid #1f2937';
      deviceFrame.style.borderRadius = '40px';
      deviceFrame.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 0 4px #4b5563';
      updateDeviceSize();
      applyDeviceZoom();
    }
    handleCanvasResize();
  };

  previewToggle.addEventListener('click', togglePreview);
  disablePreviewBtn.addEventListener('click', togglePreview);

  // Scale Change
  scaleSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    zoomLabel.textContent = `${Math.round(val * 100)}%`;
    applyDeviceZoom();
  });

  // Preset Device Select
  deviceSelect.addEventListener('change', () => {
    updateDeviceSize();
    applyDeviceZoom();
  });
}

function updateDeviceSize() {
  const deviceSelect = document.getElementById('device-width-select');
  const deviceFrame = document.getElementById('device-frame');
  const [width, height] = deviceSelect.value.split('x');
  
  if (document.getElementById('layout-wrapper').classList.contains('device-preview-active')) {
    deviceFrame.style.width = `${width}px`;
    deviceFrame.style.height = `${height}px`;
  }
}

function applyDeviceZoom() {
  const layoutWrapper = document.getElementById('layout-wrapper');
  if (!layoutWrapper.classList.contains('device-preview-active')) return;

  const deviceFrame = document.getElementById('device-frame');
  const scaleVal = document.getElementById('device-scale-slider').value;
  
  deviceFrame.style.transform = `scale(${scaleVal})`;
  deviceFrame.style.transformOrigin = 'center center';
}

function handleCanvasResize() {
  // Center alignment styling adjustments if needed dynamically
  applyDeviceZoom();
}

// ----------------------------------------------------
// View Module: Dashboard
// ----------------------------------------------------
function setupDashboard() {
  refreshDashboardStats();
}

function refreshDashboardStats() {
  const students = getStudents();
  const lessons = getLessons();
  const quizzes = getQuizzes();
  const grades = getGrades();

  // Update counter badges
  document.getElementById('stat-students-count').textContent = students.length;
  document.getElementById('stat-lessons-count').textContent = lessons.length;
  document.getElementById('stat-quizzes-count').textContent = quizzes.length;
  document.getElementById('stat-grades-count').textContent = grades.length;

  // Render SVG statistics charts
  const distContainer = document.getElementById('distribution-chart-container');
  const subContainer = document.getElementById('subject-chart-container');
  
  renderClassDistribution(students, distContainer);
  renderSubjectAverages(students, subContainer);
}

// ----------------------------------------------------
// View Module: Lesson Planner
// ----------------------------------------------------
function setupLessonPlanner() {
  const form = document.getElementById('lesson-planner-form');
  const generateBtn = document.getElementById('generate-lesson-btn');
  const saveBtn = document.getElementById('save-lesson-btn');
  const copyBtn = document.getElementById('copy-lesson-btn');
  const printBtn = document.getElementById('print-lesson-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const subject = document.getElementById('lesson-subject').value;
    const topic = document.getElementById('lesson-topic').value.trim();
    const grade = document.getElementById('lesson-grade').value;
    const duration = document.getElementById('lesson-duration').value;
    const learningStyle = document.getElementById('lesson-style').value;
    const settings = getSettings();

    // Toggle panels to loading
    document.getElementById('lesson-form-panel').style.display = 'none';
    document.getElementById('lesson-loader').style.display = 'flex';
    document.getElementById('lesson-result-panel').style.display = 'none';

    try {
      currentGeneratedLesson = await generateLessonPlan({
        subject,
        topic,
        grade,
        duration,
        learningStyle,
        apiKey: settings.apiKey
      });

      // Show results
      document.getElementById('lesson-output-container').innerHTML = currentGeneratedLesson.html;
      document.getElementById('lesson-loader').style.display = 'none';
      document.getElementById('lesson-result-panel').style.display = 'block';
    } catch (err) {
      alert(`AI architect encountered an issue: ${err.message}`);
      document.getElementById('lesson-loader').style.display = 'none';
      document.getElementById('lesson-form-panel').style.display = 'block';
    }
  });

  // Save Lesson
  saveBtn.addEventListener('click', () => {
    if (!currentGeneratedLesson) return;
    saveLesson(currentGeneratedLesson);
    alert('Lesson Plan saved successfully to local repository!');
    switchView('dashboard');
    // Reset views
    document.getElementById('lesson-result-panel').style.display = 'none';
    document.getElementById('lesson-form-panel').style.display = 'block';
    form.reset();
  });

  // Copy to Clipboard
  copyBtn.addEventListener('click', () => {
    if (!currentGeneratedLesson) return;
    // Extract text content from output container
    const plainText = document.getElementById('lesson-output-container').innerText;
    navigator.clipboard.writeText(plainText)
      .then(() => alert('Lesson Plan text copied to clipboard!'))
      .catch(err => alert('Failed to copy text: ', err));
  });

  // Print Lesson
  printBtn.addEventListener('click', () => {
    if (!currentGeneratedLesson) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${currentGeneratedLesson.title}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h2 { color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
            h3 { color: #7c3aed; margin-top: 30px; }
            ul, ol { padding-left: 20px; }
            li { margin-bottom: 8px; }
          </style>
        </head>
        <body>
          ${currentGeneratedLesson.html}
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  });
}

// ----------------------------------------------------
// View Module: Quiz Generator
// ----------------------------------------------------
function setupQuizGenerator() {
  const form = document.getElementById('quiz-generator-form');
  const generateBtn = document.getElementById('generate-quiz-btn');
  const saveBtn = document.getElementById('save-quiz-btn');
  const playBtn = document.getElementById('play-quiz-btn');
  const exportBtn = document.getElementById('export-quiz-btn');
  const exitPlayBtn = document.getElementById('exit-playtest-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const subject = document.getElementById('quiz-subject').value;
    const topic = document.getElementById('quiz-topic').value.trim();
    const grade = document.getElementById('quiz-grade').value;
    const numQuestions = parseInt(document.getElementById('quiz-questions-count').value);
    const type = document.getElementById('quiz-question-type').value;
    const settings = getSettings();

    document.getElementById('quiz-form-panel').style.display = 'none';
    document.getElementById('quiz-loader').style.display = 'flex';
    document.getElementById('quiz-result-panel').style.display = 'none';

    try {
      currentGeneratedQuiz = await generateQuiz({
        subject,
        topic,
        grade,
        numQuestions,
        type,
        apiKey: settings.apiKey
      });

      renderGeneratedQuizQuestions();
      document.getElementById('quiz-loader').style.display = 'none';
      document.getElementById('quiz-result-panel').style.display = 'block';
    } catch (err) {
      alert(`AI quiz generator encountered an error: ${err.message}`);
      document.getElementById('quiz-loader').style.display = 'none';
      document.getElementById('quiz-form-panel').style.display = 'block';
    }
  });

  saveBtn.addEventListener('click', () => {
    if (!currentGeneratedQuiz) return;
    saveQuiz(currentGeneratedQuiz);
    alert('Quiz saved successfully to local repository!');
    switchView('dashboard');
    document.getElementById('quiz-result-panel').style.display = 'none';
    document.getElementById('quiz-form-panel').style.display = 'block';
    form.reset();
  });

  exportBtn.addEventListener('click', () => {
    if (!currentGeneratedQuiz) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentGeneratedQuiz, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentGeneratedQuiz.title.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Play Test Sandbox Mode
  playBtn.addEventListener('click', () => {
    if (!currentGeneratedQuiz) return;
    document.getElementById('quiz-result-panel').style.display = 'none';
    document.getElementById('quiz-playtest-panel').style.display = 'block';
    startPlaytest(currentGeneratedQuiz);
  });

  exitPlayBtn.addEventListener('click', () => {
    document.getElementById('quiz-playtest-panel').style.display = 'none';
    document.getElementById('quiz-result-panel').style.display = 'block';
  });
}

function renderGeneratedQuizQuestions() {
  const container = document.getElementById('quiz-questions-container');
  container.innerHTML = '';
  document.getElementById('quiz-title-label').textContent = currentGeneratedQuiz.title;

  currentGeneratedQuiz.questions.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'question-item';
    
    let optionsHtml = '';
    q.options.forEach(opt => {
      const isCorrect = opt === q.answer;
      optionsHtml += `
        <div class="q-opt ${isCorrect ? 'correct' : ''}">
          <span style="font-weight: bold;">${isCorrect ? '✓' : '•'}</span>
          <span>${opt}</span>
        </div>
      `;
    });

    qDiv.innerHTML = `
      <div class="q-text">Q${idx + 1}: ${q.question}</div>
      <div class="q-options">${optionsHtml}</div>
    `;
    container.appendChild(qDiv);
  });
}

// ----------------------------------------------------
// Quiz Student Playtest Sandbox Logic
// ----------------------------------------------------
function startPlaytest(quiz) {
  currentPlaytestQuiz = quiz;
  currentPlaytestState = {
    questionIndex: 0,
    score: 0,
    answers: []
  };
  showPlaytestQuestion();
}

function showPlaytestQuestion() {
  const qIdx = currentPlaytestState.questionIndex;
  const questions = currentPlaytestQuiz.questions;
  
  if (qIdx >= questions.length) {
    // Show End Screen
    const pct = Math.round((currentPlaytestState.score / questions.length) * 100);
    alert(`Play Test Completed!\nStudent Score: ${currentPlaytestState.score} / ${questions.length} (${pct}%)`);
    document.getElementById('quiz-playtest-panel').style.display = 'none';
    document.getElementById('quiz-result-panel').style.display = 'block';
    return;
  }

  const q = questions[qIdx];
  document.getElementById('playtest-q-index').textContent = `Question ${qIdx + 1} of ${questions.length}`;
  document.getElementById('playtest-score-counter').textContent = `Score: ${currentPlaytestState.score} / ${qIdx}`;
  document.getElementById('playtest-question-text').textContent = q.question;

  const optContainer = document.getElementById('playtest-options-container');
  optContainer.innerHTML = '';

  const nextBtn = document.getElementById('playtest-next-btn');
  nextBtn.disabled = true;
  nextBtn.onclick = () => {
    currentPlaytestState.questionIndex++;
    showPlaytestQuestion();
  };

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'playtest-opt-btn';
    btn.textContent = opt;
    btn.onclick = () => {
      // Highlight selected
      optContainer.querySelectorAll('.playtest-opt-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      
      // Determine grade
      const isCorrect = opt === q.answer;
      
      // Next click logic updates score
      nextBtn.disabled = false;
      nextBtn.onclick = () => {
        if (isCorrect) {
          currentPlaytestState.score++;
        }
        currentPlaytestState.questionIndex++;
        showPlaytestQuestion();
      };
    };
    optContainer.appendChild(btn);
  });
}

// ----------------------------------------------------
// View Module: Assignment Marker (AI Grading)
// ----------------------------------------------------
function setupAssignmentMarker() {
  const form = document.getElementById('grading-tool-form');
  const saveBtn = document.getElementById('save-grade-btn');
  const regradeBtn = document.getElementById('regrade-btn');
  const loadHighBtn = document.getElementById('load-high-demo-btn');
  const loadLowBtn = document.getElementById('load-low-demo-btn');

  // Load essays presets
  loadHighBtn.addEventListener('click', () => {
    const text = markingTemplates.submissions[0].content;
    document.getElementById('grade-submission-content').value = text;
    document.getElementById('grade-rubric-select').value = 'analytical';
  });

  loadLowBtn.addEventListener('click', () => {
    const text = markingTemplates.submissions[1].content;
    document.getElementById('grade-submission-content').value = text;
    document.getElementById('grade-rubric-select').value = 'analytical';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const studentId = document.getElementById('grade-student-select').value;
    const rubricId = document.getElementById('grade-rubric-select').value;
    const content = document.getElementById('grade-submission-content').value.trim();
    const students = getStudents();
    const selectedStudent = students.find(s => s.id === studentId);
    const studentName = selectedStudent ? selectedStudent.name : "Student";
    const settings = getSettings();

    document.getElementById('grading-form-panel').style.display = 'none';
    document.getElementById('grading-loader').style.display = 'flex';
    document.getElementById('grading-result-panel').style.display = 'none';

    try {
      const response = await gradeAssignment({
        subject: 'english',
        topic: 'analysis',
        rubricId,
        studentName,
        content,
        apiKey: settings.apiKey
      });

      currentGeneratedMarking = {
        studentId,
        studentName,
        subject: 'english',
        topic: 'analysis',
        rubricId,
        content,
        score: response.score,
        criteriaScores: response.criteriaScores,
        feedback: response.feedback
      };

      renderGradingResults();
      document.getElementById('grading-loader').style.display = 'none';
      document.getElementById('grading-result-panel').style.display = 'block';
    } catch (err) {
      alert(`AI grading failed: ${err.message}`);
      document.getElementById('grading-loader').style.display = 'none';
      document.getElementById('grading-form-panel').style.display = 'block';
    }
  });

  saveBtn.addEventListener('click', () => {
    if (!currentGeneratedMarking) return;
    
    // Read final overridden values from sliders and editors
    const finalFeedback = document.getElementById('grade-feedback-editor').value;
    currentGeneratedMarking.feedback = finalFeedback;
    
    saveGradedAssignment(currentGeneratedMarking);
    alert(`Grade saved successfully for ${currentGeneratedMarking.studentName}! Roster analytics updated.`);
    switchView('dashboard');
    
    document.getElementById('grading-result-panel').style.display = 'none';
    document.getElementById('grading-form-panel').style.display = 'block';
    form.reset();
  });

  regradeBtn.addEventListener('click', () => {
    document.getElementById('grading-result-panel').style.display = 'none';
    document.getElementById('grading-form-panel').style.display = 'block';
  });
}

function populateGradingStudents() {
  const select = document.getElementById('grade-student-select');
  select.innerHTML = '';
  const students = getStudents();
  
  students.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} (GPA: ${Math.round(Object.values(s.grades).reduce((a,b)=>a+b,0)/4)}%)`;
    select.appendChild(opt);
  });
}

function renderGradingResults() {
  document.getElementById('grading-essay-view').textContent = currentGeneratedMarking.content;
  document.getElementById('suggested-score-badge').textContent = currentGeneratedMarking.score;
  document.getElementById('grade-feedback-editor').value = currentGeneratedMarking.feedback;

  const barContainer = document.getElementById('criteria-bars-container');
  barContainer.innerHTML = '';

  const rubric = markingTemplates.essay_rubrics[currentGeneratedMarking.rubricId];
  
  rubric.criteria.forEach(c => {
    const currentScore = currentGeneratedMarking.criteriaScores[c.name] || 0;
    const maxVal = c.max;

    const row = document.createElement('div');
    row.className = 'criteria-score-card';
    row.style.marginBottom = '12px';
    
    row.innerHTML = `
      <div class="criteria-header">
        <strong style="font-size: 0.9rem;">${c.name}</strong>
        <span style="font-size: 0.85rem; font-weight: bold; color: var(--accent-indigo);">
          <input type="number" class="crit-input" data-crit="${c.name}" min="0" max="${maxVal}" value="${currentScore}" style="width: 45px; padding: 2px 4px; border-radius: 4px; display:inline;"> / ${maxVal}
        </span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 8px;">${c.description}</div>
      <div class="criteria-bar-container">
        <div class="criteria-bar" style="width: ${(currentScore / maxVal) * 100}%;"></div>
      </div>
    `;

    barContainer.appendChild(row);
  });

  // Add event listener to inputs to allow MANUAL OVERRIDES!
  barContainer.querySelectorAll('.crit-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const critName = e.target.getAttribute('data-crit');
      let val = parseInt(e.target.value) || 0;
      const maxVal = rubric.criteria.find(c => c.name === critName).max;
      
      // Clamping
      val = Math.min(maxVal, Math.max(0, val));
      e.target.value = val;

      // Update state
      currentGeneratedMarking.criteriaScores[critName] = val;
      
      // Recalculate total
      let newTotal = 0;
      Object.values(currentGeneratedMarking.criteriaScores).forEach(s => newTotal += s);
      currentGeneratedMarking.score = newTotal;

      // Update UI
      document.getElementById('suggested-score-badge').textContent = newTotal;
      
      // Update visual bar
      const bar = e.target.closest('.criteria-score-card').querySelector('.criteria-bar');
      bar.style.width = `${(val / maxVal) * 100}%`;
    });
  });
}

// ----------------------------------------------------
// View Module: Student Analytics
// ----------------------------------------------------
function setupStudentAnalytics() {
  const backBtn = document.getElementById('back-to-roster-btn');
  
  backBtn.addEventListener('click', () => {
    document.getElementById('student-profile-panel').style.display = 'none';
    document.getElementById('roster-view-panel').style.display = 'block';
  });
}

function renderRosterTable() {
  const tbody = document.getElementById('roster-table-body');
  tbody.innerHTML = '';
  
  const students = getStudents();
  
  students.forEach(s => {
    const tr = document.createElement('tr');
    
    // Compute student GPA
    const subjects = Object.values(s.grades);
    const gpa = Math.round(subjects.reduce((a,b)=>a+b,0) / subjects.length);
    
    let gpaBadgeClass = 'badge-success';
    if (gpa < 70) gpaBadgeClass = 'badge-danger';
    else if (gpa < 80) gpaBadgeClass = 'badge-warning';

    tr.innerHTML = `
      <td><a class="student-link" data-id="${s.id}">${s.name}</a></td>
      <td>${s.grades.math}%</td>
      <td>${s.grades.science}%</td>
      <td>${s.grades.english}%</td>
      <td><span class="badge ${s.attendance >= 90 ? 'badge-success' : 'badge-danger'}">${s.attendance}%</span></td>
      <td>${s.assessments || 12} Tasks</td>
      <td><button class="btn btn-secondary view-prof-btn" data-id="${s.id}" style="padding: 4px 10px; font-size: 0.8rem;">Profile</button></td>
    `;

    tbody.appendChild(tr);
  });

  // Bind clicks on names and profile buttons
  tbody.querySelectorAll('.student-link, .view-prof-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const studentId = e.target.getAttribute('data-id');
      viewStudentProfile(studentId);
    });
  });
}

function viewStudentProfile(studentId) {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  if (!student) return;

  document.getElementById('roster-view-panel').style.display = 'none';
  document.getElementById('student-profile-panel').style.display = 'block';

  // Info
  document.getElementById('profile-name').textContent = student.name;
  document.getElementById('profile-id').textContent = student.id;
  document.getElementById('profile-attendance').textContent = `${student.attendance}%`;
  document.getElementById('profile-assessments-count').textContent = student.assessments || 12;
  
  const initials = student.name.split(' ').map(n=>n[0]).join('');
  document.getElementById('profile-avatar').textContent = initials;

  const subjects = Object.values(student.grades);
  const avg = Math.round(subjects.reduce((a,b)=>a+b,0) / subjects.length);
  document.getElementById('profile-overall-avg').textContent = `${avg}%`;

  // Draw timeline trend
  const allGrades = getGrades();
  const trendContainer = document.getElementById('student-trend-chart-container');
  renderStudentTrend(student, allGrades, trendContainer);

  // Dynamic recommendations
  const strengthsList = document.getElementById('profile-strengths-list');
  const goalsList = document.getElementById('profile-goals-list');

  strengthsList.innerHTML = '';
  goalsList.innerHTML = '';

  // Calculate highest & lowest
  const subjectList = Object.entries(student.grades);
  subjectList.sort((a,b) => b[1] - a[1]); // Descending

  const highest = subjectList[0];
  const lowest = subjectList[subjectList.length - 1];

  // Render Strength points
  const strLi1 = document.createElement('li');
  strLi1.innerHTML = `Demonstrates strong mastery in <strong>${highest[0].toUpperCase()}</strong> with a score of <strong>${highest[1]}%</strong>.`;
  strengthsList.appendChild(strLi1);

  if (student.attendance >= 95) {
    const strLi2 = document.createElement('li');
    strLi2.innerHTML = `Consistent classroom engagement and attendance (<strong>${student.attendance}%</strong>).`;
    strengthsList.appendChild(strLi2);
  } else {
    const strLi2 = document.createElement('li');
    strLi2.innerHTML = `Active participant in peer discussions and guided exercises.`;
    strengthsList.appendChild(strLi2);
  }

  // Render Goal points
  const goalLi1 = document.createElement('li');
  if (lowest[1] < 75) {
    goalLi1.innerHTML = `Targeted focus on <strong>${lowest[0].toUpperCase()}</strong>. Score is currently <strong>${lowest[1]}%</strong>. Suggest extra tutoring.`;
  } else {
    goalLi1.innerHTML = `Boost performance in <strong>${lowest[0].toUpperCase()}</strong> (${lowest[1]}%) to elevate general GPA.`;
  }
  goalsList.appendChild(goalLi1);

  const goalLi2 = document.createElement('li');
  goalLi2.innerHTML = `Engage with interactive AI-suggested diagnostic quizzes weekly to build speed.`;
  goalsList.appendChild(goalLi2);
}

// ----------------------------------------------------
// View Module: Settings
// ----------------------------------------------------
function setupSettings() {
  const form = document.getElementById('settings-form');
  const keyInput = document.getElementById('settings-api-key');
  const themeSelect = document.getElementById('settings-theme-select');
  const resetBtn = document.getElementById('reset-data-btn');

  // Load current values
  const settings = getSettings();
  keyInput.value = settings.apiKey || '';
  themeSelect.value = settings.theme || 'dark';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const apiKey = keyInput.value.trim();
    const theme = themeSelect.value;
    
    saveSettings({ apiKey, theme });
    applyTheme(theme);
    
    alert('Settings configuration saved successfully!');
    switchView('dashboard');
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('Are you absolutely sure you want to clear all data and reset the student roster? This action is permanent.')) {
      resetAllData();
      alert('Local storage cleared. Application restored to original seed roster.');
      window.location.reload();
    }
  });
}
