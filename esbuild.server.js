require('esbuild').build({
    entryPoints: ['./src/server/server.ts'],
    outfile: './build/server/server.js',
    minify: true,
    bundle: true,
    target: 'node17',
    platform: 'node',
    treeShaking: true,
}).catch(() => process.exit(1))