import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Github, Zap, Shield, Palette } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Control Center</h1>
          </div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Production-Ready
            <br />
            Next.js Template
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern, fully-configured Next.js application with TypeScript, ShadCN UI, 
            TailwindCSS, and comprehensive testing setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Github className="mr-2 h-5 w-5" />
              View Source
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <CardTitle>Lightning Fast</CardTitle>
              </div>
              <CardDescription>
                Built with Next.js 14 and optimized for performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Server-side rendering, static generation, and automatic code splitting 
                for optimal loading speeds.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Type Safe</CardTitle>
              </div>
              <CardDescription>
                Full TypeScript support with strict mode enabled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Catch errors at compile time and enjoy better developer experience 
                with intelligent code completion.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Palette className="h-6 w-6 text-primary" />
                <CardTitle>Beautiful UI</CardTitle>
              </div>
              <CardDescription>
                ShadCN UI components with dark mode support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accessible, customizable components built on Radix UI primitives 
                with TailwindCSS styling.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tech Stack */}
        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-8">Built With Modern Tools</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-muted rounded-full">Next.js 14</span>
            <span className="px-3 py-1 bg-muted rounded-full">TypeScript</span>
            <span className="px-3 py-1 bg-muted rounded-full">ShadCN UI</span>
            <span className="px-3 py-1 bg-muted rounded-full">TailwindCSS</span>
            <span className="px-3 py-1 bg-muted rounded-full">Radix UI</span>
            <span className="px-3 py-1 bg-muted rounded-full">Jest</span>
            <span className="px-3 py-1 bg-muted rounded-full">ESLint</span>
            <span className="px-3 py-1 bg-muted rounded-full">Prettier</span>
          </div>
        </section>
      </div>
    </main>
  );
}