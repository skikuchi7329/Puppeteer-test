const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,  // 動作確認するためheadlessモードにしない
    slowMo: 500  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  })
  const page = await browser.newPage()
  await page.goto('https://twitter.com/i/flow/login')
  await page.type('input[name="text"]', 'skikuchi7329', {delay: 5000})
  await page.keyboard.press('Enter')

  await browser.close()
})()