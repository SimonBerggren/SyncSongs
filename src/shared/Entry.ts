import path from 'path';
import fs from 'fs';

export interface IEntry {
    isDir: boolean;
    name: string;
    path: string;
    fullPath: string;
    children: IEntry[];
    data: string;
}

export class Entry implements IEntry {
    isDir: boolean;
    name: string;
    path: string;
    fullPath: string;
    children: Entry[];
    data: string;

    constructor(relativePath?: string, name?: string) {
        if (!relativePath) {
            return;
        }

        this.name = name;
        this.path = relativePath;
        this.fullPath = path.join(relativePath, name);
        this.isDir = fs.lstatSync(this.fullPath).isDirectory();
        this.children = [];

        if (this.isDir) {
            this.fill();
        } else {
            this.data = fs.readFileSync(this.fullPath).toString('base64');
        }
    }

    copy(data: IEntry) {
        this.name = data.name;
        this.path = data.path;
        this.fullPath = data.name;
        this.isDir = data.isDir;
        this.children = data.children.map((child) => new Entry().copy(child));
        this.data = data.data;
        return this;
    }

    fill() {
        const entries = fs.readdirSync(this.fullPath);
        this.children = entries.map((entry) => new Entry(this.fullPath, entry));
    }

    dump(root: string) {
        const resolvedPath = path.resolve(root, this.name);
        if (this.isDir) {
            if (!fs.existsSync(resolvedPath)) {
                fs.mkdirSync(resolvedPath);
            }

            this.children.forEach((child) => child.dump(resolvedPath));
        } else {
            fs.writeFileSync(resolvedPath, this.data);
        }
    }

    toString() {
        if (this.isDir) {
            return (
                this.name +
                ' [ ' +
                this.children.map((child) => child.toString()) +
                ' ]'
            );
        }

        return this.name;
    }
}
