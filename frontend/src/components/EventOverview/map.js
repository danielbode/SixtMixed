import React from 'react';
import { BRAND_COLOR } from '../../constants';

const apiKey = process.env.REACT_APP_HERE_API_KEY;

const placeholder = (
    <div style={{
        flex: 3,
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: '#666',
        fontSize: 12,
    }}>
        Map unavailable — add <code style={{ margin: '0 4px' }}>REACT_APP_HERE_API_KEY</code> to <code>.env</code>
    </div>
);

export default function Map({ startLocation, endLocation }) {
    const mapRef = React.useRef(null);
    const mapInstanceRef = React.useRef(null);
    const [mapError, setMapError] = React.useState(false);

    React.useEffect(() => {
        if (!apiKey || !startLocation || !endLocation) return;
        if (!window.H) return;
        if (mapInstanceRef.current) return;

        try {
            const H = window.H;
            const platform = new H.service.Platform({ apikey: apiKey });
            const defaultLayers = platform.createDefaultLayers();

            const center = {
                lat: (startLocation.lat + endLocation.lat) / 2,
                lng: (startLocation.lng + endLocation.lng) / 2,
            };

            const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
                zoom: 10,
                center,
            });

            mapInstanceRef.current = map;
            new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

            const router = platform.getRoutingService(null, 8);
            router.calculateRoute({
                transportMode: 'car',
                origin: `${startLocation.lat},${startLocation.lng}`,
                destination: `${endLocation.lat},${endLocation.lng}`,
                return: 'polyline',
            }, (result) => {
                const route = result.routes[0];
                if (!route) return;

                route.sections.forEach(section => {
                    const lineString = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                    const polyline = new H.map.Polyline(lineString, {
                        style: { lineWidth: 6, strokeColor: BRAND_COLOR },
                    });
                    map.addObject(polyline);
                    map.getViewModel().setLookAtData({ bounds: polyline.getBoundingBox() });
                });

                map.addObjects([
                    new H.map.Marker(startLocation),
                    new H.map.Marker(endLocation),
                ]);
            }, (error) => {
                console.error('HERE routing error:', error);
            });

            return () => {
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.dispose();
                    mapInstanceRef.current = null;
                }
            };
        } catch (e) {
            console.warn('Map init failed (WebGL may not be available):', e.message);
            setMapError(true);
        }
    }, [startLocation, endLocation]);

    if (!apiKey || mapError) {
        return placeholder;
    }

    return <div ref={mapRef} style={{ flex: 3, width: '100vw' }} />;
}
