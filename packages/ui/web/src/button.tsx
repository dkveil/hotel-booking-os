'use client';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
	return (
		<button
			className={`p-2 rounded-md ${className} text-black`}
			type='button'
			onClick={() => alert(`Hello from your ${appName} app!`)}
		>
			{children}
		</button>
	);
};
