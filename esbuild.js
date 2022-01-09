require('esbuild').build({
    entryPoints: ['./src/index.ts'],
    outfile: 'F:\\Games\\Clone Hero\\index.js', //'./build/index.js',
    minify: true,
    bundle: true,
    target: 'node17',
    platform: 'node',
}).catch(() => process.exit(1))