const { chromium } = require('playwright-chromium');
const { expect, assert } = require('chai');

let browser, page; // Declare reusable variables
describe('E2E tests', function () {
  this.timeout(10000)
  before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }); });
  after(async () => { await browser.close(); });
  beforeEach(async () => { page = await browser.newPage(); });
  afterEach(async () => { await page.close(); });

  it('home page', async () => {
    await page.goto('http://127.0.0.1:8080/');

    const text = await page.$$eval('th', x => x.map(t => t.textContent));
    const author = await page.textContent('thead tr:nth-child(1)');
    //const action = await page.textContent('thead tr:second-child');

    expect(text[0]).to.contains('Title');
    expect(author).to.contains('Author');
    expect(text[2]).to.contains('Action');
  });

  it('refresh and show books', async () => {
    await page.goto('http://127.0.0.1:8080/');
    await page.click('button#loadBooks');

    const text = await page.$$eval('td', x => x.map(t => t.textContent));

    expect(text[0]).to.contains('Harry Potter and the Philosopher\'s Stone');
    expect(text[1]).to.contains('J.K.Rowling');
  });

  it('add a book and refresh', async () => {
    await page.goto('http://127.0.0.1:8080/');

    await page.fill('form#createForm input[name="title"]', 'In the Footsteps of the Lincolns');
    await page.fill('form#createForm input[name="author"]', 'Ida M. Tarbell');

    const [request] = await Promise.all([
      page.waitForRequest(r => r.url().includes('/jsonstore/collections/books') && r.method() == 'POST'),
      page.click('text=Submit')
    ]);
    const postData = JSON.parse(request.postData());
    console.log(postData);
    expect(postData.author).to.equal('Ida M. Tarbell');
    expect(postData.title).to.equal('In the Footsteps of the Lincolns');

    await page.click('button#loadBooks');

    const text = await page.$$eval('td', x => x.map(t => t.textContent));
    expect(text[6]).to.contains('In the Footsteps of the Lincolns');
    expect(text[7]).to.contains('Ida M. Tarbell');
  });

  it('delete a book and refresh', async () => {
    await page.goto('http://127.0.0.1:8080/');

    await page.click('button#loadBooks');
    page.on('dialog', dialog => {       // "dialog" - handle alert, confirm, prompt
      dialog.accept();
    });

    const [request] = await Promise.all([
      page.waitForRequest(r => r.url().includes('/jsonstore/collections/books/d953e5fb-a585-4d6b-92d3-ee90697398a0') && r.method() == 'DELETE'),
      page.click('button.deleteBtn')
    ]);
    const postData = JSON.parse(request.postData());
    console.log(request);
    // expect(postData).to.deep.equal('null');

    await page.click('button#loadBooks');

    const text = await page.$$eval('td', x => x.map(t => t.textContent));
    expect(text[0]).to.contains('C# Fundamentals');
    expect(text[1]).to.contains('Svetlin Nakov');
  })

  it('edit book and refresh', async () => {
    await page.goto('http://127.0.0.1:8080/');

    await page.click('button#loadBooks');
    await page.click('text=Edit');

    await page.fill('form#editForm input[name="title"]', '');
    await page.fill('form#editForm input[name="author"]', '');

    await page.fill('form#editForm input[name="title"]', 'C#');
    await page.fill('form#editForm input[name="author"]', 'Nakov');

    const [request] = await Promise.all([
      page.waitForRequest(r => r.url().includes('/jsonstore/collections/books/d953e5fb-a585-4d6b-92d3-ee90697398a1') && r.method() == 'PUT'),
      page.click('text=Save')
    ]);
    
    const postData = JSON.parse(request.postData());
    console.log(postData);
    expect(postData.author).to.equal('Nakov');
    expect(postData.title).to.equal('C#');

    await page.click('button#loadBooks');

    const text = await page.$$eval('td', x => x.map(t => t.textContent));
    expect(text[0]).to.contains('C#');
    expect(text[1]).to.contains('Nakov');
  });
});