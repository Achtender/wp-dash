import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  devIndicators: false,
  env: {
    WORDPRESS_URL: process.env.WORDPRESS_URL,
    WORDPRESS_HOSTNAME: process.env.WORDPRESS_HOSTNAME,
    WORDPRESS_API_BASIC_AUTH: process.env.WORDPRESS_API_BASIC_AUTH,
    WORDPRESS_WEBHOOK_SECRET: process.env.WORDPRESS_WEBHOOK_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.WORDPRESS_HOSTNAME}`,
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // {
      //   source: "/wp-login",
      //   destination: `${process.env.WORDPRESS_URL}/wp-admin`,
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
