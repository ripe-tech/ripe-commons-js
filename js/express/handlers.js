export const errorHandlerExpress = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const code = err.code || 500;
    const result = { error: err.message, code: code };
    if (process.env.NODE_ENV !== "production") {
        result.stack = err.stack ? err.stack.split("\n") : [];
    }
    res.status(code);
    res.json(result);
};

export const notFoundHandlerExpress = (req, res) => {
    res.status(404);
    res.json({ error: "Route not found", code: 404 });
};
