# All times are stored as offsets (minutes from request time) so the demo
# always shows realistic, current-looking values regardless of when it runs.

PEOPLE = [
    {
        # ── User 0: Microsoft Developer ─────────────────────────────────────
        # Scenario: on time, riding as a passenger in a Sixt Mixed2Go shared car
        "name": "Microsoft Developer",
        "event": {
            "title": "Meet with Jack",
            "location": "Boltzmannstraße 3, 85748 Garching bei München",
            "startOffsetMinutes": 60,
            "durationMinutes": 120,
        },
        "offers": [
            {
                "startOffsetMinutes": 10,
                "durationMinutes": 10,
                "startLocation": "Bavarian state library, Ludwigstraße 16, 80539 München",
                "startLocationCoordinate": {"lat": 48.1474093, "lng": 11.578423},
                "destination": "Boltzmannstraße 3, 85748 Garching",
                "destinationCoordinate": {"lat": 48.26504, "lng": 11.6693806},
                "totalPrice": 8.00,
                "isTaxi": False,
                "isDriver": False,
                "numberFellowPassengers": 1,
                "isShared": True,
            },
            {
                "startOffsetMinutes": 10,
                "durationMinutes": 10,
                "startLocation": "Bavarian state library, Ludwigstraße 16, 80539 München",
                "startLocationCoordinate": {"lat": 48.1474093, "lng": 11.578423},
                "destination": "Boltzmannstraße 3, 85748 Garching",
                "destinationCoordinate": {"lat": 48.26504, "lng": 11.6693806},
                "totalPrice": 11.40,
                "isTaxi": False,
                "isDriver": True,
                "numberFellowPassengers": 0,
                "isShared": False,
            },
            {
                "startOffsetMinutes": 10,
                "durationMinutes": 8,
                "startLocation": "Bavarian state library, Ludwigstraße 16, 80539 München",
                "startLocationCoordinate": {"lat": 48.1474093, "lng": 11.578423},
                "destination": "Boltzmannstraße 3, 85748 Garching",
                "destinationCoordinate": {"lat": 48.26504, "lng": 11.6693806},
                "totalPrice": 25.40,
                "isTaxi": True,
                "isDriver": False,
                "numberFellowPassengers": 0,
                "isShared": False,
            },
        ],
    },
    {
        # ── User 1: TUM Student ──────────────────────────────────────────────
        # Scenario: on time, driving own shared car
        "name": "TUM Student",
        "event": {
            "title": "DS Lecture",
            "location": "Boltzmannstraße 3, 85748 Garching bei München",
            "startOffsetMinutes": 60,
            "durationMinutes": 150,
        },
        "offers": [
            {
                "startOffsetMinutes": 10,
                "durationMinutes": 10,
                "startLocation": "Giesing",
                "startLocationCoordinate": {"lat": 48.110904, "lng": 11.5926632},
                "destination": "Garching Forschungszentrum",
                "destinationCoordinate": {"lat": 48.26504, "lng": 11.6693806},
                "totalPrice": 12.99,
                "isTaxi": False,
                "isDriver": True,
                "numberFellowPassengers": 0,
                "isShared": True,
            },
            {
                "startOffsetMinutes": 10,
                "durationMinutes": 10,
                "startLocation": "Giesing",
                "startLocationCoordinate": {"lat": 48.110904, "lng": 11.5926632},
                "destination": "Garching Forschungszentrum",
                "destinationCoordinate": {"lat": 48.26504, "lng": 11.6693806},
                "totalPrice": 30.25,
                "isTaxi": True,
                "isDriver": True,
                "numberFellowPassengers": 0,
                "isShared": False,
            },
        ],
    },
    {
        # ── User 2: LMU Student ──────────────────────────────────────────────
        # Scenario: running late — event starts in 15 min, earliest ride arrives in 25 min
        "name": "LMU Student",
        "event": {
            "title": "Sociology Lecture",
            "location": "Geschwister-Scholl-Platz 1, 80539 München",
            "startOffsetMinutes": 15,
            "durationMinutes": 90,
        },
        "offers": [
            {
                "startOffsetMinutes": 15,
                "durationMinutes": 10,
                "startLocation": "Bavarian state library, Ludwigstraße 16, 80539 München",
                "startLocationCoordinate": {"lat": 48.1457681, "lng": 11.557282},
                "destination": "Geschwister-Scholl-Platz 1, 80539 München",
                "destinationCoordinate": {"lat": 48.1508183, "lng": 11.5799541},
                "totalPrice": 16.46,
                "isTaxi": True,
                "isDriver": False,
                "numberFellowPassengers": 0,
                "isShared": False,
            },
            {
                "startOffsetMinutes": 12,
                "durationMinutes": 11,
                "startLocation": "Bavarian state library, Ludwigstraße 16, 80539 München",
                "startLocationCoordinate": {"lat": 48.1457681, "lng": 11.557282},
                "destination": "Geschwister-Scholl-Platz 1, 80539 München",
                "destinationCoordinate": {"lat": 48.1508183, "lng": 11.5799541},
                "totalPrice": 18.29,
                "isTaxi": True,
                "isDriver": False,
                "numberFellowPassengers": 0,
                "isShared": False,
            },
        ],
    },
]
