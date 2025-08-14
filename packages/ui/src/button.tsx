'use client';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button className={`bg-blue-500 p-2 rounded-md ${className}`} type='button' onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};
