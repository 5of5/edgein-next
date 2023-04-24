import moment from "moment-timezone";
import { Filters } from "@/models/Filter";
import { useStateParams } from "./useStateParams";

const formatDateString = (value: string | undefined) => {
  if (value) {
    value = moment(value).format().split("T")[0];
  }
};

const useFilterParams = () => {
  const [selectedFilters, setSelectedFilters] = useStateParams<Filters | null>(
    null,
    "filters",
    (filters) => {
      if (!filters) {
        return "";
      }
      return JSON.stringify(filters);
    },
    (filterString) => {
      if (filterString) {
        const filterJson: Filters = JSON.parse(filterString);
        formatDateString(filterJson?.lastInvestmentDate?.fromDate);
        formatDateString(filterJson?.lastInvestmentDate?.toDate);
        formatDateString(filterJson?.lastFundingDate?.fromDate);
        formatDateString(filterJson?.lastFundingDate?.toDate);
        formatDateString(filterJson?.eventDate?.fromDate);
        formatDateString(filterJson?.eventDate?.toDate);
        return filterJson;
      }
      return null;
    }
  );

  return {
    selectedFilters,
    setSelectedFilters,
  };
};

export default useFilterParams;
