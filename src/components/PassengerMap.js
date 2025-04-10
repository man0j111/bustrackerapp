import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

export default function PassengerMap() {
  const [userLocation, setUserLocation] = useState(null);
  const [busLocations, setBusLocations] = useState([]);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  // Listen for changes in bus locations (drivers)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "locations"), (snapshot) => {
      const buses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBusLocations(buses);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Passenger Dashboard</h2>

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation || { lat: 0, lng: 0 }}
          zoom={userLocation ? 14 : 2}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker position={userLocation} label="You" />
          )}

          {/* Bus locations */}
          {busLocations.map((bus) => (
            <Marker
              key={bus.id}
              position={{ lat: bus.lat, lng: bus.lng }}
              label={bus.busNumber}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
