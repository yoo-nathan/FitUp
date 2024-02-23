from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Create a new instance of the Chrome driver in headless mode
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')  # Run Chrome in headless mode
driver = webdriver.Chrome(options=chrome_options)

# Access the dining hall menu page
driver.get("https://emoryatlanta.cafebonappetit.com/cafe/dobbs-common-table/")

# Find and click the button to collapse the menu
collapse_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//button[@class='site-panel__daypart-accordion-btn' and contains(@data-hide-text, 'Collapse')]")))
collapse_button.click()

# Get the updated page source after collapsing the menu
page_source = driver.page_source

# Parse the HTML content
soup = BeautifulSoup(page_source, 'html.parser')

# Find all menu items under the specified button class within the brunch section
menu_items = soup.find_all('button', class_='h4 site-panel__daypart-item-title')

# Extract and print the menu item names without the "menu item:" prefix
for item in menu_items:
    menu_name = item.text.strip()
    print(menu_name)

# Close the browser
driver.quit()
