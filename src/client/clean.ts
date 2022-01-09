import fs from 'fs';
import path from 'path';
import { terminal } from '../terminal';

export const clean = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        terminal.question(
            'Where is your badsongs.txt? Leave empty if this script is run inside your Clone Hero folder ',
            (location) => {
                const songPath = location || path.resolve(__dirname); // 'F:Games/Clone Hero';
                const badsongsPath = `${songPath}\\badsongs.txt`;

                if (!fs.existsSync(badsongsPath)) {
                    return reject(
                        `Couldn't find badsongs.txt at ${badsongsPath}`
                    );
                }

                const file = fs.readFileSync(badsongsPath).toString();

                const rows = file.split('\n');

                const undeletedPaths: string[] = [];

                rows.forEach((row) => {
                    if (!row || row.startsWith('ERROR')) {
                        return;
                    }

                    const matchingPath = /\(.*\)/.exec(row);

                    if (matchingPath) {
                        const pathToDelete = matchingPath[0].slice(1, -1);

                        if (!fs.existsSync(pathToDelete)) {
                            undeletedPaths.push(matchingPath[0]);
                            return;
                        }

                        console.log('deleting', pathToDelete);

                        deleteFolder(pathToDelete);
                    }
                });

                return resolve(undeletedPaths);
            }
        );
    });
};

const deleteFolder = (path: string) => {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + '\\' + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
