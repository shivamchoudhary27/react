const getTotalPagesCount = (totaldata : number) => {
    if (totaldata > pagination.PERPAGE) {
        return Math.ceil(totaldata / pagination.PERPAGE);
    } else {
        return 0;
    }
}

/*
 * global object for pagination values
 */
const pagination = {
    PERPAGE: 15,
    TOTAL_PAGES : 5,    // for dummy paginations
    PAGECOUNTER: getTotalPagesCount
};

export {pagination, getTotalPagesCount };