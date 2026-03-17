import React from 'react';
import { hourToString } from '../utils';

const defaultEvent = {
    startingTime: 16, 
    endTime: 18, 
    title: "Dinner", 
    location:"Boltzmannstraße 3, 85748 Garching"
};

export default function NextEvent({event: nextEvent = defaultEvent }) {
    const { 
        startTime: startTimeComplete, endTime: endTimeComplete,
        title, location
    } = nextEvent;
    const startingHour = startTimeComplete.getHours();
    const durationHours = Math.round((endTimeComplete - startTimeComplete) / (60 * 60 * 1000));
    const duration = durationHours;
    const timeSlots = Array.from({length: durationHours + 2}, (_, i) => (startingHour - 1 + i + 24) % 24);

    return(
        <div className="NextEvent-Container">
            <p className="NextEvent-Text">We found this on your calendar...</p>
            <div className="calendar">
                <div id="time">
                    {
                        timeSlots.map(ts => (
                            <div className="top-border" key={ts}>
                                {hourToString(ts)}
                            </div>
                        ))
                    }
                </div>

                <div id="event">
                    <div style={{flex: 1}}></div>
                    <div className="eventSlot" style={{flex: duration}}>
                        <p className="title">{title}</p>
                        <p className="location">{location}</p>
                    </div>
                    <div style={{flex: 1}}></div>
                </div>
            </div>
        </div>
    )   
}