import { createContext } from "react";
import { useTime } from "../hooks/useTime";

const TimeContext = createContext();

export function TimeProvider({ children }) {
  const orderNo = useTime();
  return (
    <TimeContext.Provider value={orderNo}>{children}</TimeContext.Provider>
  );
}

export default TimeContext;
