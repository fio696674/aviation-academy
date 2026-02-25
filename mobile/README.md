# Aviation Academy Mobile App

React Native Expo mobile application for Aviation Academy students.

## Features

- **Course Viewer** - Browse and access enrolled courses
- **MCP Tests** - Practice tests for DGCA, FAA, EASA exams
- **Progress Tracking** - View your learning progress
- **Profile Management** - Student profile and settings

## Tech Stack

- React Native with Expo
- React Navigation
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI

### Installation

```bash
cd mobile
npm install
```

### Running

```bash
# Development
npm start

# Android
npm run android

# iOS
npm run ios
```

## Project Structure

```
mobile/
├── App.tsx          # Main app with screens
├── app.json         # Expo configuration
├── package.json     # Dependencies
└── assets/         # Images and icons
```

## Screens

1. **Home** - Dashboard with courses and tests
2. **Courses** - Browse all available courses
3. **Exams** - Practice test listing
4. **Profile** - Student profile and settings

## Build for Production

```bash
# Android APK
expo build:android

# iOS
expo build:ios
```
