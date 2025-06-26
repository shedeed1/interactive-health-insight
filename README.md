# Interactive Health Insight

A React Native application that collects health data (mood, sleep, and notes) and provides personalized suggestions
using a Fastify backend.

https://github.com/user-attachments/assets/e066cb89-c56f-46ed-ac0f-f26ac9ee2715


## Project Structure

- **React Native App**: The main mobile application that collects user health data
- **Fastify Backend**: A small backend server that processes the health data and returns personalized suggestions

## Tech Stack Used

- **React Native**: Core framework for building the cross-platform mobile application
- **Tamagui**: UI component library for consistent styling and theming
- **React Native Reanimated**: Advanced animation library for creating fluid, high-performance animations
- **Fastify**: Lightweight and efficient backend server for processing health data and generating suggestions

## Implementation Approach

- **Section-based Architecture**: The app is structured around distinct, modular sections (Mood, Sleep, Notes) with
  smooth transitions between them, allowing for a focused user experience on one task at a time
- **Custom Animation Hooks**: Created specialized hooks for different animation types (section transitions, error
  popups, text animations, color transitions) to maintain clean component code while enabling rich visual feedback
- **Expressive UI Elements**: Each interactive element (especially mood emojis) has carefully crafted animations that
  visually represent their meaning, enhancing user engagement and emotional connection

## Design Decisions

### Custom Animation Hooks for Rich Interactions

A key design decision was to create specialized animation hooks (like useErrorPopupAnimation, useTextAnimation,
useColorAnimation, and useSectionAnimations) that encapsulate complex animation logic. These hooks leverage React Native
Reanimated to create fluid, performant animations while keeping component code clean and focused on presentation. By
abstracting animation logic into reusable hooks, we achieved consistent animation patterns throughout the app while
making the codebase more maintainable. This approach also allows for easy tweaking of animation parameters without
modifying component code.

### Mood Selection with Animated Emojis

The mood selection interface uses animated emojis that respond uniquely to user interaction. Each mood (happy, sad,
angry, etc.) has a distinct animation pattern that visually reinforces the emotion it represents. For example, the "
happy" emoji bounces upward with increased scale, while the "tired" emoji shows a nodding motion with decreased opacity.
This design decision creates an intuitive and engaging way for users to express their emotional state, making the data
collection process more enjoyable and accurate.

### Multi-section Flow with Animated Transitions

Rather than presenting all input fields on a single screen, the app uses a multi-section approach with smooth animated
transitions between sections. This design decision helps focus the user's attention on one task at a time, reducing
cognitive load and improving data quality. The animations provide visual continuity between sections, making the
experience feel cohesive despite being separated into distinct steps. This approach also allows for validation at each
step before proceeding to the next.

# Getting Started

> **Note**: Make sure you have completed
> the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start the Backend Server

Before running the React Native app, you need to start the backend server:

```sh
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will run on http://localhost:3000. Keep this terminal window open.

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the
following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native
deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please
visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your
connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 4: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update
and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>
  Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## How to Use the Application

The application consists of three main sections:

1. **Mood Section**: Select your current mood level from the emoji options.
2. **Sleep Section**: Use the slider to indicate how many hours of sleep you got.
3. **Notes Section**: Enter any additional notes about how you're feeling.

Navigate between sections using the numbered buttons or the Next/Previous buttons at the bottom of the screen.

After completing all three sections, click the "Save" button to send your data to the backend. The backend will process
your inputs and return personalized suggestions based on your mood, sleep, and notes. These suggestions will be
displayed in a new screen.

## Future Improvements

With more time, I would implement a data visualization dashboard that shows trends in the user's mood and sleep patterns
over time. This would include interactive charts and graphs that help users identify correlations between their sleep
quality, mood states, and other factors mentioned in their notes. The dashboard would use animation to bring the data to
life, making it more engaging and insightful for users to track their health progress.

Additionally, I would focus on improving error handling for the backend, implementing an offline-first approach to
ensure the app works reliably without constant internet connection, and if the app scales, I'd add a tool like Zustand
for more efficient state management across components.
