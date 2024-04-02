import { SetStateAction, useState } from "react";

export const useTableSorting = () => {
  const [sortByFilter, setSortByFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleTableSorting = (
    sortBy: SetStateAction<string>,
    setFilterUpdate: (arg0: (prevState: any) => any) => void
  ) => {
    let newSortOrder = "";
    if (sortByFilter === sortBy) {
      newSortOrder =
        sortOrder === "asc" ? "desc" : sortOrder === "desc" ? "" : "asc";
    } else {
      newSortOrder = "asc";
    }

    setSortByFilter(sortBy);
    setSortOrder(newSortOrder);

    setFilterUpdate((prevState) => ({
      ...prevState,
      sortBy: newSortOrder !== "" ? sortBy : "",
      sortOrder: newSortOrder,
    }));
  };

  return {
    sortByFilter,
    sortOrder,
    handleTableSorting,
  };
};
