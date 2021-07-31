class searchGoogleKeywordLocators  {
    public searchTextField: string = '//input[@name="q" and @title="Search"]';
    public searchButton: string = '//div[@class="FPdoLc lJ9FBc"]//input[@value="Google Search"]';    
}

export const searchGoogleKeyword = new searchGoogleKeywordLocators();
