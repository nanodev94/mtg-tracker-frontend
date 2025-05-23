import withPlugins from 'next-compose-plugins'
import createNextIntlPlugin from 'next-intl/plugin'
import createNextBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzerPlugin = createNextBundleAnalyzer()
const nextIntlPlugin = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {}

const plugins = [nextIntlPlugin]
if (process.env.BUNDLE_ANALYZE === 'true') plugins.push(bundleAnalyzerPlugin)

export default withPlugins(plugins, nextConfig)
