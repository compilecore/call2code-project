# call2code-project
A smart Travel Packing Assistant tool that creates personalized packing lists based on your destination,weather and planned activities using real-time APIs like Open Weather and Google Calendar.
Ideal for travelers who want to be efficient, prepared and stress-free.
![image](https://github.com/user-attachments/assets/731eef6d-9b89-46eb-b3b5-29bffc2fb06e)
![image](https://github.com/user-attachments/assets/deb9648d-f6b7-4473-b274-23c0c6b170e0)
![image](https://github.com/user-attachments/assets/18e9533c-940c-4b33-8f9b-f3769ec5a896)
![image](https://github.com/user-attachments/assets/0da5b13d-cb2f-4ab6-84d6-5879fdeb7c45)
![image](https://github.com/user-attachments/assets/f655ea5c-d6a3-4920-8071-1bcb7828e8d3)
![image](https://github.com/user-attachments/assets/59aac721-ed0a-4e10-acab-b5b288c0e1c9)
![image](https://github.com/user-attachments/assets/f5e15076-b3ef-4650-932b-c9e7c286bf6d)

 PackMate is a smart travel packing assistant designed to help users generate personalized packing lists based on their destination, weather conditions, trip type, activities, and accessibility preferences. With a clean, modern interface and intuitive navigation, the app improves the travel experience by making packing stress-free and efficient. PackMate is built using HTML, CSS, and JavaScript and works entirely on the client-side — no server or login required.

Features Implemented 

Dark Mode (Easy): A toggle that switches between light and dark themes and stores preference using localStorage.
![WhatsApp Image 2025-07-05 at 22 27 21_2ca63149](https://github.com/user-attachments/assets/97f485fa-2acb-4fe1-b6fe-4e2c774c9cab)

Custom 404 Page (Easy): A styled “Page Not Found” screen is shown when a non-existent screen is accessed
![WhatsApp Image 2025-07-05 at 23 00 13_37243c7c](https://github.com/user-attachments/assets/408d42fc-e680-43f4-a27b-30e9f588b370)

Multilingual Support (Medium): Language dropdown allows users to instantly translate UI into English, Hindi, Spanish, and French.
![WhatsApp Image 2025-07-05 at 22 29 40_0440274e](https://github.com/user-attachments/assets/35892f9f-da09-4ed5-890b-6c69014a6e05)

Activity-Based Packing (Medium): Packing items are tailored based on user-selected activities like beach, hiking, dining, or shopping.
![WhatsApp Image 2025-07-06 at 01 17 31_94ce05af](https://github.com/user-attachments/assets/2bed2d9e-5c01-42bb-b700-4eb7d6cf3c19)
![WhatsApp Image 2025-07-06 at 01 17 32_28a19a1a](https://github.com/user-attachments/assets/3aa0dc47-3486-4416-a9fb-1c8dd7515229)
![WhatsApp Image 2025-07-06 at 01 19 05_7598ba30](https://github.com/user-attachments/assets/872fcd29-23cb-4b9b-a7b6-dfd796aff9d0)
![WhatsApp Image 2025-07-06 at 01 19 05_1c6dd047](https://github.com/user-attachments/assets/f286d63d-8ebd-4c22-9c62-5ef0897aae06)


Text-to-Speech (Hard): The "Read Aloud" button uses the Web Speech API to speak out the content of the visible screen for accessibility.

![WhatsApp Image 2025-07-06 at 01 20 59_924b4698](https://github.com/user-attachments/assets/195d2851-230e-4c43-bc19-9870fc44bcec)


Dynamic Weather Forecast & UI (Hard): Simulated weather based on the city (sunny, rainy, cloudy) and changes background .
![WhatsApp Image 2025-07-06 at 01 22 41_8213bdf9](https://github.com/user-attachments/assets/273cfe45-5198-4691-9069-a4619920dedf)


Download + Email Packing List (Medium): Users can download their packing list as a .txt file or simulate email sending.
![WhatsApp Image 2025-07-06 at 01 24 02_24e6cdaf](https://github.com/user-attachments/assets/06fd58c4-a3a5-45b4-aacc-690c0d628221)


other screenshots:

![WhatsApp Image 2025-07-06 at 01 29 21_46720329](https://github.com/user-attachments/assets/671cc957-3ae9-4133-9cee-48bd937747db)
![WhatsApp Image 2025-07-06 at 01 27 12_0e23f5cb](https://github.com/user-attachments/assets/5159f79e-e86d-4667-85af-1f158a9a0646)
![WhatsApp Image 2025-07-06 at 01 27 12_0169fa91](https://github.com/user-attachments/assets/c5b0b0a3-e368-4d46-bae7-f5f62fc3ba09)
![WhatsApp Image 2025-07-06 at 01 27 13_dd5db2cc](https://github.com/user-attachments/assets/572006f8-a087-4afb-ade5-5ee8c6e6c521)

APIs & Technologies Used:
Web Speech API (Hard): Used for accessibility to read out screen text aloud.
Example: The function speakCurrentScreen() uses SpeechSynthesisUtterance to speak visible content.


Simulated Weather API (Medium):Randomly selects a weather condition (sunny/rainy/cloudy) to mimic live data.
Example: In showWeatherAndContinue(), a weather type is chosen and applied to the background and recommendations.


Manual Language Dictionary (Medium):Translations are stored in a JavaScript object and updated dynamically.
Example: translatePage(lang) updates all data-translate elements based on selected language.


LocalStorage (Easy):Saves the dark mode preference so it persists on reload.
Example: toggleDarkMode() checks and stores the user's theme choice.


Setup Instructions:
To run the PackMate application on your local machine:
1. Clone or download the project files.
2. Extract the ZIP folder if downloaded.
3. Open the index.html file in any modern web browser (Chrome, Edge, Firefox, etc.).
4. No server or installation is required — it’s a fully client-side web app.

Alternatively, via command line:
git clone https://github.com/compilecore/call2code-project.git


Testing Instructions:
Here’s how to test the key features of the app:
Start a new trip by entering a destination, selecting travel date, duration, and trip type.
Choose one or more activities (e.g., hiking, beach, shopping) and optionally add a custom activity.
On the next screen, observe the weather forecast (simulated) and the background theme that changes accordingly.
Generate a smart packing list tailored to your inputs and view items grouped by essentials, weather, activities, and trip type.
Try switching languages from the dropdown to see instant translation.
Toggle dark mode using the checkbox on the toolbar.
Click “Read Aloud” to activate text-to-speech and listen to screen content.
Download the packing list or click the Email button (simulated).

Manually trigger the 404 screen by going to a screen ID that doesn’t exist in the console (e.g., goToScreen(99)).


