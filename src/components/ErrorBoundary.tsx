import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center text-ink bg-paper">
          <h1 className="font-display text-2xl sm:text-3xl text-indigo">Something went wrong.</h1>
          <p className="mt-2 text-sm text-ink-muted">Please refresh the page to reload the application.</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-on-brand transition-transform hover:scale-105"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
