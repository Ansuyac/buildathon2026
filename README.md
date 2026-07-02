# Teacher Assistant AI

A premium web and mobile-responsive AI-powered Teacher Assistant application built for **Buildathon 2026**.

## Features
- **Automatic Lesson Planning** - AI-generated, standards-aligned lesson plans for Math, Science & English
- **Quiz Generation** - Multiple choice and True/False quiz builder with answer keys & student play-test mode
- **Assignment Marking** - Rubric-based AI grading with constructive feedback and manual score override
- **Student Performance Analytics** - Individual grade tracking, SVG trend charts, and personalized recommendations

## Run Locally
Open index.html in a modern browser, or serve with Python:
`ash
python -m http.server 8000
`
Then open http://localhost:8000/

## AI Integration
Add a **Google Gemini API Key** in the Settings panel for live AI generation.  
Without a key the app runs in **Offline Simulation Mode** with rich pre-built educational content.

## Tech Stack
- Pure **HTML5**, Vanilla **CSS** (Glassmorphism Design System), **ES6 JavaScript Modules**
- Google Fonts: Outfit & Plus Jakarta Sans
- Custom SVG analytics charting engine (no chart library dependencies)
- localStorage for offline-first data persistence

## Built at Buildathon 2026