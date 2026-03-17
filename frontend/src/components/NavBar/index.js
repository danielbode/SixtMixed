import React from 'react';
import NavIcon from '../NavIcon';
import './style.css'
export default function NavBar() {
    const iconData = [
        {
            iconName: 'vpn_key_outlined',
            name: 'Rent'
        },
        {
            iconName: 'drive_eta_outlined',
            name: 'Share'
        },
        {
            iconName: 'local_shipping_outlined',
            name: 'Ride'
        },
        {
            iconName: 'today_outlined',
            name: 'Calendar',
            active: true
        },
        {
            iconName: 'account_circle_outlined',
            name: 'Account'
        },


    ]

    return (
        <div className="App-NavBar">
            {
                iconData.map((item) => <NavIcon key={item.name} {...item} />)
            }
        </div>
    )
}