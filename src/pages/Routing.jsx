import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

export default function Routing({ source, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !source || !destination) return;

    if (!source.lat || !source.lon || !destination.lat || !destination.lon) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(source.lat, source.lon),
        L.latLng(destination.lat, destination.lon),
      ],
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 5 }],
      },
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      router: new L.Routing.OSRMv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, source, destination]);

  return null;
}
