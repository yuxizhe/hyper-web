export default {
  development: {
    '/api/': {
      target: 'http://127.0.0.1:3060',
      changeOrigin: true,
      rewrite: (path: string) => path.replace('^/', '')
    }
  }
} as any
