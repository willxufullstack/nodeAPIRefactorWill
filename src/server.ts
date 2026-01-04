import { createApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 3000); // Default to 3000

createApp().listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
