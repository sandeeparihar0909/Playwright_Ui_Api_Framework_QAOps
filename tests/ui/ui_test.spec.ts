import { expect } from '@playwright/test';
import {test} from '../../src/fixtures/uiFixture.js';

test('Search event → Select event → Select tickets → Book → Verify booking confirmation.',{tag: ['@smoke']}, async ({ dashboard, eventsPage }) => {
  await dashboard.navigateToDashboard();

  await dashboard.navigateToEvents();

  const eventName:string = "Dilli Diwali Mela";

  await eventsPage.searchEvent(eventName);

  const eventCard = eventsPage.getEventCard(eventName);

  await expect(eventCard).toBeVisible();

});

// test('Browse events → Apply category filter → Verify matching events are displayed.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Select event → Change ticket quantity → Verify total price is updated correctly.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Book event → Open My Bookings → Verify booking details and status.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Open event → Verify event name, date, venue, price and availability.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Select unavailable event → Attempt booking → Verify booking is prevented with an error message.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Select invalid ticket quantity → Attempt booking → Verify validation message.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Select past event → Attempt booking → Verify booking is rejected.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Search multiple event names → Verify expected event results for each dataset.', async ({ dashboard }) => {
//   // Implement the test steps here
// });

// test('Book different ticket quantities for multiple events → Verify booking and total amount.', async ({ dashboard }) => {
//   // Implement the test steps here
// });