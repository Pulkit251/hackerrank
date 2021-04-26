const pup = require('puppeteer');
let id = "mofiy91694@0pppp.com";
let pass = "hackerrank@com";
let Challenges = require("./pepchallenge");
let tab;
async function main(){
    let browser = await pup.launch({
        headless: false,
        defaultViewport: false
        // args: ["--start-maximized"]
    });

    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");    
    await tab.type("#input-1",id);
    await tab.type("#input-2",pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".dropdown-handle.nav_link.toggle-wrap");
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible: true});
    let linklists = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await linklists[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createchallengeurl =   await tab.evaluate(function(ele){
       return ele.getAttribute("href");
    },createChallengeButton);
    for(let i = 0;i < 3;i++){
        await createChallenge("https://www.hackerrank.com" + createchallengeurl,Challenges[i]);
    }  
}

async function createChallenge(url,challenge){
    tab.goto(url);
    await tab.waitForSelector("#name", {visible: true});
    await tab.type("#name",challenge["Challenge Name"]);
    await tab.type("#preview",challenge["Description"]);
    await tab.waitForSelector("#problem_statement-container .CodeMirror textarea", {visible: true});
    await tab.type("#problem_statement-container .CodeMirror textarea",challenge["Problem Statement"]);
    await tab.type("#input_format-container .CodeMirror textarea",challenge["Input Format"]);
    await tab.type("#constraints-container .CodeMirror textarea",challenge["Constraints"]);
    await tab.type("#output_format-container .CodeMirror textarea",challenge["Output Format"]);
    await tab.type("#tags_tag",challenge["Tags"]);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");
}

main();






















