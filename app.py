from flask import Flask, render_template, request, jsonify
from rules import analyze_crop

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/analyze', methods=['POST'])
def analyze():

    data = request.json

    crop = data['crop']
    soil = data['soil']
    location = data['location']

    result = analyze_crop(crop, soil, location)

    return jsonify(result)

if __name__ == "__main__":
    print("Starting CropWise Server...")
    app.run(debug=True)