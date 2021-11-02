const puppeteer = require('puppeteer');
let result = {} ;

(async () => {
    
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
    let licenseNo = process.argv.slice(2);
  // 0000131400
  //await page.goto(`https://market.sec.or.th/LicenseCheck/persondetail/0000131400`);
  await page.goto(`https://market.sec.or.th/LicenseCheck/persondetail/${licenseNo}`);
  //await page.goto('http://oiceservice.oic.or.th/licenseagency/license.php?action=search');
  //await page.screenshot({ path: 'example.png' });
    //console.log(await page.evaluate(() => person));
    //
    result  = await page.evaluate(() => person);

    console.log(result);

  await browser.close();
})();
