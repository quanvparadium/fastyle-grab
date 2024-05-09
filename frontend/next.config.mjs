/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'assets.myntassets.com',
			},
		],

  },

};

export default nextConfig;
