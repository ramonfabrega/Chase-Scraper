const puppeteer = require('puppeteer');
const credentials = require('./credentials');
const { parseData } = require('./helper');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const USERNAME_SELECTOR = '#userId-input-field';
  const PASSWORD_SELECTOR = '#password-input-field';
  const LOGIN_BUTTON = '#signin-button';
  const TRANSACTIONS_SELECTOR = '#activityTable';
  const MORE_INFO_SELECTOR = '#seeMore';

  await page.goto('https://secure05b.chase.com/web/auth/dashboard');

  let iframe;
  for (const frame of page.mainFrame().childFrames()) {
    if (frame.name() == 'logonbox') iframe = frame;
  }

  await iframe
    .waitForSelector(USERNAME_SELECTOR)
    .then(() => iframe.type(USERNAME_SELECTOR, credentials.username))
    .catch(err => console.log(err));

  await iframe
    .waitForSelector(PASSWORD_SELECTOR)
    .then(() => iframe.type(PASSWORD_SELECTOR, credentials.password))
    .catch(err => console.log(err));

  await iframe.click(LOGIN_BUTTON);

  await page.waitForSelector(MORE_INFO_SELECTOR);
  await page.click(MORE_INFO_SELECTOR);

  await page.waitForSelector('#transaction-40');

  await page.waitForSelector(TRANSACTIONS_SELECTOR);
  const table = await page.$(TRANSACTIONS_SELECTOR);

  let entries = await page.$$eval(
    `${TRANSACTIONS_SELECTOR} tbody tr td span`,
    entries => entries.map(e => e.textContent)
  );

  const temp = parseData(entries);
  console.log(temp);
})();
