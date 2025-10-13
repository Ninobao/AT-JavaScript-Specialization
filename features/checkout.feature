@checkout
Feature: Checkout page

    Scenario: Checkout calculates total price of the cart correctly
        Given the User logs in
        And the User gets redirected to the account page
        And the User navigates to the Home page
        And the User adds one Combination Pliers to the cart
        And the User navigates to the Home page
        And the User adds two Bolt Cutters to the cart
        When the User goes to the Checkout page
        And the sub-total price of the Combination Pliers is $14.15
        And the sub-total price of the Bolt Cutters is $96.82
        Then the total price of the cart is $110.97