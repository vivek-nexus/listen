/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_LINK_PREFIX,
    assetPrefix: process.env.NEXT_PUBLIC_LINK_PREFIX,
};

export default nextConfig
