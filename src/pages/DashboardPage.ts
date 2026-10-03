import type {Page, Locator} from '@playwright/test';
import { expect } from '@playwright/test';

export class DashboardPage {
    readonly brandLink: Locator;
    readonly homeLink: Locator;
    readonly eventsLink: Locator;
    readonly bookingsLink: Locator;
    readonly apiDocsLink: Locator;
    readonly adminButton: Locator;
    readonly logoutButton: Locator;
    readonly heroHeading: Locator;
    readonly browseEventsLink: Locator;
    readonly heroBookingsLink: Locator;
    readonly featuredEventsHeading: Locator;
    readonly viewAllEventsLink: Locator;
    readonly featuredEventCards: Locator;
    readonly exploreAllEventsLink: Locator;

    constructor(private page: Page) {
        const navigation = page.getByRole('navigation');
        const main = page.getByRole('main');

        this.brandLink = navigation.getByRole('link', {name: 'EventHub', exact: true});
        this.homeLink = navigation.getByRole('link', {name: 'Home', exact: true});
        this.eventsLink = navigation.getByRole('link', {name: 'Events', exact: true});
        this.bookingsLink = navigation.getByRole('link', {name: 'My Bookings', exact: true});
        this.apiDocsLink = navigation.getByRole('link', {name: 'API Docs', exact: true});
        this.adminButton = navigation.getByRole('button', {name: 'Admin', exact: true});
        this.logoutButton = navigation.getByRole('button', {name: 'Logout', exact: true});
       
        this.heroHeading = main.getByRole('heading', {name: 'Discover & Book Amazing Events', exact: true});
        this.browseEventsLink = main.getByRole('link', {name: 'Browse Events →', exact: true});
        this.heroBookingsLink = main.getByRole('link', {name: 'My Bookings', exact: true});
        this.featuredEventsHeading = main.getByRole('heading', {name: 'Featured Events', exact: true});
        this.viewAllEventsLink = main.getByRole('link', {name: 'View all →', exact: true});
        this.featuredEventCards = main.getByRole('article');
        this.exploreAllEventsLink = main.getByRole('link', {name: 'Explore All Events', exact: true});
    }

    async navigateToDashboard() : Promise<void> {
        await this.page.goto('https://eventhub.rahulshettyacademy.com/');
        await expect(this.page).toHaveURL("https://eventhub.rahulshettyacademy.com");
        
    }

    async navigateToEvents() : Promise<void> {
        await this.eventsLink.click();
        await expect(this.page).toHaveURL("https://eventhub.rahulshettyacademy.com/events");
    }

    async navigateToBookings() : Promise<void> {
        await this.bookingsLink.click();
    }
}
