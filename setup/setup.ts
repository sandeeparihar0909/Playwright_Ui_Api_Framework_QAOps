import {test as setup, expect} from '@playwright/test';
import {LoginPage} from '../src/pages/LoginPage.js';
import path from 'path';
import fs from 'fs';

const authFilePath = path.join(process.cwd(), '.auth');

setup('Login user', async ({browser}) => {
    if (!fs.existsSync(authFilePath)) {
        fs.mkdirSync(authFilePath, { recursive: true });
    }

    if(!fs.existsSync(`${authFilePath}/authUser.json`)){

    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    const username = process.env.EH_USERNAME;
    const password = process.env.EH_PASSWORD;
    if (!username || !password) {
        throw new Error('EH_USERNAME and EH_PASSWORD must be set in .env');
    }
    await loginPage.login(username, password);

    // Fail setup if login did not succeed instead of saving an empty auth state
    await expect(page).not.toHaveURL(/\/login/);

    // Save the authentication state to a file
    await context.storageState({ path: `${authFilePath}/authUser.json` });
    await context.close();
    }
});
