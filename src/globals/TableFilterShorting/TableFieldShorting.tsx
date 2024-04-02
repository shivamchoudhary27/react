import { useState } from "react";

export const useTableSorting = () => {
    const [sortByFilter, setSortByFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const handleTableSorting = (sortBy, setFilterUpdate) => {
        let newSortOrder = "";
        if (sortByFilter === sortBy) {
            newSortOrder = sortOrder === "asc" ? "desc" : sortOrder === "desc" ? "" : "asc";
        } else {
            newSortOrder = "asc";
        }

        setSortByFilter(sortBy);
        setSortOrder(newSortOrder);

        setFilterUpdate((prevState) => ({
            ...prevState,
            sortBy,
            sortOrder: newSortOrder
        }));
    };

    return {
        sortByFilter,
        sortOrder,
        handleTableSorting
    };
};
