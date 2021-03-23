const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables
describe('E2E tests', function() {
  this.timeout(6000)
  before(async () => { browser = await chromium.launch({headless: false, slowMo: 500}); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); }); 

  it('refresh and show messages', async () => {
    await page.goto('http://192.168.91.107:8080/');
    await page.click('input#refresh')

    const text = await page.$eval('textarea', x => x.value);

    expect(text).to.contains('Spami: Hello, are you there?');
  });

  it('check by request', async () => {
    await page.goto('http://192.168.91.107:8080/');

    await page.fill('input#author', 'Ivan');
    await page.fill('input#content', 'Hi guys!');

    const [request] = await Promise.all([
      page.waitForRequest(r => r.url().includes('/jsonstore/messenger') && r.method() == 'POST'),
      page.click('input#submit')
    ]);

    const postData = JSON.parse(request.postData());
    console.log(postData);
    expect(postData.author).to.equal('Ivan');
    expect(postData.content).to.equal('Hi guys!');
  })

  it('send a message and refresh', async () => {
    await page.goto('http://192.168.91.107:8080/');

    await page.fill('input#author', 'Peter');
    await page.fill('input#content', 'Hi guys!');

    await page.click('input#submit');
    await page.click('input#refresh');
    
    const text = await page.$eval('textarea', x => x.value);

    expect(text).to.contains('Peter: Hi guys!');
  });

});