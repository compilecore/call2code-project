function goToScreen(n) {
  document.querySelectorAll('.screen').forEach(div => div.classList.add('hidden'));
  document.getElementById(`screen${n}`).classList.remove('hidden');
}

// Step 1: show weather preview
async function showWeatherAndContinue() {
  goToScreen(4);
  const dest = document.getElementById("destination").value;
  const apiKey = "bdd11662359d09a7d7626fa094545109"; // replace with your key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${dest}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const weather = data.weather[0].description;
    const temp = data.main.temp;
    document.getElementById("weatherInfo")
      .innerText = `Looks like ${weather}, around ${temp}°C.`;
  } catch (e) {
    document.getElementById("weatherInfo")
      .innerText = "Could not fetch weather info.";
  }
}

// Step 2: generate packing list
function generatePackingList() {
  const activities = [];
  document.querySelectorAll('#screen3 input[type="checkbox"]').forEach(cb => {
    if (cb.checked) activities.push(cb.value);
  });
  const custom = document.getElementById("customActivity").value.trim().toLowerCase();
  if (custom) activities.push(custom);

  const dateVal = document.getElementById("travelDate").value;
  const month = new Date(dateVal).getMonth() + 1;
  const packing = [
    "🧴 Toiletries",
    "🔌 Charger",
    "🧦 Socks",
    "👕 T-Shirts",
    "📄 Passport/ID"
  ];
  if ([12,1,2].includes(month)) packing.push("🧥 Warm Jacket");
  if ([6,7,8].includes(month)) packing.push("🧴 Sunscreen");
  if (activities.includes("beach")) packing.push("🩱 Swimsuit");
  if (activities.includes("hiking")) packing.push("🥾 Hiking Boots");
  if (activities.includes("dining")) packing.push("👞 Formal Shoes");
  if (activities.includes("fitness")) packing.push("👟 Gym Clothes");
  activities.filter(a => !["beach","hiking","dining","fitness"].includes(a))
    .forEach(a => packing.push(`🧭 ${a.charAt(0).toUpperCase()+a.slice(1)}`));

  const listEl = document.getElementById("packingList");
  listEl.innerHTML = "";
  packing.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listEl.appendChild(li);
  });

  goToScreen(5);
}

// Step 3: download list
function downloadList() {
  const items = [...document.querySelectorAll('#packingList li')]
    .map(li => li.textContent).join("\n");
  const blob = new Blob([items], { type: "text/plain" });
  const link = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = link;
  a.download = "packing-list.txt";
  a.click();
  URL.revokeObjectURL(link);
}
