import React from 'react';
import Modal from 'react-modal';
import CommuteLogo from '../CommuteLogo';
import { timeToString } from '../../utils';
import Button from '../Button';
import Icon from '@material-ui/core/Icon';
import { BRAND_COLOR } from '../../constants';

Modal.setAppElement('#root');

const InfoRow = ({ iconName, name, value, highlightValue }) => (
    <div className="Modal-Details">
        <div className="Modal-DetailsKey">
            <Icon>{iconName}</Icon>
            <div style={{width: 4}} />
            {name}
        </div>
        <div style={{color: highlightValue ? BRAND_COLOR : 'white'}}
            className="Modal-DetailsValue">
            {value}
        </div>
    </div>
);

export default function ConfirmModal({
    offer,
    setOrderContent
}) {
    if (!offer) return null;
    const {
        startLocation, destination, totalPrice, isTaxi,
        startTime, endTime,
        numberFellowPassengers,
        isShared,
        isDriver
    } = offer;

    return (
        <Modal
            isOpen={!!offer}
            className="Modal-Container"
            onRequestClose={() => setOrderContent(null)}
        >
            <div className="Modal-Container">
                <div className="Modal-Header">
                    Booking Confirmed!
                </div>
                Summary:
                <div style={{fontSize: 12, marginTop: 32, marginBottom: 32}} className="Modal-Details">
                    <CommuteLogo />
                    <div className="Modal-Location-Container">
                        <div className="Modal-Location">
                            <div>{startLocation}</div>
                            <div style={{color: BRAND_COLOR}}>
                                {timeToString(startTime)}
                            </div>
                        </div>
                        <div style={{flex: 1}} />
                        <div className="Modal-Location">
                            <div>{destination}</div>
                            <div style={{color: BRAND_COLOR}}>
                                {timeToString(endTime)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Modal-InfoContainer">
                    <InfoRow
                        iconName="money"
                        name="Price (Whole Trip)"
                        value={`${totalPrice} €`}
                        highlightValue
                    />
                    <InfoRow
                        iconName="share"
                        name="Sixt Mixed2Go"
                        value={isShared ? "Yes" : "No"}
                        highlightValue
                    />
                    <InfoRow
                        iconName="local_shipping_outlined"
                        name="Is Sixt taxi"
                        value={isTaxi ? "Yes" : "No"}
                    />
                    <InfoRow
                        iconName="drive_eta"
                        name="Are you driving"
                        value={isDriver ? "Yes" : "No"}
                    />
                    <InfoRow
                        iconName="people"
                        name="Fellow Passengers"
                        value={numberFellowPassengers}
                    />
                </div>
                <Button
                    onClick={() => setOrderContent(null)}
                    className="Modal-Button"
                    text="Close"
                />
            </div>
        </Modal>
    );
}
