# PowerList - Win Every Day

A minimal, grayscale-styled productivity web app implementing Andy Frisella's Power List concept. Built with clean architecture principles using Next.js, TypeScript, TailwindCSS, and ShadCN UI.

## 🚀 Features

### 📋 Daily Power List
- Clean, minimal interface with 5 task cards
- Auto-generates lists from your most recent tasks
- Save/Edit functionality with input validation
- Task completion tracking with visual feedback

### 📆 Smart Daily Rollover
- Automatically creates new lists each day
- Tracks missed days as losses
- Maintains task history and patterns

### 📊 Performance Tracking
- Win/Loss tracking per day
- Current and longest win streaks
- Win rate percentage
- Individual task success rates

### 🏗️ Clean Architecture
- **UI Layer** (`/components/`) - Pure presentational components
- **Service Layer** (`/services/`) - Coordination between UI and backend
- **Business Logic** (`/logic/`) - Pure functions for app rules
- **Backend Layer** (`/backend/`) - Abstracted localStorage access
- **Types** (`/types/`) - Strong TypeScript interfaces

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [ShadCN UI](https://ui.shadcn.com/) - UI components
- [TailwindCSS](https://tailwindcss.com/) - Grayscale styling
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd control_center
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎯 How to Use

1. **Daily Setup**: Each day, enter 5 critical tasks you must complete
2. **Save Your List**: Click "Save List" when all 5 tasks are filled
3. **Track Progress**: Click tasks to mark them complete/incomplete
4. **Win the Day**: Complete all 5 tasks to win the day
5. **Monitor Stats**: View your wins, losses, and streaks over time

## 🎨 Code Quality

Format code with Prettier:
```bash
npm run format
```

Check code formatting:
```bash
npm run format:check
```

Lint code with ESLint:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

## 🏗️ Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## 📁 Project Structure

Following Clean Architecture principles:

```
src/
├── app/                     # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main PowerList page
├── components/             # UI Layer - Pure presentational
│   ├── ui/                # ShadCN UI components
│   ├── TaskCard.tsx       # Individual task component
│   ├── TaskList.tsx       # Task list container
│   └── StatsPanel.tsx     # Statistics display
├── services/              # Service Layer - UI coordination
│   └── powerListService.ts # Main app service hook
├── logic/                 # Business Logic Layer - Pure functions
│   └── powerListLogic.ts  # Core business rules
├── backend/               # Backend Layer - Data access
│   └── localStorage.ts    # LocalStorage abstraction
├── types/                 # TypeScript definitions
│   └── index.ts          # App-wide type definitions
└── lib/                   # Utilities
    └── utils.ts          # Helper functions
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code
- `npm run format:check` - Check code formatting

## 🧠 Architecture Principles

This app follows Clean Architecture principles:

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Dependency Inversion**: Inner layers don't depend on outer layers
3. **Testability**: Pure functions and clear interfaces enable easy testing
4. **Maintainability**: Modular structure allows for easy modifications
5. **Scalability**: Backend abstraction allows easy migration to real databases

## 💡 The Power List Concept

Based on Andy Frisella's Power List methodology:
- Choose 5 critical tasks each day
- Complete all 5 to "win the day"
- Track your wins and losses over time
- Build momentum through consistent daily victories
- Focus on what truly matters most

## 🚀 Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [Render](https://render.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Andy Frisella](https://andyfrisella.com) for the Power List concept
- [Robert C. Martin](https://blog.cleancoder.com) for Clean Architecture principles
- [ShadCN](https://twitter.com/shadcn) for the beautiful UI components