@user-profile
Feature: User profile

    Scenario: User updates the profile
        Given the User logs in
        And the User gets redirected to the account page
        And the User navigates to the Profile page
        When the User updates Street and Postal code fields with valid data
        And the User clicks the Update profile button
        Then the message Your profile is successfully updated! is displayed