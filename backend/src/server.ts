import { app } from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log(`🍫 Brasil Doces do Vale API rodando em http://localhost:${env.port}`);
});
