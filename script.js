// Store selected activities and trip details
let selectedActivities = new Set();
let tripDetails = {};

// Initialize app
function initApp() {
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('travelDate').min = today;
  
  // Initialize dark mode preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    document.querySelector('.toolbar input[type="checkbox"]').checked = true;
  }
  
  // Initialize translations
  translatePage('en');
  
  // Show home screen
  goToScreen(1);
}

// Navigation between screens
function goToScreen(n) {
  document.querySelectorAll('.screen').forEach(div => div.classList.add('hidden'));
  const screen = document.getElementById('screen' + n);
  
  if (screen) {
    screen.classList.remove('hidden');
    
    // Update trip summary on packing list screen
    if (n === 5) {
      document.getElementById('tripSummary').textContent = 
        `${tripDetails.destination || 'Your destination'}, ${tripDetails.days || '?'} days`;
    }
  } else {
    document.getElementById('screen404').classList.remove('hidden');
  }

  // Reset weather backgrounds on home screen
  if (n === 1) {
    document.body.classList.remove("sunny", "rainy", "cloudy");
  }
  
  // Scroll to top for better mobile experience
  window.scrollTo(0, 0);
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// Activity selection
function toggleActivity(element, activity) {
  element.classList.toggle('selected');
  
  if (selectedActivities.has(activity)) {
    selectedActivities.delete(activity);
  } else {
    selectedActivities.add(activity);
  }
}

// Weather forecast simulation
function showWeatherAndContinue() {
  goToScreen(4);
  const city = document.getElementById("destination").value;
  const days = document.getElementById("travelDays").value;
  
  // Store trip details
  tripDetails = {
    destination: city,
    date: document.getElementById("travelDate").value,
    type: document.getElementById("tripType").value,
    days: days,
    activities: Array.from(selectedActivities)
  };
  
  const customActivity = document.getElementById("customActivity").value.trim();
  if (customActivity) {
    tripDetails.activities.push(customActivity);
  }

  // Show loading state
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherInfo = document.getElementById("weatherInfo");
  weatherIcon.innerHTML = '<div class="loading"></div>';
  weatherInfo.textContent = "Fetching weather data...";
  
  // Simulate API call
  setTimeout(() => {
    const weatherTypes = ['sunny', 'rainy', 'cloudy'];
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    const weatherData = {
      sunny: {min: 25, max: 35, icon: '☀', desc: 'Sunny and warm'},
      rainy: {min: 10, max: 20, icon: '🌧', desc: 'Rainy and cool'},
      cloudy: {min: 15, max: 25, icon: '☁', desc: 'Cloudy and mild'}
    };
    
    const {min, max, icon, desc} = weatherData[randomWeather];
    
    weatherIcon.innerHTML = icon;
    weatherInfo.innerHTML = `
      <strong>${city} Weather Forecast</strong><br>
      ${desc}<br>
      Temperature: ${min}°C to ${max}°C
    `;
    
    // Apply weather-based background
    document.body.classList.remove("sunny", "rainy", "cloudy");
    document.body.classList.add(randomWeather);
  }, 1500);
}

// Generate packing list
function generatePackingList() {
  const list = document.getElementById("packingList");
  list.innerHTML = "";
  
  // Always include essentials
  const essentials = [
    "🧴 Toiletries (toothbrush, toothpaste, shampoo)",
    "🔌 Charger and power bank",
    "🧦 Socks (1 pair per day + extras)",
    "👕 T-Shirts (1 per day)",
    "📄 Passport/ID and travel documents",
    "💊 Medications and first-aid kit",
    "💳 Credit cards and local currency"
  ];
  
  // Add essentials to list
  essentials.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  
  // Weather-specific items
  if (document.body.classList.contains("sunny")) {
    addPackingItem("🧴 High SPF sunscreen");
    addPackingItem("😎 Sunglasses and hat");
    addPackingItem("💧 Reusable water bottle");
  }
  
  if (document.body.classList.contains("rainy")) {
    addPackingItem("☔ Compact umbrella");
    addPackingItem("🧥 Waterproof jacket");
    addPackingItem("👢 Waterproof shoes");
  }
  
  if (document.body.classList.contains("cloudy")) {
    addPackingItem("🧥 Light jacket or sweater");
    addPackingItem("🧣 Scarf for layering");
  }
  
  // Activity-specific items
  if (tripDetails.activities.includes("beach")) {
    addPackingItem("🩱 Swimsuit and beach towel");
    addPackingItem("🩴 Flip flops or sandals");
    addPackingItem("📱 Waterproof phone case");
  }
  
  if (tripDetails.activities.includes("hiking")) {
    addPackingItem("🥾 Hiking boots");
    addPackingItem("🎒 Backpack for hiking");
    addPackingItem("🧭 Compass or GPS device");
  }
  
  if (tripDetails.activities.includes("dining")) {
    addPackingItem("👞 Formal shoes");
    addPackingItem("👔 Dress shirt or blouse");
    addPackingItem("👗 Dress or suit");
  }
  
  if (tripDetails.activities.includes("fitness")) {
    addPackingItem("👟 Gym clothes and shoes");
    addPackingItem("🎧 Headphones for workouts");
    addPackingItem("💦 Sports water bottle");
  }
  
  // Trip type specific items
  if (tripDetails.type === "Business") {
    addPackingItem("💼 Laptop and accessories");
    addPackingItem("📁 Business cards");
    addPackingItem("👔 Extra formal attire");
  }
  
  if (tripDetails.type === "Adventure") {
    addPackingItem("🔦 Headlamp or flashlight");
    addPackingItem("🔪 Multi-tool or pocket knife");
    addPackingItem("🧤 Gloves for outdoor activities");
  }
  
  // Custom activities
  tripDetails.activities.forEach(activity => {
    if (!["beach", "hiking", "dining", "fitness"].includes(activity)) {
      addPackingItem(`🧭 Gear for ${activity}`);
    }
  });
  
  goToScreen(5);
}

// Helper function to add packing list items
function addPackingItem(item) {
  const list = document.getElementById("packingList");
  const li = document.createElement("li");
  li.textContent = item;
  list.appendChild(li);
}

// Download packing list
function downloadList() {
  const items = Array.from(document.querySelectorAll('#packingList li')).map(li => li.textContent).join("\n");
  const blob = new Blob([`PackMate Packing List\n\nDestination: ${tripDetails.destination}\nDuration: ${tripDetails.days} days\n\n${items}`], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `packing-list-${tripDetails.destination}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

// Email list (simulated)
function emailList() {
  alert("In a real application, this would send the packing list to your email. For now, use the download option.");
}

// Translation functionality
function translatePage(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  const translations = {
    en: {
      "Contact Us: 123-456-7890": "Contact Us: 123-456-7890",
      "About Us": "About Us",
      "Home": "Home",
      "🧳 PackMate": "🧳 PackMate",
      "Your smart travel packing assistant": "Your smart travel packing assistant",
      "Start a New Trip": "Start a New Trip",
      "📍 Trip Setup": "📍 Trip Setup",
      "Destination:": "Destination:",
      "Travel Date:": "Travel Date:",
      "Trip Type:": "Trip Type:",
      "Leisure": "Leisure",
      "Business": "Business",
      "Adventure": "Adventure",
      "Family": "Family",
      "Romantic": "Romantic",
      "Other": "Other",
      "Next: Add Activities": "Next: Add Activities",
      "🏕 Select Activities": "🏕 Select Activities",
      "Beach": "Beach",
      "Hiking": "Hiking",
      "Fine Dining": "Fine Dining",
      "Sightseeing": "Sightseeing",
      "Fitness": "Fitness",
      "Shopping": "Shopping",
      "Custom activity:": "Custom activity:",
      "Travel Duration:": "Travel Duration:",
      "Back": "Back",
      "🌦 Weather Forecast": "🌦 Weather Forecast",
      "Loading forecast...": "Loading forecast...",
      "Continue to Packing List": "Continue to Packing List",
      "✅ Your Smart Packing List": "✅ Your Smart Packing List",
      "Here's your personalized packing list for your trip:": "Here's your personalized packing list for your trip:",
      "Download List": "Download List",
      "Email List": "Email List",
      "Start Over": "Start Over",
      "🚫 404 - Page Not Found": "🚫 404 - Page Not Found",
      "This screen doesn't exist. Please go back home.": "This screen doesn't exist. Please go back home.",
      "Return Home": "Return Home",
      "Dark Mode": "Dark Mode",
      "Read Aloud": "Read Aloud",
      "Smart Weather Integration": "Smart Weather Integration",
      "Get packing recommendations based on destination weather forecast": "Get packing recommendations based on destination weather forecast",
      "Multi-language Support": "Multi-language Support",
      "Use PackMate in your preferred language for a personalized experience": "Use PackMate in your preferred language for a personalized experience",
      "Activity-Based Packing": "Activity-Based Packing",
      "Customize your list based on planned activities and special events": "Customize your list based on planned activities and special events",
      "© 2025 PackMate Travel Assistant. All rights reserved.": "© 2025 PackMate Travel Assistant. All rights reserved.",
      "Made with ❤ for travelers around the world": "Made with ❤ for travelers around the world"
    },
    hi: {
      "Contact Us: 123-456-7890": "संपर्क करें: 123-456-7890",
      "About Us": "हमारे बारे में",
      "Home": "होम",
      "🧳 PackMate": "🧳 पैकमेट",
      "Your smart travel packing assistant": "आपका स्मार्ट यात्रा पैकिंग सहायक",
      "Start a New Trip": "नई यात्रा शुरू करें",
      "📍 Trip Setup": "📍 यात्रा सेटअप",
      "Destination:": "गंतव्य:",
      "Travel Date:": "यात्रा की तारीख:",
      "Trip Type:": "यात्रा का प्रकार:",
      "Leisure": "अवकाश",
      "Business": "व्यवसाय",
      "Adventure": "साहसिक",
      "Family": "परिवार",
      "Romantic": "रोमांटिक",
      "Other": "अन्य",
      "Next: Add Activities": "अगला: गतिविधियाँ जोड़ें",
      "🏕 Select Activities": "🏕 गतिविधियाँ चुनें",
      "Beach": "समुद्र तट",
      "Hiking": "ट्रेकिंग",
      "Fine Dining": "फाइन डाइनिंग",
      "Sightseeing": "दर्शनीय स्थल",
      "Fitness": "फिटनेस",
      "Shopping": "खरीदारी",
      "Custom activity:": "कस्टम गतिविधि:",
      "Travel Duration:": "यात्रा अवधि:",
      "Back": "पीछे",
      "🌦 Weather Forecast": "🌦 मौसम पूर्वानुमान",
      "Loading forecast...": "पूर्वानुमान लोड हो रहा है...",
      "Continue to Packing List": "पैकिंग सूची पर जारी रखें",
      "✅ Your Smart Packing List": "✅ आपकी स्मार्ट पैकिंग सूची",
      "Here's your personalized packing list for your trip:": "आपकी यात्रा के लिए आपकी व्यक्तिगत पैकिंग सूची यहां दी गई है:",
      "Download List": "सूची डाउनलोड करें",
      "Email List": "ईमेल सूची",
      "Start Over": "फिर से शुरू करें",
      "🚫 404 - Page Not Found": "🚫 404 - पृष्ठ नहीं मिला",
      "This screen doesn't exist. Please go back home.": "यह स्क्रीन मौजूद नहीं है। कृपया होम पर वापस जाएं।",
      "Return Home": "होम पर वापस जाएं",
      "Dark Mode": "डार्क मोड",
      "Read Aloud": "जोर से पढ़ें",
      "Smart Weather Integration": "स्मार्ट मौसम एकीकरण",
      "Get packing recommendations based on destination weather forecast": "गंतव्य के मौसम पूर्वानुमान के आधार पर पैकिंग सिफारिशें प्राप्त करें",
      "Multi-language Support": "बहु-भाषा समर्थन",
      "Use PackMate in your preferred language for a personalized experience": "व्यक्तिगत अनुभव के लिए अपनी पसंदीदा भाषा में पैकमेट का उपयोग करें",
      "Activity-Based Packing": "गतिविधि-आधारित पैकिंग",
      "Customize your list based on planned activities and special events": "नियोजित गतिविधियों और विशेष आयोजनों के आधार पर अपनी सूची को अनुकूलित करें",
      "© 2025 PackMate Travel Assistant. All rights reserved.": "© 2025 पैकमेट ट्रैवल असिस्टेंट। सर्वाधिकार सुरक्षित।",
      "Made with ❤ for travelers around the world": "दुनिया भर के यात्रियों के लिए ❤ के साथ बनाया गया"
    },
    es: {
      "Contact Us: 123-456-7890": "Contáctenos: 123-456-7890",
      "About Us": "Sobre Nosotros",
      "Home": "Inicio",
      "🧳 PackMate": "🧳 PackMate",
      "Your smart travel packing assistant": "Tu asistente inteligente para empacar",
      "Start a New Trip": "Comenzar un Nuevo Viaje",
      "📍 Trip Setup": "📍 Configuración del Viaje",
      "Destination:": "Destino:",
      "Travel Date:": "Fecha de Viaje:",
      "Trip Type:": "Tipo de Viaje:",
      "Leisure": "Ocio",
      "Business": "Negocios",
      "Adventure": "Aventura",
      "Family": "Familiar",
      "Romantic": "Romántico",
      "Other": "Otro",
      "Next: Add Activities": "Siguiente: Agregar Actividades",
      "🏕 Select Activities": "🏕 Seleccionar Actividades",
      "Beach": "Playa",
      "Hiking": "Senderismo",
      "Fine Dining": "Cena Fina",
      "Sightseeing": "Turismo",
      "Fitness": "Fitness",
      "Shopping": "Compras",
      "Custom activity:": "Actividad personalizada:",
      "Travel Duration:": "Duración del Viaje:",
      "Back": "Atrás",
      "🌦 Weather Forecast": "🌦 Pronóstico del Tiempo",
      "Loading forecast...": "Cargando pronóstico...",
      "Continue to Packing List": "Continuar a la Lista de Empaque",
      "✅ Your Smart Packing List": "✅ Tu Lista de Empaque Inteligente",
      "Here's your personalized packing list for your trip:": "Aquí está tu lista de empaque personalizada para tu viaje:",
      "Download List": "Descargar Lista",
      "Email List": "Enviar por Correo",
      "Start Over": "Comenzar de Nuevo",
      "🚫 404 - Page Not Found": "🚫 404 - Página No Encontrada",
      "This screen doesn't exist. Please go back home.": "Esta pantalla no existe. Por favor, regresa a la página de inicio.",
      "Return Home": "Regresar al Inicio",
      "Dark Mode": "Modo Oscuro",
      "Read Aloud": "Leer en Voz Alta",
      "Smart Weather Integration": "Integración Meteorológica Inteligente",
      "Get packing recommendations based on destination weather forecast": "Obtén recomendaciones de empaque basadas en el pronóstico del tiempo de tu destino",
      "Multi-language Support": "Soporte Multilingüe",
      "Use PackMate in your preferred language for a personalized experience": "Usa PackMate en tu idioma preferido para una experiencia personalizada",
      "Activity-Based Packing": "Empaque Basado en Actividades",
      "Customize your list based on planned activities and special events": "Personaliza tu lista según las actividades planificadas y eventos especiales",
      "© 2025 PackMate Travel Assistant. All rights reserved.": "© 2025 PackMate Travel Assistant. Todos los derechos reservados.",
      "Made with ❤ for travelers around the world": "Hecho con ❤ para viajeros de todo el mundo"
    },
    fr: {
      "Contact Us: 123-456-7890": "Contactez-nous: 123-456-7890",
      "About Us": "À propos de nous",
      "Home": "Accueil",
      "🧳 PackMate": "🧳 PackMate",
      "Your smart travel packing assistant": "Votre assistant intelligent pour préparer vos bagages",
      "Start a New Trip": "Commencer un nouveau voyage",
      "📍 Trip Setup": "📍 Configuration du voyage",
      "Destination:": "Destination:",
      "Travel Date:": "Date de voyage:",
      "Trip Type:": "Type de voyage:",
      "Leisure": "Loisir",
      "Business": "Affaires",
      "Adventure": "Aventure",
      "Family": "Famille",
      "Romantic": "Romantique",
      "Other": "Autre",
      "Next: Add Activities": "Suivant: Ajouter des activités",
      "🏕 Select Activities": "🏕 Sélectionner des activités",
      "Beach": "Plage",
      "Hiking": "Randonnée",
      "Fine Dining": "Gastronomie",
      "Sightseeing": "Tourisme",
      "Fitness": "Fitness",
      "Shopping": "Shopping",
      "Custom activity:": "Activité personnalisée:",
      "Travel Duration:": "Durée du voyage:",
      "Back": "Retour",
      "🌦 Weather Forecast": "🌦 Prévisions météo",
      "Loading forecast...": "Chargement des prévisions...",
      "Continue to Packing List": "Continuer vers la liste de bagages",
      "✅ Your Smart Packing List": "✅ Votre liste de bagages intelligente",
      "Here's your personalized packing list for your trip:": "Voici votre liste de bagages personnalisée pour votre voyage:",
      "Download List": "Télécharger la liste",
      "Email List": "Envoyer par email",
      "Start Over": "Recommencer",
      "🚫 404 - Page Not Found": "🚫 404 - Page non trouvée",
      "This screen doesn't exist. Please go back home.": "Cet écran n'existe pas. Veuillez retourner à l'accueil.",
      "Return Home": "Retour à l'accueil",
      "Dark Mode": "Mode Sombre",
      "Read Aloud": "Lire à haute voix",
      "Smart Weather Integration": "Intégration météo intelligente",
      "Get packing recommendations based on destination weather forecast": "Obtenez des recommandations de bagages basées sur les prévisions météo de votre destination",
      "Multi-language Support": "Prise en charge multilingue",
      "Use PackMate in your preferred language for a personalized experience": "Utilisez PackMate dans votre langue préférée pour une expérience personnalisée",
      "Activity-Based Packing": "Préparation de bagages basée sur les activités",
      "Customize your list based on planned activities and special events": "Personnalisez votre liste en fonction des activités prévues et des événements spéciaux",
      "© 2025 PackMate Travel Assistant. All rights reserved.": "© 2025 PackMate Travel Assistant. Tous droits réservés.",
      "Made with ❤ for travelers around the world": "Fait avec ❤ pour les voyageurs du monde entier"
    }
  };
  
  elements.forEach(el => {
    const original = el.dataset.original || el.textContent;
    if (translations[lang] && translations[lang][original]) {
      el.textContent = translations[lang][original];
      el.dataset.original = original; // Store original text for later translation
    }
  });
}

// Text-to-speech functionality
function speakCurrentScreen() {
  const utterance = new SpeechSynthesisUtterance();
  const visibleScreen = document.querySelector(".screen:not(.hidden)");
  const text = visibleScreen ? visibleScreen.innerText.replace(/[\u{1F300}-\u{1FAFF}]/gu, '') : "";
  utterance.text = text;
  speechSynthesis.speak(utterance);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);