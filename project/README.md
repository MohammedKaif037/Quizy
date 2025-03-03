# QuizWiz - Interactive Quiz Application

QuizWiz is a modern, feature-rich quiz application built with React, TypeScript, and Vite. It allows users to test their knowledge across various categories and difficulty levels.

## Features

- **Dynamic Quiz Generation**: Fetch questions from the Open Trivia Database API
- **Customizable Settings**: Choose number of questions, category, difficulty, and question type
- **Interactive UI**: Modern, responsive interface with animations and transitions
- **Timer Functionality**: Countdown timer for each quiz
- **Immediate Feedback**: See correct answers and explanations after answering
- **Score Tracking**: View your score and performance metrics
- **Leaderboard**: Track your quiz history and progress over time
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript
- **State Management**: Zustand
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/quizwiz.git
cd quizwiz
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
quizwiz/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── __tests__/       # Test files
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## Testing

Run the test suite with:

```bash
npm run test
# or
yarn test
```

For watch mode:

```bash
npm run test:watch
# or
yarn test:watch
```

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Future Enhancements

- User authentication
- Social sharing options
- Multi-language support
- Custom quiz creation
- Multiplayer mode
- Progressive Web App (PWA) support

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the quiz questions API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for icons