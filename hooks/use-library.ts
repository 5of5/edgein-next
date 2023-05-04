import { LOCAL_STORAGE_LIBRARY_KEY } from "@/utils/constants";

const useLibrary = () => {
  let selectedLibrary = "Web3";
  if (
    typeof window !== "undefined" &&
    localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY)
  ) {
    selectedLibrary = localStorage.getItem(LOCAL_STORAGE_LIBRARY_KEY) || "Web3";
  }

  const onChangeLibrary = (value: "Web3" | "AI") => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_LIBRARY_KEY, value);
    }
  };

  return {
    selectedLibrary,
    onChangeLibrary,
  };
};

export default useLibrary;
