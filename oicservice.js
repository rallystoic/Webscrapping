const puppeteer = require('puppeteer');
let result = {} ;
let datainfo = {
    fl_name : '',
    company_name : '',
    license_no : '',
    license_type : '',
    issuer_date : '',
    expired_date : '',
    detail : ''
};


(async () => {
    let licenseNo = process.argv.slice(2);
    //4101013888

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.once("request", interceptedRequest => {
        interceptedRequest.continue({
            method: "POST",
            postData: `licenseNo=${licenseNo}`,
            //postData: "licenseNo=3901019967",

            headers: {
                //...interceptedRequest.headers(),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    });
        const response = await page.goto("http://oiceservice.oic.or.th/licenseagency/license.php?action=search");

    //console.log(await response.text());

          // console.log({
          //             url: response.url(),
          //             statusCode: response.status(),
          //             body: await response.text()
          //           });
    //
    //
    //
     let bodyHTML = await page.evaluate(() =>  document.documentElement.querySelectorAll('.td-table').innerHTML);

    /*
     *license_type get result and mapping to object
     */

    const tweets = await page.$$('.td-table');
          datainfo.fl_name = await (await tweets[1].getProperty('innerText')).jsonValue();
    //console.log(tweets.length);
      datainfo.company_name = await (await tweets[2].getProperty('innerText')).jsonValue();
      datainfo.license_no = await (await tweets[3].getProperty('innerText')).jsonValue();

      datainfo.license_type = await (await tweets[4].getProperty('innerText')).jsonValue();
      datainfo.issuer_date = await (await tweets[5].getProperty('innerText')).jsonValue();
      datainfo.expired_date = await (await tweets[6].getProperty('innerText')).jsonValue();
      datainfo.detail = await (await tweets[7].getProperty('innerText')).jsonValue();

                         console.log(` ชื่อ-นามสกุล : ${datainfo.fl_name}`);
                         console.log(` ชื่อบริษัท : ${datainfo.company_name}  `);
                         console.log(` เลขที่ใบอนุญาต : ${datainfo.license_no}  `);
                         console.log(` ประเภทใบอนุญาต : ${datainfo.license_type}  `);
                         console.log(` วันออกใบอนุญาต : ${datainfo.issuer_date}  `);
                         console.log(` วันใบอนุญาตหมดอายุ : ${datainfo.expired_date}  `);
                         console.log(` สถานะใบอนุญาต/ต่ออายุครั้งถัดไป  : ${datainfo.detail}  `);


    console.log('--------------------');
    console.log('Json Format \n');
    console.log(JSON.stringify(datainfo, null, '\t'));

    /*
     *
     *
     */
    

    // for (let i = 0; i < tweets.length; i++) {
    //       const tweet = await (await tweets[i].getProperty('innerText')).jsonValue();
    //       console.log(tweet);
    // }


     //console.log(bodyHTML);
    //const result = await page.evaluate(() => {
    //      const rows = document.querySelectorAll('.td-table');
    //      return Array.from(rows, row => {
    //              const columns = row.querySelectorAll('td');
    //              return Array.from(columns, column => column.innerText);
    //            });
    //});
    //console.log(result);
   //console.log(bodyHTML[2]);
    
    await browser.close();
})();
