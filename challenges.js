const pup = require("puppeteer");
let id = "2r7l29x35d@just4fun.me";
let pass = "chaynikaa"; 
let challenges = require("./pepchallange");
let tab;
async function main(){
    let browser = await pup.launch({
        headless : false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });

    let pages = await browser.pages();
     tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type ("#input-1",id);
    await tab.type ("#input-2",pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".username.text-ellipsis");
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible : true});
    let linkLists = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await linkLists[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible : true});
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    },createChallengeButton);
  for(let i=0;i<challenges.length;i++){
     createChallenge("https:/www.hackerrank.com" + createChallengeUrl,challenges[i], await browser.newPage());
  }
}
 async function createChallenge(url,challenge,tab){
 await tab.goto(url);
 await tab.waitForSelector("#name", {visible: true});
 await tab.type("#name", challenge["Challenge Name"]);

 await tab.waitForSelector("#preview", {visible: true});
await tab.type("#preview", challenge["Description"]);

 await tab.waitForSelector("#problem_statement-container .CodeMirror textarea", {visible: true});
await tab.type("#problem_statement-container .CodeMirror textarea", challenge["Problem Statement"]);
 
//await tab.waitForSelector("#input_format-container .CodeMirror textarea", {visible: true});
await tab.type("#input_format-container .CodeMirror textarea", challenge["Input Format"]);
 
//await tab.waitForSelector("#constraints-container .CodeMirror textarea", {visible: true});
await tab.type("#constraints-container .CodeMirror textarea", challenge["Constraints"]);
 
//await tab.waitForSelector("#output_format-container .CodeMirror textarea", {visible: true});
await tab.type("#output_format-container .CodeMirror textarea", challenge["Output Format"]);
 
await tab.waitForSelector("#tags_tag", {visible: true});
await tab.type("#tags_tag", challenge["Tags"]);
await tab.keyboard.press("Enter");

await tab.click(".save-challenge.btn.btn-green");
await tab.waitForSelector(".preview-challenge.btn.msR",{visible:true});
 }
main();