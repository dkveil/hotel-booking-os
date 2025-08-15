import type { JSX } from 'react';

export function Code(props: {
	children: React.ReactNode;
	className?: string;
}): JSX.Element {
	const { children, className } = props;

	return <code className={className}>{children}</code>;
}
