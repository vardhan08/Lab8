# Name: Vardhan Agarwal
# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

(First option) Within a Github action that runs whenever code is pushed.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, I would not use unit testing as it involves multiple interactions, i.e., sending a message, and receiving a message. When these two components successfully happen, that is when we say a message was successfully sent. So, another interaction is required to successfully test this feature.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
Yes, this is an individual component that just requires the check of length of the message and does not have to do anything with any other component.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
It will run the tests. However, there are no browser UIs for proper interaction in our case.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
```
await page.click('img');
```
