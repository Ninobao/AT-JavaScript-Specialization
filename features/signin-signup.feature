Feature: Sign up/Sign in

  Scenario: User creates an account
    Given the User is on the home page
    And the User navigates to the Registration page
    When the User fills all required fields with valid data
    And the User clicks the register button
    Then the User gets redirected to the login page

  Scenario: User writes an invalid Date of Birth when creatin an account
    Given the User is on the home page
    And the User navigates to the Registration page
    When the User fills the required fields with valid data
    But the Date of Birth is invalid
    And the User clicks the register button
    Then the message "Please enter a valid date in YYYY-MM-DD format." is displayed