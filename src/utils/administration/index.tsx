const siteAdminConfig = {
    PERPAGE: 10,
    SET_TOTAL_PAGES : 5,
};

const getTotalPagesCount = (totaldata : number) => {
    if (totaldata > siteAdminConfig.PERPAGE) {
        return Math.ceil(totaldata / siteAdminConfig.PERPAGE);
    } else {
        return 0;
    }
}

export {siteAdminConfig, getTotalPagesCount };