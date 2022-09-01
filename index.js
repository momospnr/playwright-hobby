const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(""); // URLを渡す
  const title = await page.title();
  await page.waitForLoadState();
  await page.click("#onetrust-reject-all-handler");
  await page.addStyleTag({
    path: "pdf.css"
  });
  // 1ページ目
  await page.pdf({
    path: `dist/【1ページ目】${title}.pdf`,
    printBackground: true,
    pageRanges: "1-1"
  });
  // 2ページ目以降
  await page.pdf({
    path: `dist/【2ページ目以降】${title}.pdf`,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
    <style>
    html {
      -webkit-print-color-adjust: exact;
    }
    </style>
    <div style="width: 100%; background-color: #ffffff; margin-top: -20px; height: 170px;">
      <p style="width: 100%; background-color: #666666; height: 81px;"></p>
    </div>
   `,
    margin: {
      top: 170
    },
    pageRanges: "2-"
  });
  await browser.close();
})();
