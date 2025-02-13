import React from 'react';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import LoginFooter from './LoginFooter';
import BackgroundDecorations from './BackgroundDecorations';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center relative overflow-hidden">
      <BackgroundDecorations />
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-2xl shadow-lg relative z-10">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
};

export default LoginPage;