import React from 'react';
import EventOverview from '../EventOverview';
import SwipeableViews from 'react-swipeable-views';
import Button from '../Button/index';
import './style.css';

export default function OfferList({ event, offers, onOrder }) {
    const [ viewsIndex, setViewsIndex ] = React.useState(0)
    return (
        <div className="OfferList">
            <div className="OfferList-AvailableText">
                Here are {viewsIndex + 1} of {offers.length} offer(s) to bring you there:
            </div>
            <SwipeableViews
                onChangeIndex={setViewsIndex}
                enableMouseEvents
                containerStyle={{ 
                    flex: 1,
                    display: 'flex'
                }}
                slideStyle={{
                    flex: 1,
                    display: 'flex',
                    minWidth: '100%'
                }}
                className="OfferList-SwipeViews">
                {
                    offers.map((evt, i) => (<EventOverview key={i} event={event} {...evt} />))
                }
                
            </SwipeableViews>
            <Button
                onClick={() => onOrder(offers[viewsIndex])} 
                text="Book now" />

        </div>
    )
}