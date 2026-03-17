from datetime import datetime, timedelta
from flask import Flask, jsonify
from flask_cors import CORS

from data import PEOPLE

app = Flask(__name__)
CORS(app)


@app.route("/person/<int:idx>")
def get_person(idx):
    if idx < 0 or idx >= len(PEOPLE):
        return jsonify({"error": "Person not found"}), 404

    now = datetime.now()
    person = PEOPLE[idx]

    evt = person["event"]
    event_start = now + timedelta(minutes=evt["startOffsetMinutes"])
    event_end = event_start + timedelta(minutes=evt["durationMinutes"])

    offers = []
    for o in person["offers"]:
        offer_start = now + timedelta(minutes=o["startOffsetMinutes"])
        offer_end = offer_start + timedelta(minutes=o["durationMinutes"])
        offers.append({
            "startTime": offer_start.isoformat(),
            "endTime": offer_end.isoformat(),
            "startLocation": o["startLocation"],
            "startLocationCoordinate": o["startLocationCoordinate"],
            "destination": o["destination"],
            "destinationCoordinate": o["destinationCoordinate"],
            "totalPrice": o["totalPrice"],
            "isTaxi": o["isTaxi"],
            "isDriver": o["isDriver"],
            "numberFellowPassengers": o["numberFellowPassengers"],
            "isShared": o["isShared"],
        })

    return jsonify({
        "name": person["name"],
        "event": {
            "title": evt["title"],
            "location": evt["location"],
            "start": event_start.isoformat(),
            "end": event_end.isoformat(),
        },
        "offers": offers,
    })


if __name__ == "__main__":
    app.run(debug=True)
