def analyze_crop(crop, soil, location):

    water_usage = 0
    carbon_emission = 0
    recommendation = ""

    if crop == "Rice":
        water_usage = 3000
        carbon_emission = 2.5
        recommendation = "Use drip irrigation or alternate wetting drying."

    elif crop == "Wheat":
        water_usage = 1500
        carbon_emission = 1.2
        recommendation = "Use sprinkler irrigation."

    elif crop == "Maize":
        water_usage = 1200
        carbon_emission = 1.0
        recommendation = "Use precision irrigation."

    if soil == "Clay":
        water_usage *= 1.2

    if soil == "Sandy":
        water_usage *= 0.9

    score = 100 - (water_usage/50 + carbon_emission*10)

    if score < 0:
        score = 10

    return {
        "water": round(water_usage,2),
        "carbon": carbon_emission,
        "score": round(score,2),
        "recommendation": recommendation
    }