export const CorsMiddleware = (req, res, next) => {
    if (req.get('origin')) {
        res.header('Access-Control-Allow-Origin', `${req.get('origin')}`);
    }
    res.header('Access-Control-Allow-Credentials', `true`);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        res.end();
    } else {
        next();
    }
};
