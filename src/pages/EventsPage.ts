import type {Locator, Page} from '@playwright/test';

export class EventsPage {
    readonly pageHeading: Locator;
    readonly searchInput: Locator;
    readonly categoryFilter: Locator;
    readonly cityFilter: Locator;
    readonly eventCards: Locator;
    readonly eventTitleLinks: Locator;
    readonly bookNowLinks: Locator;
    readonly addNewEventLink: Locator;
    readonly eventDetailHeading: Locator;
    readonly eventBreadcrumbLink: Locator;
    readonly ticketCount: Locator;
    readonly decreaseTicketButton: Locator;
    readonly increaseTicketButton: Locator;
    readonly customerNameInput: Locator;
    readonly customerEmailInput: Locator;
    readonly customerPhoneInput: Locator;
    readonly confirmBookingButton: Locator;

    constructor(private page: Page) {
        const main = page.getByRole('main');
        //Events Page
        this.pageHeading = main.getByRole('heading', {name: 'Upcoming Events', exact: true});
        this.searchInput = main.getByRole('textbox', {name: 'Search events, venues…'});
        this.categoryFilter = main.getByRole('combobox').nth(0);
        this.cityFilter = main.getByRole('combobox').nth(1);
        this.eventCards = main.getByRole('article');
        this.eventTitleLinks = this.eventCards.getByRole('link').filter({has: this.page.locator('h3')});
        this.bookNowLinks = this.eventCards.getByRole('link', {name: 'Book Now', exact: true});
        this.addNewEventLink = main.getByRole('link', {name: 'Add New Event', exact: true});

        //Events>Event
        this.eventDetailHeading = page.getByRole('heading', {level: 1});
        this.eventBreadcrumbLink = page.getByRole('navigation').getByRole('link', {name: 'Events', exact: true});
        this.ticketCount = page.getByText('Tickets', {exact: true}).locator('..').locator('..').getByText(/^\d+$/);
        this.decreaseTicketButton = page.getByRole('button', {name: '-', exact: true});
        this.increaseTicketButton = page.getByRole('button', {name: '+', exact: true});
        this.customerNameInput = page.getByRole('textbox', {name: 'Full Name*'});
        this.customerEmailInput = page.getByRole('textbox', {name: 'Email*'});
        this.customerPhoneInput = page.getByRole('textbox', {name: 'Phone Number*'});
        this.confirmBookingButton = page.getByRole('button', {name: 'Confirm Booking', exact: true});
    }

    getEventCard(title: string): Locator {
        return this.eventCards.filter({
            has: this.page.getByRole('heading', {name: title, exact: true}),
        });
    }

    getEventTitleLink(title: string): Locator {
        return this.getEventCard(title).getByRole('link', {name: title, exact: true});
    }

    getBookNowLink(title: string): Locator {
        return this.getEventCard(title).getByRole('link', {name: 'Book Now', exact: true});
    }

    async searchEvent(query: string): Promise<void> {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
       
    }

    async clickOnEventLink(title: string): Promise<void> {
        await this.getEventTitleLink(title).click();
    }


}
