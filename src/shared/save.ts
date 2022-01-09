import fs from 'fs';
import path from 'path';
import { Entry, IEntry } from './Entry';

const syncedRoot = path.resolve('received');

export const saveEntries = (entries: IEntry[]) => {
    if (!fs.existsSync(syncedRoot)) {
        fs.mkdirSync(syncedRoot);
    }

    entries.forEach(saveEntry);
};

export const saveEntry = (entry: IEntry) => {
    new Entry().copy(entry).dump(syncedRoot);
};
