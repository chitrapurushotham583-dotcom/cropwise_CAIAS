function calculate() {
    // 1. Get the values from the UI
    let crop = document.getElementById("crop").value;
    let soil = document.getElementById("soil").value;
    let irrigation = document.getElementById("irrigation").value;
    
    // NEW for Commit 2: Get the Season (Add this dropdown in your HTML)
    let season = document.getElementById("season") ? document.getElementById("season").value : "summer";

    let water = 0;

    // 2. Base Water Logic
    if (crop === "rice") water = 1200;
    else if (crop === "wheat") water = 800;
    else if (crop === "maize") water = 600;

    // 3. Soil Adjustment
    if (soil === "sandy") water *= 1.2;
    else if (soil === "clay") water *= 0.9;

    // 4. Season Adjustment (New Logic)
    if (season === "monsoon") water *= 0.5; // Rain helps!
    else if (season === "winter") water *= 0.8;

    // 5. Irrigation & Recommendation
    let recommendation = "";
    if (irrigation === "flood") {
        water *= 1.3;
        recommendation = "⚠️ Switching to drip irrigation could save 30% more water.";
    } else {
        recommendation = "✅ Excellent! Drip irrigation is highly sustainable.";
    }

    // 6. Final Metrics
    let carbon = water * 0.05;
    let score = 100 - (water / 20 + carbon / 2);
    if (score < 0) score = 0;

    let traditional = water * 1.5; // Baseline for comparison
    let savings = traditional - water;

    // 7. Update the UI
    const resultBox = document.getElementById("result");
    resultBox.style.display = "block";
    
    // Determine Score Color
    let scoreColor = score > 70 ? "green" : (score > 40 ? "orange" : "red");

    resultBox.innerHTML = `
        <h3 style="color:${scoreColor}">Sustainability Score: ${Math.round(score)}/100</h3>
        <p>💧 <b>Water Usage:</b> ${Math.round(water)} Litres</p>
        <p>🌍 <b>Carbon Footprint:</b> ${carbon.toFixed(1)} kg CO₂</p>
        <hr>
        <h4>Comparison Dashboard</h4>
        <table style="width:100%; border: 1px solid #ddd; padding: 10px;">
            <tr>
                <td>Traditional Method:</td>
                <td style="color:red">${Math.round(traditional)} L</td>
            </tr>
            <tr>
                <td>CropWise Optimized:</td>
                <td style="color:green">${Math.round(water)} L</td>
            </tr>
            <tr style="font-weight:bold;">
                <td>Total Water Saved:</td>
                <td style="color:blue">${Math.round(savings)} L</td>
            </tr>
        </table>
        <p style="margin-top:10px;"><i>${recommendation}</i></p>
    `;
}