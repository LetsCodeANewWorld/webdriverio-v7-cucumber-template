@FeatureTag
Feature:To test the application and to make sure it works fine end to end to buy a motor policy
              As a user
              I want to search for a keyword on google

        @ScenarioTag
        Scenario: Search keyword on google

            Given that user start a new google search journey
             When he search for a keyword webdriverio on google
