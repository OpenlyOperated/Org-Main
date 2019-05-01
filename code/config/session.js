const AppError = require("shared/error");
const Logger = require("shared/logger");

// Constants
const DOMAIN = process.env.DOMAIN;
const NODE_ENV = process.env.NODE_ENV;
const USER_SESSION_SECRET = process.env.USER_SESSION_SECRET;

const session = require("express-session");
const flash = require("connect-flash");

const { Database } = require("shared/utilities");
const pgSession = require("connect-pg-simple")(session);

const sessionOptions = {
  store: new pgSession({
    pool : Database,
    tableName : 'user_sessions'
  }),
  secret: USER_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 5 * 60 * 1000,
    httpOnly: true
  },
  unset: "destroy",
  name: "ooid",
  sameSite: true
};

if (NODE_ENV === "production") {
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.domain = DOMAIN;
}

const flashMiddleware = (request, response, next) => {
  // flash for the current page without redirecting
  request.flashRender = (type, message, render, code = 200) => {
    request.flash(type, message);
    response.locals.flash = request.flash();
    response.status(code);
    response.render(render);
  };
  // flash for redirects - should retrieve from response.locals
  request.flashRedirect = (type, message, redirect) => {
    request.flash(type, message);
    // avoid infinite redirect loop
    // if it's a GET and redirecting to same URL, then redirect to /notification instead
    if (request.method == "GET" && redirect == request.url) {
      response.redirect("/notification");
    }
    else {
      response.redirect(redirect);
    }
  };
  response.locals.flash = request.flash();
  // clear it
  if (request.session && request.session.flash) {
    delete request.session.flash;
  }
  next();
};

module.exports = [
  session(sessionOptions),
  flash(),
  flashMiddleware
];