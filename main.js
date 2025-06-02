import { app } from "./app.js";
import { IP_SERVER, API_VERSION } from "./constants.js";

const PORT = 5000;

try {
  app.listen(PORT, () => {
    console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    console.log(`Backend Starts ${PORT}✅💪🟢`);
  });
} catch (err) {
  console.error(err);
}