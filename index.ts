import * as pptr from 'puppeteer';
require('dotenv').config();

const password = process.env.password;


async function run(){
  // ブラウザを起動する
  const browser = await pptr.launch({
      args: ['--lang=ja,en-US,en'] // デフォルトでは言語設定が英語なので日本語に変更
  })

  // ページをつくる
  const page = await browser.newPage()

  // サイズを決める
  await page.setViewport({ width: 720, height: 600 })

  // ページを開く
  await page.goto('https://twitter.com/IsPuppeteer')

  // ページタイトルを取得
  console.log(await page.title())

  // スクリーンショットをパシャり
  await page.screenshot({path: 'sample1.png', fullPage: true})

  // ログイン
  await page.type('#signin-dropdown > div.signin-dialog-body > form > div.LoginForm-input.LoginForm-username > input', 'skikuchi7329');
  await page.type('#signin-dropdown > div.signin-dialog-body > form > div.LoginForm-input.LoginForm-password > input',`${password}` );
  await page.click('#signin-dropdown > div.signin-dialog-body > form > input.EdgeButton.EdgeButton--primary.EdgeButton--medium.submit.js-submit');

  //await page.waitFor(5000);
  await new Promise(r=>setTimeout(r,5000))

  // ツイートしてみる
  await page.click('#global-new-tweet-button');
  await page.type('#Tweetstorm-tweet-box-0 > div.tweet-box-content > div.tweet-content > div.RichEditor.RichEditor--emojiPicker.is-fakeFocus > div.RichEditor-container.u-borderRadiusInherit > div.RichEditor-scrollContainer.u-borderRadiusInherit > div.tweet-box.rich-editor.is-showPlaceholder',
                  'これはpuppeteerからのツイートです。');
  await page.screenshot({path: 'sample2.png', fullPage: false})
  await page.click('#Tweetstorm-tweet-box-0 > div.tweet-box-content > div.TweetBoxToolbar > div.TweetBoxToolbar-tweetButton > span > button.SendTweetsButton.EdgeButton.EdgeButton--primary.EdgeButton--medium.js-send-tweets');

  //await page.waitForTimeout(5000);
  await new Promise(r=>setTimeout(r,5000))

  // 終了
  await browser.close()
};

run();