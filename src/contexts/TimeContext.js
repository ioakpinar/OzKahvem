import { createContext } from "react";
import { useTime } from "../hooks/useTime";

const TimeContext = createContext();

export function TimeProvider({ children }) {
  const { time, loading } = useTime();
  return (
    <TimeContext.Provider value={time}>
      {!loading && children}
    </TimeContext.Provider>
  );
}

export default TimeContext;
