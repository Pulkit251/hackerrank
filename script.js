
const pup = require('puppeteer');

let browserPromise = pup.launch({
    headless: false,
    defaultViewport: false
})

let id = "mofiy91694@0pppp.com";
let pass = "hackerrank@com";
let tab;

browserPromise.then(function(browser){
    let pagesPromise = browser.pages();
    return pagesPromise;
}).then(function(pages){
    tab = pages[0];
    let openPage = tab.goto("https://www.hackerrank.com/auth/login");
    return openPage;
}).then(function(){
    let idPromise = tab.type("#input-1",id);
    return idPromise;
}).then(function(){
    let passPromise = tab.type("#input-2",pass);
    return passPromise;
}).then(function(){
    let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
}).then(function(){
    let waitPromise = tab.waitForSelector("#base-card-1", {visible: true});
    return waitPromise;
}).then(function(){
    let ipkOpenPromise = tab.click("#base-card-1-link");
    return ipkOpenPromise;
}).then(function(){
    let WarmWaitPromise = tab.waitForSelector("a[data-attr1='warmup']", {visible: true});
    return WarmWaitPromise;
}).then(function(){
    let warmPromise = tab.click("a[data-attr1='warmup']");
    return warmPromise;
}).then(function(){
    let challengeWaitPromise = tab.waitForSelector(".js-track-click.challenge-list-item", {visible: true});
    return challengeWaitPromise;
}).then(function(){
    let allUrls = tab.$$(".js-track-click.challenge-list-item");
    return allUrls;
}).then(function(data){
    let challengePromises = [];
    for(let i of data){
        let challengePromise = tab.evaluate(function(ele){
            return ele.getAttribute("href");
        },i);
        challengePromises.push(challengePromise);
    }    
    return Promise.all(challengePromises);
}).then(function(data){
    let QuestionPromise = solveQuestion("https://www.hackerrank.com" + data[0]);
    for(let i = 1;i < data.length;i++){
        QuestionPromise = QuestionPromise.then(function(){
            return solveQuestion("https://www.hackerrank.com" + data[i]);
        });        
    }
}).catch(function(err){
    console.log("error occured");
})

function solveQuestion(url){
    let challengeUrl = url;
    let editorialUrl = url.replace('?','/editorial?');
    return new Promise(function(resolve,reject){
        tab.goto(editorialUrl).then(function(){
            let langPromise = tab.$$(".hackdown-content h3");
            return langPromise;
        }).then(function(data){
            let languagePromises = [];
            for(let i of data){
                let languagePromise = tab.evaluate(function(ele){
                    return ele.textContent;
                },i);
                languagePromises.push(languagePromise);
            }
            return Promise.all(languagePromises);
        }).then(function(data){
            for(let i in data){
                if(data[i] == "C++"){
                    let finalAnswerPromise = tab.$$(".highlight").then(function(answers){
                        let answerPromise = tab.evaluate(function(ele){
                            return ele.textContent;
                        },answers[i]);
                        return answerPromise;
                    });
                    return finalAnswerPromise;
                }
            }
        }).then(function(data){
             return tab.goto(challengeUrl).then(function(){
                let checkBoxPromise = tab.waitForSelector(".custom-input-checkbox", {visible: true});
                return checkBoxPromise;
            }).then(function(){
                let checKBoxCLick = tab.click(".custom-input-checkbox");
                return checKBoxCLick;
            }).then(function(){
                let answerTypePromise = tab.type(".custominput",data);
                return answerTypePromise;
            }).then(function(){
                let controldownPromise = tab.keyboard.down("Control");
                return controldownPromise;
            }).then(function(){
                let APressPromise = tab.keyboard.press("A");
                return APressPromise;
            }).then(function(){
                let XpressPromise = tab.keyboard.press("X");
                return XpressPromise;
            }).then(function(){
                let editorClickPromise = tab.click(".monaco-scrollable-element.editor-scrollable.vs");
                return editorClickPromise;
            }).then(function(){
                let APressPromise = tab.keyboard.press("A");
                return APressPromise;
            }).then(function(){
                let VpressPromise = tab.keyboard.press("V");
                return VpressPromise;
            }).then(function(){
                let controlUpPromise = tab.keyboard.up("Control");
                return controlUpPromise;
            }).then(function(){
                return tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            }).then(function(){
                let congratsPromise = tab.waitForSelector(".congrats-cards-wrapper", {visible: true});
                return congratsPromise;
            })
        }).then(function(){
            resolve();
        })       
        
    })   

}

