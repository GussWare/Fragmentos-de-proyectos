import mongoose from "mongoose";
import app from "./app";
import Constants from "./config/constants";

// config global
global.constants = Constants;

mongoose.connect(
	process.env.MONGO_CONNECT_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
	(err, res) => {
		if (err) {
			throw err;
		} else {
			app.listen(process.env.PORT, () => {
				console.log("Servidor escuchando en " + process.env.BASE_URL);
				console.log("MongoDB ", process.env.MONGO_CONNECT_STRING);
			});

			app.timeout = 300000;
		}
	}
);

mongoose.set("useCreateIndex", true);
