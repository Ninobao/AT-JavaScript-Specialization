@product-details
Feature: Product details page

    Scenario: User adds a product to Favorites
        Given the User logs in
        And the User gets redirected to the account page
        And the User navigates to the favorites page
        And the Combination Pliers product is not already in Favorites
        And the User navigates to the home page
        And the User clicks on Combination Pliers
        When the User adds the Combination Pliers to Favorites
        Then the message Product added to your favorites list. is displayed
        And the Combination Pliers are shown in the Favorites page


    Scenario: Trying to add an out-of-stock product to the cart
        Given the User logs in
        And the User gets redirected to the account page
        And the User navigates to the home page
        And the User clicks on Long Nose Pliers
        When the Long Nose Pliers page has the Out of stock message
        Then the Quantity selector and the Add to cart button are disabled