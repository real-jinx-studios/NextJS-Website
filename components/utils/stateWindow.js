import React, { Fragment, useContext, useState } from "react";
import { Store } from "../../utils/store";
import axios from "axios";

export default function StateWindow() {
  const { app_state, dispatch } = useContext(Store);
  const [closed, setClosed] = useState(false);
  const [users, setUsers] = useState(<div>loadign</div>);
  const handleClose = async () => {
    setClosed(!closed);
    const { data } = await axios.get(`/api/dev/query-performance`);

    setUsers((users) => {
      return (
        <Fragment>
          <div>{data.overall}</div>
          <div>{data.query_exec}</div>
        </Fragment>
      );
    });
  };

  return (
    <div className={`stats-main ${closed}`}>
      <h5>
        current user state
        <span className="close_state" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
          </svg>
        </span>
      </h5>
      {JSON.stringify(app_state)
        .split(",")
        .map((x) => (
          <li key={x}>{x}</li>
        ))}
      {users}
    </div>
  );
}
