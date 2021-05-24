describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click("journal-entry");
    let url = await page.url();
    let path = url.split("/")[url.split("/").length - 1];
    expect(path).toBe("#entry1");
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let header = await page.$eval("h1", (title) => {
      return title.textContent;
    });
    expect(header).toBe("Entry 1");
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

    const givenEntry = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };

    let entryPage = await page.$("entry-page")
    let entry = await entryPage.getProperty("entry");
    let entryJson = await entry.jsonValue();
    expect(entryJson).toEqual(givenEntry);

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let bodyElement = await page.$("body");
    let className = await bodyElement.getProperty("className");
    let entry = await className.jsonValue();
    expect(entry).toEqual('single-entry');

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click("img");
    let url = await page.url();
    let path = url.split("/")[url.split("/").length - 1];
    expect(path).toBe("#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    
    let header = await page.$eval("h1", (title) => {
      return title.textContent;
    });
    expect(header).toBe("Settings");

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let bodyElement = await page.$("body");
    let className = await bodyElement.getProperty("className");
    let entry = await className.jsonValue();
    expect(entry).toEqual('settings');

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    let url = await page.url();
    let path = url.split("/")[url.split("/").length - 1];
    expect(path).toBe("#entry1");

  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should be 127.0.0.1:5500/', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    let url = await page.url();
    expect(url).toEqual('http://127.0.0.1:5500/');
  });


  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
  it('Test12: On home page - checking page header title', async () => {
    
    let header = await page.$eval("h1", (title) => {
      return title.textContent;
    });
    expect(header).toBe("Journal Entries");

  });



  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On Home page - checking <body> element\'s class attributes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let bodyElement = await page.$("body");
    let className = await bodyElement.getProperty("className");
    let entry = await className.jsonValue();
    expect(entry).toEqual('');
  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking the second entry , new URL should be /#entry2', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.click("journal-entry:nth-child(2)");
    let url = await page.url();
    let path = url.split("/")[url.split("/").length - 1];
    expect(path).toBe("#entry2");

  });


  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15:  Clicking the second entry - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let header = await page.$eval("h1", (title) => {
      return title.textContent;
    });
    expect(header).toBe("Entry 2");
  });



  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {

    let givenEntry = { 
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    };

    let entryPage = await page.$("entry-page")
    let entry = await entryPage.getProperty("entry");
    let entryJson = await entry.jsonValue();
    expect(entryJson).toEqual(givenEntry);

  }, 10000);


  // create your own test 17
  it('Test17: Clicking the back button should take you to homepage', async() => {
    await page.goBack();
    let url = await page.url();
    expect(url).toEqual('http://127.0.0.1:5500/');
  });

  // create your own test 18
  it('Test18: Clicking the tenth entry , new URL should be /#entry10', async() => {
    // implement test18: Clicking on the back button should update the URL to contain ‘/#entry10’
    await page.click("journal-entry:nth-child(10)");
    let url = await page.url();
    let path = url.split("/")[url.split("/").length - 1];
    expect(path).toBe("#entry10");

  });


  // create your own test 19
  it('Test19: Going back and forward, you should land on the same page', async() => {
    
    await page.goBack();
    await page.goForward();
    let url = await page.url();
    let path = url.split("/")[url.split("/").length - 1];
    expect(path).toBe("#entry10");
  });

  // create your own test 20
  it('Test20: Going forward 5 times, you should still be on the same page', async() => {
    
    await page.goForward();
    await page.goForward();
    await page.goForward();
    await page.goForward();
    await page.goForward();
    let url = await page.url();
    let path = url.split("/")[url.split("/").length - 1];
    expect(path).toBe("#entry10");
  });
});
