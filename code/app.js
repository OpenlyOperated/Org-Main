// Load environment
require("./config/environment.js");

const AppError = require("shared/error");
const Logger = require("shared/logger");

const DOMAIN = process.env.DOMAIN;
const NODE_ENV = process.env.NODE_ENV;

const express = require("express");
const app = express();
var BODY_LIMIT = "50kb";
app.use(express.json({
  limit: BODY_LIMIT,
  extended: true
}));
app.use(express.urlencoded({
  limit: BODY_LIMIT,
  extended: true
}));

const expressWinston = require("express-winston");
expressWinston.requestWhitelist = ["url", "session", "method", "httpVersion", "originalUrl", "query"];
app.use(expressWinston.logger({
  winstonInstance: Logger,
  ignoreRoute: function (request, response) {
    if (response.statusCode < 400 || response.statusCode == 404) {
      return true;
    }
    const reqUrl = request.url;
    if (reqUrl.startsWith("/css/")
      || reqUrl.startsWith("/images/")
      || reqUrl.startsWith("/js/")
      || reqUrl.startsWith("/favicon.ico")
      || reqUrl.startsWith("/health")) {
        return true;
      } 
      return false;
  }
}));

// Log unhandled rejections
process.on("unhandledRejection", error => {
  Logger.error(`unhandledRejection:
    ${error.stack}`);
});

// Basic Security
app.use(require("helmet")());

// View Engine & HTML/JS/CSS
app.engine(".hbs", require("express-handlebars").engine({
  defaultLayout: "main",
  extname: ".hbs",
  partialsDir: __dirname + "/views/partials/"
}));
app.set("view engine", ".hbs");
app.locals.DOMAIN = DOMAIN;
app.use(express.static("public"));

// Sessions/Flash
app.use(require("./config/session.js"));
if (NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Controllers
app.use("/", require("./controllers/newsletter-controller.js"));
app.use("/", require("./controllers/notification-controller.js"));
app.use("/", require("./controllers/page-controller.js"));

app.get("/error-test", (request, response, next) => {
  next(new AppError(500, 999, "Test alerts", "Details here"));
});

app.get("/health", function(request, response, next) {
	return response.status(200).json({
		message: "OK from Main"
	});
});

// Log Errors
app.use(expressWinston.errorLogger({
  winstonInstance: Logger
}));

// Handle Errors
app.use((error, request, response, next) => {
  if (response.headersSent) {
    Logger.error("RESPONSE ALREADY SENT");
    return;
  }
  return response.format({
    json: () => {
      if (error.statusCode >= 200 && error.statusCode < 500) {
        response.status(error.statusCode).json({
          code: error.confirmedCode,
          message: error.message
        });
      }
      else {
        response.status(500).json({
          code: -1,
          message: "Unknown Internal Error"
        });
      }
    },
    html: () => {
      if (error.statusCode >= 200 && error.statusCode < 500) {
        request.flashRedirect("error", error.message, request.originalUrl);
      }
      else {
        request.flashRender("error", "Unknown Internal Error", "notification");
      }
    }
  });

});

// Handle 404 Not Found
app.use((request, response, next) => {
  return response.format({
    json: () => {
      response.status(404).json({
        code: 404,
        message: "Not Found"
      });
    },
    html: () => {
      request.flashRender("error", "The page you are looking for does not exist.", "notification", 404);
    }
  });
});

module.exports = app;