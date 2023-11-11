import * as React from "react";
import { useAppStore } from "./store";

export default function useFruit() {
  const { getMK, mk } = useAppStore();

  React.useEffect(() => {
    getMK();
    console.log(mk);
  }, []);
  return mk;
}
