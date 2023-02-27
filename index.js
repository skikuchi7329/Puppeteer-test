const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,  // 動作確認するためheadlessモードにしない
    slowMo: 500  // 動作確認しやすいようにpuppeteerの操作を遅延させる
  })
  const page = await browser.newPage()

  await page.setViewport({ width: 720, height: 600 })

  await page.goto('https://twitter.com/')  // Twitterのホームページに移動
  await page.click('a[href="/login"]') //ログインボタンをクリック
  await page.type('input[name="text"]', 'skikuchi7329') //ログインIDを入力
  await page.keyboard.press('Enter') //エンターキーを押して次へ（ボタンを選択もOK)
  await page.type('input[name="password"]', `${process.env.password}`) //パスワードを入力
  await page.keyboard.press('Enter')
  new Promise(r => setTimeout(r,5000)) //５秒まつ
  await page.click('a[href^="/compose/tweet"]') //新規ツイートボタンをクリック
  await page.type('.DraftEditor-root', 'これはpuppeteerからのツイートです') //ツイート内容を入力
  await page.screenshot({ path: 'screenshot/sample1.png' }, { delay: 5000}) //ツイート内容を入力した状態でスクリーンショットを撮る
  await page.click('div[data-testid="tweetButton"]') //ツイートする
  
  await browser.close();
})()