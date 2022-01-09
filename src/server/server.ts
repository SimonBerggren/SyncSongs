import express from 'express';
import http from 'http';
import { networkInterfaces } from 'os';
import { readFolders } from '../shared/read';
import { saveEntries } from '../shared/save';

const nets = networkInterfaces();
let localIp = '';

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
            localIp = net.address;
        }
    }
}

const app = express();
app.use(
    express.json({
        limit: '100mb',
    })
);

app.post('/', (request, response) => {
    saveEntries(request.body);
    return response.status(200).send();
});

app.get('/', (_, response) => {
    return response.status(200).json(readFolders());
});

app.get('/ping', (_, response) => {
    return response.status(418).send();
});

http.get({ host: 'api.ipify.org', port: 80, path: '/' }, (resp) => {
    resp.on('data', (ip) => {
        app.listen(1448, () => {
            console.log('Up and running on', ip.toString(), 'or', localIp);
        });
    });
});
