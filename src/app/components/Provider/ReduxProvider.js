"use client";

import { store } from "@/src/redux/store";
import { Provider } from "react-redux";


export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
