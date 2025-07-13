import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");

import { dataApiJournal } from "./src/api/_dataApiJournal.js";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

dataApiJournal(app);

app.listen(PORT, () => {
	console.log(`Server starting on port ${PORT}`);
});