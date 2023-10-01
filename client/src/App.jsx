import { Fragment, useEffect, useReducer, useState } from "react";
import axios from "axios";
import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";
import ChangesLayout from "./layouts/Changes/ChangesLayout";
import useData from "./hooks/useData";
import StatsLayout from "./layouts/Stats/StatsLayout";

function App() {
  const navigate = useNavigate();
  const { teamArr, memberArr, result, setResult } = useData();

  const [availableTeamIdArr, setAvailableTeamIdArr] = useState(
    teamArr.map((obj) => obj.id)
  );
  const [filledTeamIdArr, setFilledTeamIdArr] = useState({});
  const totalArr = [memberArr, teamArr];

  useEffect(() => {
    console.log(availableTeamIdArr, "available");
    console.log(filledTeamIdArr, "filled");

    setResult(filledTeamIdArr);
  }, [
    filledTeamIdArr,
    setFilledTeamIdArr,
    availableTeamIdArr,
    setAvailableTeamIdArr,
    setResult,
  ]);

  const initialRouteState = {
    dashboard: true,
    changes: false,
    stats: false,
  };
  const [routeState, routeDispatch] = useReducer(
    routeReducer,
    initialRouteState
  );
  function routeReducer(_, action) {
    let newRouteState;
    switch (action.type) {
      case "dashboard":
        newRouteState = { dashboard: true, changes: false, stats: false };
        break;
      case "changes":
        newRouteState = { dashboard: false, changes: true, stats: false };
        break;
      case "stats":
        newRouteState = { dashboard: false, changes: false, stats: true };
        break;
      default:
        throw new Error();
    }
    return newRouteState;
  }
  useEffect(() => {
    if (routeState.dashboard) {
      navigate("/");
    } else if (routeState.changes) {
      navigate("/changes");
    } else if (routeState.stats) {
      navigate("/stats");
    }
  }, [routeState.dashboard, routeState.changes, navigate]);

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/", totalArr)
      .then((res) => {
        const entries = Object.entries(JSON.parse(res.data.result)).sort(
          (a, b) => a[1].length - b[1].length
        );

        let maxLength = 0;
        for (const [, subarray] of entries) {
          if (subarray.length > maxLength) {
            maxLength = subarray.length;
          }
        }

        // assignToBestGroup(entries);
        assignToFirstGroup(entries);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function assignToFirstGroup(entries) {
    let tempGroup = {};
    entries.forEach((cur, idx) => {
      tempGroup[cur[0]] = {
        team: cur[1][0],
        type: 0,
        same: cur[0] === (cur[1][0] - 100).toString(),
      };
    });

    setFilledTeamIdArr(tempGroup);
    setAvailableTeamIdArr([]);
  }

  function assignToBestGroup(entries) {
    let tempfilledMemberArr = [];
    let tempAvailableTeamIdArr = availableTeamIdArr;

    // ["1", [101,102]]
    // First round: assign them to original group
    entries.forEach((cur, idx) => {
      if (cur[0] === (cur[1][0] - 100).toString()) {
        setFilledTeamIdArr((prevFilledTeamIdArr) => ({
          ...prevFilledTeamIdArr,
          [cur[0]]: {
            team: cur[1][0],
            type: 1,
            same: cur[0] === (cur[1][0] - 100).toString(),
          },
        }));
        setAvailableTeamIdArr((prevAvailableTeamIdArr) =>
          prevAvailableTeamIdArr.filter((item) => item !== cur[1][0])
        );
        tempAvailableTeamIdArr = tempAvailableTeamIdArr.filter(
          (item) => item !== cur[1][0]
        );
      } else {
        tempfilledMemberArr.push(cur);
      }
    });

    // second round, if they have more than 1 pref, then try to search for them and use them
    tempfilledMemberArr.forEach((cur) => {
      cur[1].forEach((pref) => {
        if (tempAvailableTeamIdArr.includes(pref)) {
          setFilledTeamIdArr((prevFilledTeamIdArr) => ({
            ...prevFilledTeamIdArr,
            [cur[0]]: { team: pref, type: 2, same: cur[0] === pref },
          }));
          setAvailableTeamIdArr((prevAvailableTeamIdArr) =>
            prevAvailableTeamIdArr.filter((item) => item !== pref)
          );
          tempAvailableTeamIdArr = tempAvailableTeamIdArr.filter(
            (item) => item !== pref
          );
          tempfilledMemberArr = tempfilledMemberArr.filter(
            (item) => item !== cur
          );
          return;
        }
      });
    });

    //third round, if same id and same team id, match them together.
    tempAvailableTeamIdArr.forEach((cur, idx) => {
      setFilledTeamIdArr((prevFilledTeamIdArr) => ({
        ...prevFilledTeamIdArr,
        [tempfilledMemberArr[idx][0]]: {
          team: cur,
          type: 3,
          same: tempfilledMemberArr[idx][0] === (cur - 100).toString(),
        },
      }));
      setAvailableTeamIdArr((prevAvailableTeamIdArr) =>
        prevAvailableTeamIdArr.filter((item) => item !== cur)
      );
      tempAvailableTeamIdArr = tempAvailableTeamIdArr.filter(
        (item) => item !== cur
      );
    });
  }

  let count = 0;
  for (const key in result) {
    if (Object.hasOwnProperty.call(result, key) && result[key].same === false) {
      count++;
    }
  }

  return (
    <Fragment>
      <div className={styles.background}>
        <div className={styles.bound}>
          <aside className={styles.sidebar}>
            <div className={styles["sidebar__image-overlay"]}>
              <div className={styles.sidebar__title}>
                <div className={styles["sidebar__title-icon"]}></div>
                <h4 className={styles["sidebar__title-text"]}>Roast Chicken</h4>
              </div>

              <div className={styles.sidebar__body}>
                <div
                  className={`${styles["sidebar__route"]} 
                              ${
                                routeState.dashboard
                                  ? `${styles["sidebar__route--active"]}`
                                  : ""
                              }`}
                  onClick={() =>
                    routeDispatch({
                      type: "dashboard",
                    })
                  }
                >
                  <div className={`${styles["sidebar__route-icon"]}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </div>
                  <h4 className={`${styles["sidebar__route-text"]}`}>
                    Dashboard
                  </h4>
                </div>
                <div
                  className={`${styles["sidebar__route"]} 
                            ${
                              routeState.changes
                                ? `${styles["sidebar__route--active"]}`
                                : ""
                            }`}
                  onClick={() =>
                    routeDispatch({
                      type: "changes",
                    })
                  }
                >
                  <div className={`${styles["sidebar__route-icon"]}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className={`${styles["sidebar__route-text"]}`}>
                    Changes
                  </h4>
                </div>
                <div
                  className={`${styles["sidebar__route"]} 
                              ${
                                routeState.stats
                                  ? `${styles["sidebar__route--active"]}`
                                  : ""
                              }`}
                  onClick={() =>
                    routeDispatch({
                      type: "stats",
                    })
                  }
                >
                  <div className={`${styles["sidebar__route-icon"]}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                      />
                    </svg>
                  </div>
                  <h4 className={`${styles["sidebar__route-text"]}`}>Stats</h4>
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.container}>
            <header className={styles.container__header}>
              <h1 className={styles["container__header-greeting"]}>
                Hello,{" "}
                <span
                  className={styles["container__header-greeting--highlight"]}
                >
                  demeritbird
                </span>
              </h1>
              <h4 className={styles["container__header-changes"]}>
                <span
                  className={styles["container__header-changes--highlight"]}
                >
                  5 changes
                </span>{" "}
                to be made
              </h4>
            </header>
            <main className={styles.container__main}>
              <Routes>
                <Route path="/" element={<DashboardLayout />} />
                <Route path="/changes" element={<ChangesLayout />} />
                <Route path="/stats" element={<StatsLayout />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
