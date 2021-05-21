require("dotenv").config();

const express = require("express");
const cors = require("cors");
const messageController = require("./controllers/message-controller");
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("America/Sao_Paulo")

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

router.get("/", (req, res) => res.send("Hello"));
router.get("/messages", messageController.index);
router.post("/messages", messageController.store);

app.use(express.json()) 
app.use(cors());
app.use(router);
app.listen(port);
