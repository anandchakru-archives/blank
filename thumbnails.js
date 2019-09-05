// # npm i -D puppeteer puppeteer-core
const puppeteer = require('puppeteer');
// console.log(JSON.stringify(puppeteer.devices));
const devices = {
  xs: puppeteer.devices['iPhone 5'], sm: puppeteer.devices['iPad'], md: puppeteer.devices['Kindle Fire HDX'],
  lg: puppeteer.devices['iPad Pro'], xl: puppeteer.devices['Kindle Fire HDX landscape']
}
const deviceIds = Object.keys(devices);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const takeSs = (browser, id) => {
  return new Promise(async (resolve) => {
    console.log(`${id} started.`);
    const page = await browser.newPage();
    page.once('load', async () => {
      console.log(`${id} loaded.`);
      await sleep(5000);
      console.log(`${id} screenshot.`);
      await page.screenshot({ path: `./src/assets/thumbnail-${id}.jpg` });
      console.log(`${id} done.`);
      await sleep(1000);
      await page.close();
      console.log(`${id} closed.`);
    });
    await page.emulate(devices[id]);
    await page.goto('https://nesign.github.io/niview');
    console.log(`${id} done.`);
    return resolve();
  });
}
(async () => {
  //const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const browser = await puppeteer.launch();
  for (let i = 0; i < deviceIds.length; i++) {
    await takeSs(browser, deviceIds[i]);
    await sleep(6000);
  }
})();
