@home
Feature: Home page

    Scenario: Showing products according to filters
        Given the User logs in
        And the User gets redirected to the account page
        And the User navigates to the Home page
        When the User adds only the Tool Belts filter
        Then only the Leather toolbelt product will be shown

    Scenario: Not showing products according to filters
        Given the User logs in
        And the User gets redirected to the account page
        And the User navigates to the Home page
        When the User adds only the Workbench filter
        Then the There are no products found. message is displayed