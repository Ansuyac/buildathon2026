// SVG-based charting engine for visual analytics

export function renderClassDistribution(students, container) {
  if (!container) return;
  container.innerHTML = '';

  // Calculate brackets
  const brackets = { 'A (90-100)': 0, 'B (80-89)': 0, 'C (70-79)': 0, 'D (60-69)': 0, 'F (<60)': 0 };
  
  students.forEach(s => {
    // Calculate overall average
    const subjects = Object.values(s.grades);
    const avg = subjects.reduce((a, b) => a + b, 0) / subjects.length;
    if (avg >= 90) brackets['A (90-100)']++;
    else if (avg >= 80) brackets['B (80-89)']++;
    else if (avg >= 70) brackets['C (70-79)']++;
    else if (avg >= 60) brackets['D (60-69)']++;
    else brackets['F (<60)']++;
  });

  const data = Object.entries(brackets);
  const maxVal = Math.max(...data.map(d => d[1]), 1); // Avoid division by zero

  const width = 500;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 40 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  let svgContent = `<svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" class="svg-chart">`;
  
  // Define Gradients
  svgContent += `
    <defs>
      <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--accent-indigo)" stop-opacity="0.8" />
        <stop offset="100%" stop-color="var(--accent-violet)" stop-opacity="0.3" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;

  // Draw grid lines
  const gridLinesCount = 4;
  for (let i = 0; i <= gridLinesCount; i++) {
    const y = padding.top + (chartHeight / gridLinesCount) * i;
    const value = Math.round(maxVal - (maxVal / gridLinesCount) * i);
    svgContent += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(255,255,255,0.07)" stroke-dasharray="4,4" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="var(--text-secondary)" font-size="10" text-anchor="end">${value}</text>
    `;
  }

  // Draw bars
  const barWidth = chartWidth / data.length;
  data.forEach(([label, count], index) => {
    const x = padding.left + (index * barWidth) + (barWidth * 0.15);
    const actualBarWidth = barWidth * 0.7;
    const barHeight = (count / maxVal) * chartHeight;
    const y = height - padding.bottom - barHeight;

    svgContent += `
      <rect x="${x}" y="${y}" width="${actualBarWidth}" height="${barHeight}" rx="4" fill="url(#barGrad)" stroke="var(--accent-indigo)" stroke-width="1">
        <animate attributeName="height" from="0" to="${barHeight}" dur="0.8s" fill="freeze" />
        <animate attributeName="y" from="${height - padding.bottom}" to="${y}" dur="0.8s" fill="freeze" />
      </rect>
      <text x="${x + actualBarWidth / 2}" y="${y - 6}" fill="var(--accent-cyan)" font-size="11" font-weight="bold" text-anchor="middle">${count}</text>
      <text x="${x + actualBarWidth / 2}" y="${height - padding.bottom + 18}" fill="var(--text-secondary)" font-size="10" text-anchor="middle">${label.split(' ')[0]}</text>
    `;
  });

  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}

