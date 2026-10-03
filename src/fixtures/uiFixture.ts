import {test as base, type Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage.js';
import { EventsPage } from '../pages/EventsPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import path from 'path/win32';


const authFile = path.join(
    process.cwd(),
    '.auth',
    'authUser.json');

type fixtures = {
    authUser: Page;
    loginPage: LoginPage;
    dashboard: DashboardPage;
    eventsPage: EventsPage;
};

export const test = base.extend<fixtures>({

    authUser: async ({browser}, use) => {
        const context = await browser.newContext({ storageState: authFile });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
    
    loginPage: async ({authUser}, use) => {
        const loginPage = new LoginPage(authUser);
        await use(loginPage);
    },

    dashboard: async ({authUser}, use) => {
        const dashboard = new DashboardPage(authUser);
        await use(dashboard);
    },

    eventsPage: async ({authUser}, use) => {
        const eventsPage = new EventsPage(authUser);
        await use(eventsPage);
    }

})