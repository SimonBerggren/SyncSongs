require('esbuild').build({
    entryPoints: ['./src/client/client.ts'],
    outfile: './build/client/client.js',
    minify: true,
    bundle: true,
    target: 'node17',
    platform: 'node',
    treeShaking: true,
}).catch(() => process.exit(1))