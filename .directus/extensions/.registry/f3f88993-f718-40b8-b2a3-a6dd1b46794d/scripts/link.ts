import { ExtensionManifest } from '@directus/constants';
import fs from 'fs-extra';
import path from 'path';
import { log } from '../node_modules/@directus/extensions-sdk/dist/cli/utils/logger.js';

let directusPath = process.env.DIRECTUS_APP_ABSOLUTED_PATH || 'directus'
const extensionPath = process.cwd();

if( directusPath === 'directus' ) {
    directusPath = path.resolve(extensionPath, 'directus/')
}

const AppExtensions = [
    'display',
    'interface',
    'layout',
    'module',
    'operation',
    'panel'
]

export default async function link() {
    const absoluteExtensionsPath = path.resolve(process.cwd(), 'src');
    // if (!fs.existsSync(absoluteExtensionsPath)) {
    //     log(`Extensions folder does not exist at ${absoluteExtensionsPath}`, 'error');
    //     return;
    // }
    const packagePath = path.resolve('package.json');
    if (!(await fs.pathExists(packagePath))) {
        log(`Current directory is not a valid package.`, 'error');
        return;
    }
    let manifestFile;
    try {
        manifestFile = await fs.readJSON(packagePath);
    }
    catch (err) {
        log(`Current directory is not a valid Directus extension.`, 'error');
        return;
    }
    const extensionManifest = ExtensionManifest.parse(manifestFile);
    const extensionName = extensionManifest.name;
    if (!extensionName) {
        log(`Extension name not found in package.json`, 'error');
        return;
    }
    const type = extensionManifest['directus:extension']?.type;
    if (!type) {
        log(`Extension type not found in package.json`, 'error');
        return;
    }

    if( type === 'bundle' ) {
        log(`Start link extension type bundle`);
        extensionManifest['directus:extension']?.entries?.map((entry) => {
            if( ! AppExtensions.includes(entry.type) ) {
                return
            }
            const entryAbsolutePath = path.join(absoluteExtensionsPath, entry.name)
            const entryTarget = path.join(directusPath, '/src/', `${entry.type}s`, entry.name);

            try {
                fs.ensureSymlinkSync(entryAbsolutePath, entryTarget);
            }
            catch (error) {
                log(error.message, 'error');
                log(`Try running this command with administrator privileges`, 'info');
                return;
            }
            log(`Linked ${entry.type} "${entry.name}" to ${entryTarget}`, 'info');
        })

        return;
    }

    const extensionTarget = path.join(absoluteExtensionsPath, extensionName);
    try {
        fs.ensureSymlinkSync(extensionPath, extensionTarget);
    }
    catch (error) {
        log(error.message, 'error');
        log(`Try running this command with administrator privileges`, 'info');
        return;
    }
    log(`Linked ${extensionName} to ${extensionTarget}`);
    return;
}

(async() => await link())()