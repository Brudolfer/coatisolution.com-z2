/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Entfernen Sie hier die Zeile 'output: 'export','
  // Wenn keine 'output'-Eigenschaft vorhanden ist, verwendet Next.js standardmäßig den Node.js-Server,
  // der für Server Actions erforderlich ist.
}

export default nextConfig
