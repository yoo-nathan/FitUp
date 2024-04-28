import schedule
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import mysql.connector

# Set up MySQL connection
db_config = {
    'host': '35.196.58.227',
    'user': 'dev',
    'password': '1q2w3e4r!Q@W#E$R!',
    'database': 'User'
}

# Function to save menu items to MySQL database
def save_to_mysql(menu_items):
    # Connect to the database
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    # SQL query to insert data
    insert_query = "INSERT INTO DCT (menu) VALUES (%s)"
    
    # Insert each menu item into the database
    for menu_name in menu_items:
        cursor.execute(insert_query, (menu_name,))

    # Commit changes and close the connection
    connection.commit()
    print(f"{cursor.rowcount} records inserted.")
    cursor.close()
    connection.close()

def job():
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
    menu_items_elements = soup.find_all('button', class_='h4 site-panel__daypart-item-title')

    # Extract the menu item names without the "menu item:" prefix
    menu_items = [item.text.strip() for item in menu_items_elements]

    # Close the browser
    driver.quit()

    # Save the menu items to the database
    save_to_mysql(menu_items)

# Schedule the job every day at 5 AM
schedule.every().day.at("05:00").do(job)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(60)