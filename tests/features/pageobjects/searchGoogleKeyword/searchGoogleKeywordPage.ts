import { searchGoogleKeyword } from '../../locators';
import {BasePage} from '../base.page';

class SearchGoogleKeywordPage extends BasePage{


     searchForKeyword(keyword: string) {
         console.log('loc is :', searchGoogleKeyword.searchTextField);
         if (this.IsElementDisplayed("//div[text()='I agree']")){
             this.Click("//div[text()='I agree']");
         }
        this.SetValue(searchGoogleKeyword.searchTextField, keyword);
         browser.keys("\uE007");
         this.Click(searchGoogleKeyword.searchButton);
    }

}

export const searchKeyword = new SearchGoogleKeywordPage();
