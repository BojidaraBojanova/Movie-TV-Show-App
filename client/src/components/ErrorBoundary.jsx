import { Component } from 'react';

export default class ErrorBoundary extends Component{
    constructor(){
        super()

        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(err) {
        console.log('GetDerivedStateFromError');
        return{
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo){
        console.log('componentDidCatch')
        
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }

    render() {
        if(this.state.hasError){
            return (
                <div className='error-boundary-wrapper'>
                    <h1>404 Error</h1>
                </div>
            )
           
            
        }
        return this.props.children;
    }
}