import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import HamburgerNav from "../component/Hamburger";
import path from "../../path";
import Calendar from "../assets/calendar.svg";
import Position from "../assets/position.svg";
import { Link } from "react-router-dom";

function RenderImage(img) {
  if (img) {
    return `${path}${img}`;
  }
}

function Ongoing_v() {
  const [user, setUser] = useState();
  const [myActivity, setMyActivity] = useState();

  function RenderActivity(props) {
    const url = "/Activity_detail/" + (props.data.a_id);
    return (
      <Link to={url}>
        <div className="rounded-md col-span-1 roundec-md shadow-md py-4">
          <div className="flex justify-center">
            <img
              className="shadow-md rounded-md h-[200px] w-full object-cover"
              src={RenderImage(props.data.img)}
              alt=""
            />
          </div>
          <div className="px-2 space-y-2">
            <p className="font-bold text-xl mt-3">{props.data.topic}</p>
            <div className="flex items-center space-x-2 text-xs">
              <img src={Calendar} alt="" />
              <p>
                {props.data.start.slice(0, 10).replaceAll("-", "/")} -{" "}
                {props.data.stop.slice(0, 10).replaceAll("-", "/")}
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <img src={Position} alt="" />
              <p>{props.data.position}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  useEffect(() => {
    axios
      .post(`${path}/user`, { user_id: localStorage.getItem("user") })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${path}/volunteer_activity_ongoing`, {
        u_id: localStorage.getItem("user"),
      })
      .then((response) => {
        setMyActivity(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pb-10">
      <div className="absolute top-0">
        {user && <HamburgerNav user={user} />}
      </div>
      <div className="py-2 bg-[#FD7D61]">
        <div>
          <p className="text-3xl text-white font-bold text-center">Ongoing</p>
        </div>
      </div>
      <div>
        {myActivity && (
          <div className="text-center space-y-4 py-8">
            <p className="text-4xl">{myActivity.length}</p>
            <p>Ongoing Activity</p>
          </div>
        )}
        {myActivity &&
          myActivity.map((value, index) => {
            return (
              <div className="px-4" key={index}>
                <RenderActivity data={value} index={index} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default Ongoing_v;
