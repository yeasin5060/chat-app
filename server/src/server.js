import { app } from "./app.js";

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log('Server is running on http://localhost:', port);
}).on("error", (err) => {
    console.error("Server failed to start:", err);
});