import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你也可以将错误日志上报给服务器
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            // 你可以自定义降级后的 UI 并渲染
            return (
                <div />
            );
        }

        // console.error("ErrorBoundary caught an error:", this.state.error, this.state.errorInfo);

        return this.props.children;
    }
}

export default ErrorBoundary;