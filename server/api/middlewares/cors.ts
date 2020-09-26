export const CorsMiddleware = (req, res, next) => {
    if (req.get('origin')) {
        res.header('Access-Control-Allow-Origin', `${req.get('origin')}`);
    }
    res.header('Access-Control-Allow-Credentials', `true`);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        res.end();
    } else {
        next();
    }
};
