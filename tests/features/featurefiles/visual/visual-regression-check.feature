@FeatureTag
Feature:To test the application and to make sure it works fine end to end to buy a motor policy
              As a user
              I want to search for a keyword on google

        @ScenarioTag
        Scenario: Search keyword visual test for google

            Given User is on the Google home page
             When Screen resolution is set to width 984 and height 788
             Then google search home page should match the baseline image