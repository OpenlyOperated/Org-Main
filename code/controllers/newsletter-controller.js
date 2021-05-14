const AppError = require("shared/error");
const Logger = require("shared/logger");

// Middleware
const { body, query, check } = require("express-validator/check");
const { ValidateCheck } = require("shared/utilities");
// const { Brute} = require("shared/utilities");

// Models
const { NewsletterSubscriber } = require("shared/models");

// Routes
const router = require("express").Router();

// router.post("/newsletter-subscribe",
// [
//   Brute(20).prevent,
//   body("email")
//     .exists().withMessage("Missing email address.")
//     .isEmail().withMessage("Invalid email address.")
//     .normalizeEmail(),
//   ValidateCheck
// ],
// (request, response, next) => {
//   const email = request.values.email;
//   return NewsletterSubscriber.create(email)
//     .then(newsletterSubscriber => {
//       return response.status(200).json({
//         message: "Successfully subscribed.",
//         code: 0
//       });
//     })
//     .catch( error => next(error) );
// });
//
// router.get("/newsletter-confirm",
// [
//   Brute(20).prevent,
//   query("email")
//     .exists().withMessage("Missing email.")
//     .not().isEmpty().withMessage("Missing email.")
//     .isEmail().withMessage("Invalid email address."),
//   query("code")
//     .exists().withMessage("Missing confirmation code.")
//     .not().isEmpty().withMessage("Missing confirmation code.")
//     .isAlphanumeric().withMessage("Invalid confirmation code.")
//     .trim(),
//   ValidateCheck
// ],
// (request, response, next) => {
//   const email = decodeURI(request.values.email);
//   const code = request.values.code;
//   return NewsletterSubscriber.confirm(email, code)
//     .then(success => {
//       return request.flashRedirect(
//         "success",
//         "Newsletter subscription confirmed. Stay tuned for updates, and learn more about Openly Operated by using one of the navigation links above.",
//         "/"
//       );
//     })
//     .catch( error => next(error) );
// });
//
// /*********************************************
//  *
//  * Do Not Email
//  *
//  *********************************************/
//
// router.get("/newsletter-do-not-email",
// [
//   Brute(200).prevent,
//   query("email")
//     .exists().withMessage("Missing email address.")
//     .isEmail().withMessage("Invalid email address.")
//     .normalizeEmail(),
//   query("code")
//     .isAlphanumeric().withMessage("Code must be alphanumeric"),
//   ValidateCheck
// ],
// (request, response, next) => {
//   const email = request.values.email;
//   const code = request.values.code;
//   response.render("newsletter-do-not-email", {
//     code: code,
//     email: email
//   });
// });
//
// router.post("/newsletter-do-not-email",
// [
//   Brute(20).prevent,
//   body("email")
//     .exists().withMessage("Missing email address.")
//     .isEmail().withMessage("Invalid email address.")
//     .normalizeEmail(),
//   body("code")
//     .isAlphanumeric().withMessage("Code must be alphanumeric"),
//   body("reason"),
//   ValidateCheck
// ],
// (request, response, next) => {
//   const email = request.values.email;
//   const code = request.values.code;
//   const reason = request.values.reason;
//   return NewsletterSubscriber.setDoNotEmail(email, code, reason)
//     .then( result => {
//       request.flashRedirect("info", "You have been removed from the Openly Operated newsletter.", "/");
//     })
//     .catch(error => { next(error); });
// });


module.exports = router;
