import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const mapContainerStyle = {
  width: "100%",
  height: "90vh",
};

export default function DriverMap() {
  const [location, setLocation] = useState(null);
  const [busNumber, setBusNumber] = useState("");

  // Get driver's location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(newLoc);

        // Upload location to Firestore if authenticated and busNumber is set
        const user = auth.currentUser;
        if (user && busNumber) {
          setDoc(doc(db, "locations", user.uid), {
            lat: newLoc.lat,
            lng: newLoc.lng,
            busNumber,
            timestamp: new Date(),
          });
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [busNumber]);

  return (
    <div>
      <h2>Driver Dashboard</h2>
      <label>Enter Bus Number: </label>
      <input
        type="text"
        value={busNumber}
        onChange={(e) => setBusNumber(e.target.value)}
        placeholder="Eg: 45A"
      />

      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location || { lat: 0, lng: 0 }}
          zoom={location ? 14 : 2}
        >
          {location && <Marker position={location} label="Bus" />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
