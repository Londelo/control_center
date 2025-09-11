import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock the theme toggle component
jest.mock('@/components/theme-toggle', () => ({
  ThemeToggle: () => <button>Toggle Theme</button>,
}))

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />)
    expect(screen.getByText('Production-Ready')).toBeInTheDocument()
    expect(screen.getByText('Next.js Template')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<Home />)
    expect(
      screen.getByText(/A modern, fully-configured Next.js application/)
    ).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /view source/i })).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(<Home />)
    expect(screen.getByText('Lightning Fast')).toBeInTheDocument()
    expect(screen.getByText('Type Safe')).toBeInTheDocument()
    expect(screen.getByText('Beautiful UI')).toBeInTheDocument()
  })

  it('renders tech stack badges', () => {
    render(<Home />)
    expect(screen.getByText('Next.js 14')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('ShadCN UI')).toBeInTheDocument()
  })

  it('renders theme toggle', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })
})