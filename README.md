# Control Center

A production-ready Next.js application built with TypeScript, ShadCN UI, and modern development tools.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** with strict mode enabled
- **ShadCN UI** components with Radix UI primitives
- **TailwindCSS** for styling with dark mode support
- **Jest** and React Testing Library for testing
- **ESLint** and **Prettier** for code quality
- **Responsive design** with mobile-first approach
- **Theme switching** (light/dark mode)

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [ShadCN UI](https://ui.shadcn.com/) - UI components
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Londelo/control_center.git
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

## 🧪 Testing

Run tests in watch mode:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

Run tests in CI mode:
```bash
npm run test:ci
```

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

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── __tests__/        # Component tests
├── lib/                  # Utility functions
│   └── utils.ts
└── hooks/               # Custom React hooks (add as needed)
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests in CI mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code
- `npm run format:check` - Check code formatting

## 🌙 Dark Mode

The application includes built-in dark mode support using `next-themes`. Users can toggle between light and dark themes using the theme toggle button in the header.

## 🧩 Adding New Components

To add new ShadCN UI components:

```bash
npx shadcn-ui@latest add [component-name]
```

For example, to add a dialog component:
```bash
npx shadcn-ui@latest add dialog
```

## 📝 Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

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

- [ShadCN](https://twitter.com/shadcn) for the amazing UI components
- [Vercel](https://vercel.com) for Next.js
- [Tailwind Labs](https://tailwindlabs.com) for TailwindCSS
- [Radix UI](https://www.radix-ui.com) for accessible primitives