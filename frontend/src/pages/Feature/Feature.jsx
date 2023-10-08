import React, { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import "./Feature.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import { QueryClient, useMutation, useQuery } from "react-query";
import { format } from "timeago.js";
import newRequest from "../../utils/newRequest";

const Feature = () => {
  const currentUser = "Joy";
  const [viewPort, setViewport] = useState({
    latitude: 10.850516,
    longitude: 76.27108,
    zoom: 6,
  });
  const [showPopup, setShowPopup] = useState(true);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState({
    lat: 0,
    lng: 0,
  });
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const { isLoading, error, data } = useQuery({
    queryKey: ["getPin"],
    queryFn: () =>
      newRequest
        .get(`/`)
        .then((res) => {
          return res.data;
        })
        .catch((errorData) => {
          console.log("error" + errorData);
        }),
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewPort, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;

    setNewPlace({
      lat,
      lng,
    });
  };

  const mutation = useMutation({
    mutationFn: (pin) => {
      return newRequest
        .post("/", pin)
        .then((res) => {
          // return res.data;
          console.log(res.data);
        })
        .catch((errorData) => {
          console.log(errorData);
        });
    },
    onSuccess: () => {
      QueryClient.invalidateQueries(["createPin"]);
    },
  });

  const handleSubmit = (e) =>{

    e.preventDefault();

    const newPin = {
    username:currentUser,
    title,
    desc,
    rating:star,
    lat:newPlace.lat,
    long:newPlace.lng
    }

    mutation.mutate(newPin);

    setNewPlace(null)
  }

  return (
    <div className="feature" style={{ height: "100vh", width: "100vw" }}>
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYWtoaWwxMjM4OTAiLCJhIjoiY2xuZGI2ZWdyMDJ5OTJtcmxqbXM0MGc1eiJ9.cfe6FlxCcLvagq0Egp0Vmw"
        initialViewState={{
          longitude: viewPort.longitude,
          latitude: viewPort.latitude,
          zoom: viewPort.zoom,
        }}
        onContextMenu={handleAddClick}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {data?.map((d) => (
          <>
            <Marker
              longitude={d.long}
              latitude={d.lat}
              offset={[0 * viewPort.zoom, -2 * viewPort.zoom]}
              style={{}}
            >
              <RoomIcon
                style={{
                  fontSize: viewPort.zoom * 6,
                  color: d.username === currentUser ? "red" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(d._id, d.lat, d.long)}
              />
            </Marker>
            {d._id === currentPlaceId && (
              <Popup
                longitude={d.long}
                latitude={d.lat}
                anchor="left"
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                // offset={[30, -1650]}
                maxWidth={"230px"}
                style={{
                  backgroundColor: "white",
                  height: "fit-content",
                  marginLeft: "20px",
                }}
                className="string"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{d.title}</h4>
                  <label>Review</label>
                  <p className="desc">{d.desc}</p>

                  <label>Information</label>
                  <span className="username">
                    Created by <b>{d.username}</b>
                  </span>
                  <span className="date">{format(d.createdAt)}</span>
                  <label style={{ marginTop: "10px" }}>Rating</label>
                  <div>
                    {Array(d.rating).fill(<StarIcon className="star" />)}
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}

        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="left"
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            // offset={[30, -1650]}
            maxWidth={"230px"}
            style={{
              backgroundColor: "white",
              height: "fit-content",
              marginLeft: "20px",
            }}
            // className="string"
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>

                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
      ;
    </div>
  );
};

export default Feature;
