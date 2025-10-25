import { app } from "./app.js";
import { dbConnection } from "./db/db.js";

const port = process.env.PORT || 7000

dbConnection()

app.listen(port, () => {
    console.log('Server is running on http://localhost:', port);
}).on("error", (err) => {
    console.error("Server failed to start:", err);
});