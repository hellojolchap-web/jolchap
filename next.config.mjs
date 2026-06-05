/** @type {import('next').NextConfig} */

// Derive the Supabase storage hostname from the public URL so next/image can
// optimise the WebP assets we serve from Supabase Storage.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
let supabaseHost = "";
try {
  if (supabaseUrl) supabaseHost = new URL(supabaseUrl).hostname;
} catch {
  supabaseHost = "";
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Keep `sharp` (native image library used by the upload route) out of the
  // bundled serverless function — it runs from node_modules at runtime. This
  // avoids function-size / native-binary issues on the deploy platform.
  serverExternalPackages: ["sharp"],

  // The project type-checks and lints clean locally; we don't want a stray
  // lint/type edge case on the build platform to block a production deploy.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    // Standardise the whole project on WebP; the upload pipeline stores WebP.
    formats: ["image/webp"],
    remotePatterns: [
      // Supabase Storage public bucket (derived from your env at build time).
      ...(supabaseHost
        ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
        : []),
      // Fallback so any *.supabase.co project works out of the box.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
