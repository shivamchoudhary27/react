const googleReCaptcha = {
    END_POINT : "https://www.google.comrecaptcha/api/siteverify",
    SITE_KEY : process.env.REACT_APP_RECAPTCHA_SITE_KEY,
    SECRET_KEY : process.env.REACT_APP_RECAPTCHA_SECRET_KEY,
}

export default googleReCaptcha;