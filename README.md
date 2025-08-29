# Task Manager - React Native App

A clean, simple task management app built with React Native and Expo. Add, complete, and delete tasks with a beautiful, accessible interface.

## Features

- ✅ Add new tasks with input validation
- 🔄 Toggle task completion with visual feedback
- 🗑️ Delete tasks with confirmation dialog
- 📱 Responsive design for iOS, Android, Web, and TV
- ♿ Full accessibility support with screen reader compatibility
- 🎨 Clean, modern UI with proper empty states

## Prerequisites

- Node.js (v16 or later)
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device (optional)

## Installation & Setup

1. **Clone or download this project**
   \`\`\`bash
   git clone <your-repo-url>
   cd task-manager
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npx expo start
   \`\`\`

## Running the App

### Option 1: Expo Go (Recommended for testing)
1. Install Expo Go from the App Store (iOS) or Google Play Store (Android)
2. Scan the QR code displayed in your terminal or browser
3. The app will load on your device

### Option 2: iOS Simulator
\`\`\`bash
npx expo start --ios
\`\`\`

### Option 3: Android Emulator
\`\`\`bash
npx expo start --android
\`\`\`

### Option 4: Web Browser
\`\`\`bash
npx expo start --web
\`\`\`

## Usage

1. **Add a Task**: Type your task description in the input field and tap "Add"
2. **Complete a Task**: Tap on any task or its checkbox to mark it as complete
3. **Delete a Task**: Tap the trash icon and confirm deletion
4. **View Tasks**: All tasks (completed and incomplete) are shown in one list

## Project Structure

\`\`\`
├── App.tsx                 # Main app component with state management
├── types.ts               # TypeScript interfaces
├── components/
│   ├── TaskItem.tsx       # Individual task component
│   └── EmptyState.tsx     # Empty state when no tasks exist
└── README.md             # This file
\`\`\`

## Technical Details

- **Framework**: React Native with Expo SDK 51+
- **Language**: TypeScript
- **State Management**: React useState (local state only)
- **Styling**: React Native StyleSheet
- **Dependencies**: Minimal - only Expo and React Native primitives
- **Persistence**: None (tasks reset on app restart)

## Accessibility Features

- Screen reader support with meaningful labels
- Proper touch targets (44px minimum)
- Keyboard navigation support
- High contrast colors for readability
- Semantic roles and states

## Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android (Phone & Tablet)
- ✅ Web Browser
- ✅ TV (Apple TV, Android TV)

## Development

This app uses only React Native primitives and Expo APIs. No external UI libraries or complex state management tools are included, making it easy to understand and modify.

To add new features:
1. Update the `Task` interface in `types.ts` if needed
2. Modify state management in `App.tsx`
3. Create new components in the `components/` directory
4. Update styles using React Native's StyleSheet API

## License

MIT License - feel free to use this code for learning or as a starting point for your own projects.
