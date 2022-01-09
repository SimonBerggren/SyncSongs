import { terminal } from '../terminal';
import { clean } from './clean';
import { sync } from './sync';

const run = async (command: string) => {
    if (command === 'clean') {
        try {
            const filesNotDeleted = await clean();
            if (!filesNotDeleted.length) {
                console.log('Cleaning complete, no files left to delete :)');
            } else {
                console.log(
                    'Cleaning complete, unable to delete the following files:'
                );
                filesNotDeleted.forEach((file) => console.log(file));
            }
        } catch (error) {
            console.error(error);
        }
        process.exit();
    } else if (command === 'sync') {
        sync();
    } else {
        console.log('Invalid command', command);
    }
};

terminal.question('What do you want to do? ', (command) => {
    run(command);
});
