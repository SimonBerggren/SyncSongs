import fs from 'fs';
import path from 'path';
import { Entry } from './Entry';

const topFolder = 'send';

export const readFolders = (folderName: string = topFolder) => {
    const foldersPath = path.resolve(folderName);
    const folders = [];
    if (fs.existsSync(foldersPath)) {
        const entries = fs.readdirSync(foldersPath);
        return entries.map((entry) => new Entry(folderName, entry));
    }
    return folders;
};
