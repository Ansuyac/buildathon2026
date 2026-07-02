// Client-side data storage manager with LocalStorage persistence

import { defaultStudents, markingTemplates } from './templates.js';

const STORAGE_KEYS = {
  STUDENTS: 'ta_ai_students',
  LESSONS: 'ta_ai_lessons',
  QUIZZES: 'ta_ai_quizzes',
  GRADES: 'ta_ai_grades',
  SETTINGS: 'ta_ai_settings'
};

// Seed default data if not present
export function initStore() {
  if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(defaultStudents));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LESSONS)) {
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.GRADES)) {
    // Seed initial marked submissions
    const initialGrades = markingTemplates.submissions.map(sub => ({
      id: sub.id,
      studentId: sub.studentId,
      studentName: defaultStudents.find(s => s.id === sub.studentId)?.name || "Unknown Student",
      subject: sub.subject,
      topic: sub.topic,
      rubricId: sub.rubricId,
      prompt: sub.prompt,
      content: sub.content,
      score: sub.simulatedGrading.score,
      criteriaScores: sub.simulatedGrading.criteriaScores,
      feedback: sub.simulatedGrading.feedback,
      date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0] // 2 days ago
    }));
    localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(initialGrades));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      theme: 'dark',
      apiKey: ''
    }));
  }
}

// Student Roster
export function getStudents() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS) || '[]');
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
}

export function updateStudentGrade(studentId, subject, newScore) {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  if (student) {
    // Recalculate average
    student.grades[subject] = newScore;
    student.assessments = (student.assessments || 0) + 1;
    saveStudents(students);
  }
}

// Lesson Plans
export function getLessons() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.LESSONS) || '[]');
}

export function saveLesson(lesson) {
  const lessons = getLessons();
  // Ensure unique ID
  if (!lesson.id) {
    lesson.id = 'lesson_' + Date.now();
  }
  lessons.unshift(lesson); // Add new lessons to front
  localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
  return lesson;
}

export function deleteLesson(id) {
  const lessons = getLessons();
  const filtered = lessons.filter(l => l.id !== id);
  localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(filtered));
}

// Quizzes
export function getQuizzes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]');
}

export function saveQuiz(quiz) {
  const quizzes = getQuizzes();
  if (!quiz.id) {
    quiz.id = 'quiz_' + Date.now();
  }
  quizzes.unshift(quiz);
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  return quiz;
}

export function deleteQuiz(id) {
  const quizzes = getQuizzes();
  const filtered = quizzes.filter(q => q.id !== id);
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(filtered));
}

// Graded Assignments
export function getGrades() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.GRADES) || '[]');
}

export function saveGradedAssignment(grade) {
  const grades = getGrades();
  if (!grade.id) {
    grade.id = 'grade_' + Date.now();
  }
  // Check if exists, overwrite, otherwise append
  const idx = grades.findIndex(g => g.id === grade.id);
  if (idx !== -1) {
    grades[idx] = grade;
  } else {
    grades.unshift(grade);
  }
  localStorage.setItem(STORAGE_KEYS.GRADES, JSON.stringify(grades));

  // Also update the student's average in their record
  updateStudentGrade(grade.studentId, grade.subject, grade.score);

  return grade;
}

// Settings
export function getSettings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{"theme":"dark","apiKey":""}');
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// Clear Storage & Re-seed
export function resetAllData() {
  localStorage.removeItem(STORAGE_KEYS.STUDENTS);
  localStorage.removeItem(STORAGE_KEYS.LESSONS);
  localStorage.removeItem(STORAGE_KEYS.QUIZZES);
  localStorage.removeItem(STORAGE_KEYS.GRADES);
  initStore();
}
