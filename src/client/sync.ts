import fs from 'fs';
import { terminal } from '../terminal';

export const sync = () => {
    terminal.question(
        'Where are your songs? Leave empty if this script is run inside your songs folder: ',
        (location) => {
            const songPath = location || 'F:Games/Clone Hero/Songs'; // path.resolve(__dirname);

            console.log(songPath);

            fs.readdir(songPath, undefined, (_, songs) => {
                songs.forEach((song) => {
                    const fullSongPath = `${songPath}/${song}`;
                    if (fs.lstatSync(fullSongPath).isDirectory()) {
                        console.log(fullSongPath);
                    }
                });
            });
        }
    );
};