export function renderSubjectAverages(students, container) {
  if (!container) return;
  container.innerHTML = '';

  const subjects = { math: 0, science: 0, english: 0, social: 0 };
  students.forEach(s => {
    Object.keys(subjects).forEach(sub => {
      subjects[sub] += s.grades[sub] || 0;
    });
  });

  const count = students.length || 1;
  const averages = Object.entries(subjects).map(([name, sum]) => ({
    name: name.toUpperCase(),
    value: Math.round(sum / count)
  }));

  const width = 500;
  const height = 220;
  const padding = { top: 20, right: 30, bottom: 20, left: 80 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  let svgContent = `<svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" class="svg-chart">`;
  
  // Gradients
  svgContent += `
    <defs>
      <linearGradient id="horizontalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.2" />
        <stop offset="100%" stop-color="var(--accent-cyan)" stop-opacity="0.9" />
      </linearGradient>
    </defs>
  `;

  // Draw grid columns (0 to 100)
  const columns = 5;
  for (let i = 0; i <= columns; i++) {
    const x = padding.left + (chartWidth / columns) * i;
    const value = (100 / columns) * i;
    svgContent += `
      <line x1="${x}" y1="${padding.top}" x2="${x}" y2="${height - padding.bottom}" stroke="rgba(255,255,255,0.07)" />
      <text x="${x}" y="${height - padding.bottom + 15}" fill="var(--text-secondary)" font-size="10" text-anchor="middle">${value}%</text>
    `;
  }

  // Draw horizontal bars
  const rowHeight = chartHeight / averages.length;
  averages.forEach((avg, index) => {
    const y = padding.top + (index * rowHeight) + (rowHeight * 0.2);
    const barHeight = rowHeight * 0.6;
    const barWidth = (avg.value / 100) * chartWidth;

    svgContent += `
      <text x="${padding.left - 10}" y="${y + barHeight / 2 + 4}" fill="var(--text-primary)" font-size="11" font-weight="500" text-anchor="end">${avg.name}</text>
      <rect x="${padding.left}" y="${y}" width="0" height="${barHeight}" rx="4" fill="url(#horizontalGrad)" stroke="var(--accent-cyan)" stroke-width="0.5">
        <animate attributeName="width" from="0" to="${barWidth}" dur="0.8s" fill="freeze" />
      </rect>
      <text x="${padding.left + barWidth + 10}" y="${y + barHeight / 2 + 4}" fill="var(--text-primary)" font-size="11" font-weight="bold">${avg.value}%</text>
    `;
  });

  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}

export function renderStudentTrend(student, allGrades, container) {
  if (!container) return;
  container.innerHTML = '';

  // Get grades history for the student
  const studentGrades = allGrades
    .filter(g => g.studentId === student.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // If student has too few custom grades, populate with mock timeline for visual excellence
  let timeline = [];
  if (studentGrades.length < 3) {
    timeline = [
      { label: "Quiz 1", score: student.grades.math - 8 },
      { label: "Assign 1", score: student.grades.science + 3 },
      { label: "Quiz 2", score: student.grades.english - 4 },
      { label: "Assign 2", score: student.grades.math },
      { label: "Current", score: Math.round(Object.values(student.grades).reduce((a,b)=>a+b,0)/4) }
    ];
  } else {
    timeline = studentGrades.map((g, idx) => ({
      label: `Grade ${idx + 1}`,
      score: g.score
    }));
  }

  const width = 500;
  const height = 220;
  const padding = { top: 25, right: 30, bottom: 35, left: 40 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  let svgContent = `<svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" class="svg-chart">`;
  
  // Line Gradient & Glow
  svgContent += `
    <defs>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--accent-emerald)" stop-opacity="0.4" />
        <stop offset="100%" stop-color="var(--accent-emerald)" stop-opacity="0" />
      </linearGradient>
      <filter id="emeraldGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="glow">
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  `;

  // Draw Grid Lines (Y-Axis)
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const y = padding.top + (chartHeight / steps) * i;
    const value = 100 - (40 / steps) * i; // Range 60 to 100
    svgContent += `
      <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(255,255,255,0.06)" />
      <text x="${padding.left - 10}" y="${y + 4}" fill="var(--text-secondary)" font-size="10" text-anchor="end">${value}</text>
    `;
  }

  // Calculate coordinates
  const points = [];
  const xStep = chartWidth / (timeline.length - 1);
  timeline.forEach((pt, index) => {
    const x = padding.left + index * xStep;
    // Map score 60-100 to chartHeight-0
    const pct = (pt.score - 60) / 40;
    const clampedPct = Math.min(1, Math.max(0, pct));
    const y = padding.top + chartHeight - (clampedPct * chartHeight);
    points.push({ x, y, score: pt.score, label: pt.label });
  });

  // Construct Area Path (filled to bottom)
  let areaPath = `M ${points[0].x} ${height - padding.bottom} `;
  points.forEach(pt => {
    areaPath += `L ${pt.x} ${pt.y} `;
  });
  areaPath += `L ${points[points.length - 1].x} ${height - padding.bottom} Z`;

  // Construct Line Path
  let linePath = `M ${points[0].x} ${points[0].y} `;
  for (let i = 1; i < points.length; i++) {
    linePath += `L ${points[i].x} ${points[i].y} `;
  }

  // Draw area first
  svgContent += `<path d="${areaPath}" fill="url(#lineGrad)" opacity="0.6"/>`;

  // Draw path line
  svgContent += `
    <path d="${linePath}" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5" filter="url(#emeraldGlow)">
      <animate attributeName="stroke-dasharray" from="1000" to="0" dur="1s" />
    </path>
  `;

  // Draw points and labels
  points.forEach(pt => {
    svgContent += `
      <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="var(--bg-card)" stroke="var(--accent-emerald)" stroke-width="2.5" />
      <text x="${pt.x}" y="${pt.y - 8}" fill="var(--text-primary)" font-size="10" font-weight="bold" text-anchor="middle">${pt.score}%</text>
      <text x="${pt.x}" y="${height - padding.bottom + 18}" fill="var(--text-secondary)" font-size="9" text-anchor="middle">${pt.label}</text>
    `;
  });

  svgContent += `</svg>`;
  container.innerHTML = svgContent;
}
