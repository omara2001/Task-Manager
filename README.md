# 📝 Task Manager - React Native App

A beautiful, feature-rich task management app built with React Native and Expo. Create, edit, complete, and delete tasks with an intuitive interface, smooth animations, haptic feedback, and full dark/light mode support.

![App Preview](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue)
![Expo](https://img.shields.io/badge/Expo-53.0.22-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)

## 📱 App Screenshots

<div align="center">
  <img src="./assets/App UI.png" alt="Main App Interface" width="250" />
  <img src="./assets/Add task.png" alt="Add Task Modal" width="250" />
  <img src="./assets/Delete task.png" alt="Delete Task Confirmation" width="250" />
</div>

## ✨ Features

### Core Functionality
- ➕ **Add Tasks**: Create new tasks with title and optional description
- ✏️ **Edit Tasks**: Modify existing tasks with dedicated edit modal
- ✅ **Toggle Completion**: Mark tasks as complete/incomplete with visual feedback
- 🗑️ **Delete Tasks**: Remove tasks with confirmation dialog (works on all platforms)
- 📋 **Task List**: View all tasks with completion status and timestamps

### Enhanced User Experience
- 🌙 **Dark/Light Mode**: Automatic system theme detection with manual toggle
- 📱 **Responsive Design**: Optimized for phones, tablets, and web browsers
- ✨ **Smooth Animations**: Entrance, completion, and deletion animations
- 📳 **Haptic Feedback**: Tactile feedback for all interactions (mobile only)
- 🔒 **Safe Area Support**: Proper handling of notched devices
- ⌨️ **Smart Keyboard**: Intelligent keyboard behavior that doesn't hide content
- ♿ **Accessibility**: Full accessibility labels and hints for screen readers
- 📊 **Progress Tracking**: Visual progress bar showing completion status

### Smart Features
- 🚫 **Input Validation**: Prevents adding empty or whitespace-only tasks
- 🕐 **Timestamps**: Shows when tasks were created with relative time
- 🔄 **Auto-sorting**: New tasks appear at the top of the list
- 💾 **Local State**: Tasks persist during app session
- 🌐 **Cross-platform**: Works seamlessly on iOS, Android, and Web

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** - Install with `npm install -g @expo/cli`
- **Mobile device** with Expo Go app OR **iOS Simulator/Android Emulator**

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/omara2001/Task-Manager.git
   cd Task-Manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter any issues, try:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   OR
   npx expo start
   ```

4. **Run on your preferred platform**
   
   **For Mobile (Recommended):**
   - Install **Expo Go** on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
   - Scan the QR code displayed in your terminal
   
   **For iOS Simulator:**
   ```bash
   npm run ios
   ```
   
   **For Android Emulator:**
   ```bash
   npm run android
   ```
   
   **For Web Browser:**
   ```bash
   npm run web
   ```

### Troubleshooting Setup

If you encounter the "Parent configuration missing" error:
1. Ensure all dependencies are installed: `npm install`
2. Clear cache: `npx expo start --clear`
3. Restart your terminal and try again

## 📱 How to Use

### Adding Tasks
1. **Quick Add**: Type in the bottom input field and tap **Add**
2. **Detailed Add**: Tap **Add** to open the modal where you can add both title and description

### Managing Tasks
- **Mark Complete**: Tap anywhere on the task to toggle completion status
- **Edit Task**: Tap the ✎ (edit) icon to modify title and description
- **Delete Task**: Tap the ✕ (delete) icon and confirm deletion
- **View Progress**: Check the progress bar in the header

### Customization
- **Theme Toggle**: Use the switch in the header (🌙/☀️) to toggle between dark and light modes
- **System Theme**: The app automatically detects your system theme preference

## 🏗️ Project Structure

```
task-manager/
├── components/
│   ├── TaskItem.tsx          # Individual task component with animations
│   ├── TaskModal.tsx         # Add/Edit task modal
│   └── EmptyState.tsx        # Empty state with helpful tips
├── constants/
│   └── index.ts              # App-wide constants
├── contexts/
│   └── ThemeContext.tsx      # Theme management context
├── utils/
│   └── index.ts              # Utility functions
├── App.tsx                   # Main app component
├── types.ts                  # TypeScript type definitions
├── theme.ts                  # Theme configuration (light/dark)
├── babel.config.js           # Babel configuration
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🛠️ Technical Details

### Dependencies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development platform and tools for React Native
- **expo-haptics**: Haptic feedback for enhanced user experience
- **expo-status-bar**: Status bar management across themes
- **TypeScript**: Type safety and better development experience

### Key Features Implementation

#### Task Management
- **Local State**: Uses React hooks for state management
- **Unique IDs**: Generated using timestamp for task identification
- **Data Validation**: Prevents empty tasks and trims whitespace
- **Sorting**: New tasks automatically appear first

#### User Interface
- **Theme System**: Comprehensive light/dark mode with automatic detection
- **Animations**: Smooth entrance, completion, and deletion animations
- **Responsive Design**: Adapts to different screen sizes and orientations
- **Accessibility**: Full WCAG compliance with proper labels and hints

#### Cross-Platform Compatibility
- **Web Support**: Delete confirmation uses browser confirm dialog
- **Mobile Support**: Native Alert dialogs and haptic feedback
- **Platform Detection**: Conditional features based on platform capabilities

### Performance Optimizations
- **Memoized Components**: Prevents unnecessary re-renders
- **Efficient Animations**: Uses native driver for 60fps performance
- **Optimized List Rendering**: FlatList with proper key extraction
- **Minimal Re-renders**: Strategic state updates and component structure

## 🎨 Design Philosophy

The app follows modern mobile design principles:
- **Material Design**: Clean, intuitive interface with proper spacing
- **Consistent Theming**: Cohesive color palette across light/dark modes
- **Touch-Friendly**: Minimum 44pt touch targets for accessibility
- **Visual Hierarchy**: Clear information architecture and typography
- **Feedback-Rich**: Immediate visual and haptic feedback for all actions

## 🔧 Available Scripts

```bash
# Development
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser

# Building (requires Expo account)
npm run build:android  # Build Android APK
npm run build:ios      # Build iOS IPA
npm run build:web      # Build for web deployment
```

## 🌟 Advanced Features

### Haptic Feedback Patterns
- **Light**: Task completion toggle
- **Medium**: Adding new tasks, theme toggle
- **Warning**: Task deletion confirmation

### Animation System
- **Entrance**: Staggered list item animations
- **Interaction**: Checkbox scaling, button press feedback
- **State Changes**: Smooth completion state transitions
- **Exit**: Slide-out deletion animations

### Accessibility Features
- **Screen Reader Support**: Comprehensive labels and hints
- **Keyboard Navigation**: Full keyboard accessibility
- **High Contrast**: Theme-aware color schemes
- **Touch Targets**: Minimum 44pt interactive areas

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add proper accessibility labels
- Test on multiple platforms
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Native Team** for the amazing cross-platform framework
- **Expo Team** for excellent development tools and platform
- **Open Source Community** for inspiration and resources
- **Contributors** who help improve this project

## 📞 Support & Feedback

If you encounter any issues or have suggestions:

- **GitHub Issues**: [Report bugs or request features](https://github.com/omara2001/Task-Manager/issues)
- **Documentation**: Check this README and inline code comments
- **Community**: Join discussions in the repository

### Common Issues & Solutions

**App won't start:**
- Ensure Node.js v16+ is installed
- Run `npm install` to install dependencies
- Clear Expo cache: `npx expo start --clear`

**Haptic feedback not working:**
- Haptic feedback only works on physical devices
- Ensure device haptic settings are enabled

**Theme not switching:**
- Check device system theme settings
- Try manual toggle in app header

---

**Made with ❤️ using React Native, Expo, and TypeScript**

*Transform your productivity with beautiful task management! 🎉*