import fetch from 'node-fetch';
import { terminal } from '../shared/terminal';
import { readFolders } from '../shared/read';
import { saveEntries } from '../shared/save';

let url = '';
const getIP = (): Promise<string> => {
    return new Promise((resolve) =>
        terminal.question('What IP does your friend have? ', (ip) =>
            resolve(ip)
        )
    );
};

const send = async () => {
    await fetch(url, {
        body: JSON.stringify(readFolders()),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log('Done!');
};

const receive = async () => {
    const response = await fetch(url, {
        method: 'GET',
    });
    const json = (await response.json()) as any;
    saveEntries(json);
};

const main = async () => {
    if (!url) {
        try {
            const ipAdress = await getIP();
            const tempUrl = `http://${ipAdress}:1448`;
            const response = await fetch(`${tempUrl}/ping`);
            if (response.status != 418) {
                throw new Error();
            }
            url = tempUrl;
        } catch (error) {
            console.log('No server found');
            return main();
        }
    }

    terminal.question(
        'What do you want to do? Send or Receive? ',
        async (command) => {
            switch (command.toLowerCase()) {
                case 'send':
                    await send();
                    main();
                    return;
                case 'receive':
                    await receive();
                    main();
                    return;
                default:
                    console.log('Invalid command!');
                    main();
            }
        }
    );
};

// 81.227.102.162

main();
