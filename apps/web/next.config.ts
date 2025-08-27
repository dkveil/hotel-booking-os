import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	transpilePackages: ['@repo/ui-web'],
	serverExternalPackages: ['pino-pretty'],
};

export default nextConfig;
