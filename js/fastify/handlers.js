export const errorHandlerFastify = (err, req, res) => {
    const code =
        err.code && Number(err.code) >= 100 && Number(err.code) < 600 ? Number(err.code) : 500;
    const result = { error: err.message, code: code };
    if (process.env.NODE_ENV !== "production") {
        result.stack = err.stack ? err.stack.split("\n") : [];
    }
    res.code(result.code).send(result);
};

export const notFoundHandlerFastify = (req, res) => {
    res.code(404).send({ error: "Route not found", code: 404 });
};
