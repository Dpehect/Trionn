"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = {
  failed: boolean;
};

export class WebGLErrorBoundary extends Component<Props, State> {
  state: State = {
    failed: false,
  };

  static getDerivedStateFromError(): State {
    return {
      failed: true,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("WebGL experience failed; fallback activated.", {
      message: error.message,
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
