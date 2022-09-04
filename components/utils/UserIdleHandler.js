import React, { useState, useEffect } from "react";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import { useClient } from "../../lib/context";
import throttle from "../../lib/throttle";
export default function IdleTimeOutHandler(props) {
  const { verifyClientToken } = useClient();
  const events = ["click", "scroll", "load", "keydown"];
  const eventHandler = throttle((eventType) => {
    verifyClientToken("from event handler");
  }, 35000);
  useEffect(() => {
    addEvents();

    return () => {
      removeEvents();
    };
  }, []);

  const addEvents = () => {
    events.forEach((eventName) => {
      window.addEventListener(eventName, eventHandler);
    });
  };
  const removeEvents = () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, eventHandler);
    });
  };

  return <div></div>;
}
