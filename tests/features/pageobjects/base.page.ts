const WAITFOR_TIMEOUT = 10000;
export class BasePage {


  OpenURL (url: string) : void{
    if (url === undefined) {
      throw new Error('url must be defined')
    }
    try {
      browser.url(url);
    } catch (err) {
      throw new Error(err)
    }
  }

  open (path: string){
      return browser.url(`/${path}`)
  }

  Click (locator: string){
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    try {
      browser.$(locator).waitForEnabled();
      browser.$(locator).waitForClickable({timeout: WAITFOR_TIMEOUT})
      browser.$(locator).click()
    } catch (err) {
      throw new Error(err)
    }
  }

  FirstInstanceOf (possibleArray: string[]){
    if (Array.isArray(possibleArray)) {
      return possibleArray[0]
    }
    return possibleArray
  }

  GetAttribute (locator: string, attr: string) {
    if (locator === undefined || attr === undefined) {
      throw new Error('locator/attribute must be defined')
    }

    try {
      browser.$(locator).waitForDisplayed()
      browser.$(locator).getAttribute(attr)
    } catch (err) {
      throw new Error(err)
    }
  }

  GenericSendKeys (locator: string, text: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }

    try {
      browser.$(locator).click()
      browser.keys(text)
    } catch (err) {
      throw new Error(err)
    }
  }

  SetValue (locator: string, value: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }

    try {
      $(locator).waitForDisplayed()
      $(locator).setValue(value)
    } catch (err) {
      throw new Error(err)
    }
  }

  AddValue (locator: string, value: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }

    try {
      browser.$(locator).waitForDisplayed()
      browser.$(locator).addValue(value)
    } catch (err) {
      throw new Error(err)
    }
  }

  CloseBrowser () {
    browser.closeWindow()
  }


  SelectCheckBox (locator: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }

    try {
      browser.$(locator).waitForDisplayed()
      if (!browser.$(locator).isSelected()) {
        browser.$(locator).click()
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  MouseHover (locator: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }

    try {
      browser.$(locator).waitForDisplayed()
      browser.$(locator).moveTo()
      browser.pause(2000)
    } catch (err) {
      throw new Error(err)
    }
  }

  // Example to below such method
  // | textToEnter         | locator   |
  // |  CTA label          | CTA label field |
  // |  /content           | CTA URL field |
  EnterValueInMultipleTextFields (fields: { hashes: () => any; }) {
    try {
      const fieldsTemp = fields.hashes()
      fieldsTemp.array.forEach((element: any) => {
        this.SetValue(element.textToEnter, element.locator)
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  CloseLastOpenWindow () {
    try {
      const whandler = browser.getWindowHandles()
      const lastWindowHandle = whandler.slice(-1)
      browser.switchToWindow(lastWindowHandle[0])
      browser.closeWindow()
    } catch (err) {
      throw new Error(err)
    }
  }

  IsElementDisplayed (locator: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    return browser.$(locator).isDisplayed()
  }

  IsElementVisible (locator: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    return browser.$(locator).isDisplayed();
  }

  SelectByValueDropdown (locator: string, value: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    browser.$(locator).selectByAttribute('value', value)
  }


  SelectByVisibleText (locator: string, visibleText: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    browser.$(locator).selectByVisibleText(visibleText)
  }

  AddTimeStamp () {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const timeStamp = `${year}${month}${day}${hour}${minutes}${seconds}`
    return timeStamp
  }

  GetText (locator: string) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    return browser.$(locator).getText()
  }

  WaitForElementToBeEnabled (locator: string, timeToWait: number = WAITFOR_TIMEOUT) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    return browser.$(locator).waitForEnabled({timeout:WAITFOR_TIMEOUT})
  }

  WaitForElementToBeDisplayed (locator: string, timeToWait: number = WAITFOR_TIMEOUT) {
    if (locator === undefined) {
      throw new Error('locator must be defined')
    }
    return browser.$(locator).waitForDisplayed({timeout:WAITFOR_TIMEOUT})
  }

  WAIT_FOR_PAGE_LOAD(){
    return browser.waitUntil( () => {
      const state = browser.execute( ()=> {
        return document.readyState;
      });
      //console.log("state:" + state)
      return state === 'complete';
    },
      {
        timeout: WAITFOR_TIMEOUT*2, //60secs
        timeoutMsg: 'Oops! time out !!'
      });
  }
}
