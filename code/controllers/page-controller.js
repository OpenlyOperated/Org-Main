const AppError = require("shared/error");
const Logger = require("shared/logger");

// Middleware
const { body, query, checkSchema } = require("express-validator/check");
const { ValidateCheck } = require("shared/utilities");

// Models
const { Post } = require("shared/models");

// Routes
const router = require("express").Router();

router.get(["/report/:alias", "/post/:alias"],
[
  checkSchema({
    alias: {
      in: ["params"],
      customSanitizer: {
        options: (value, { request, location, path }) => {
          if (value) {
            return value.toLowerCase();
          }
          return null;
        }
      },
      matches: {
        options: Post.aliasPattern
      },
      errorMessage: "Invalid Alias"
    }
  }),
  query("footer"),
  ValidateCheck
],
(request, response, next) => {
  const alias = request.values.alias;
  const footer = (request.values.footer == "false") ? false : true;
  
  return Post.getByAlias(alias, false)
    .then(post => {
      return response.render("post", {
        active: { active_reports: true },
        post: post,
        footer: footer
      });
    })
    .catch( error => next(error) );
});

router.get("/post",
[
  query("id")
    .exists().withMessage("Missing id.")
    .not().isEmpty().withMessage("Missing id.")
    .isNumeric({
      no_symbols: true
    }),
  ValidateCheck
],
(request, response, next) => {
  const id = request.values.id;
  
  return Post.getById(id, false)
    .then(post => {
      return response.render("post", {
        post: post,
        footer: true
      });
    })
    .catch( error => next(error) );
});

router.get("/", (request, response, next) => {
  return Post.list("home", false)
    .then(posts => {
      return response.render("post", {
        active: { active_home: true },
        post: posts[0],
        footer: true
      });
    })
    .catch( error => next(error) );
});

router.get("/reports",
(request, response, next) => {
  return Post.list("audit report", false)
    .then(posts => {
      return response.render("reports", {
        active: { active_reports: true },
        reports: posts
      });
    })
    .catch(error => { next(error); });
});

router.get("/about-us",
(request, response, next) => {
  return Post.list("about us", false)
    .then(posts => {
      return response.render("post", {
        active: { active_about_us: true },
        post: posts[0],
        footer: true
      });
    })
    .catch( error => next(error) );
});

router.get("/user-benefits",
(request, response, next) => {
  return Post.list("user benefits", false)
    .then(posts => {
      return response.render("post", {
        active: { active_user_benefits: true },
        post: posts[0],
        footer: true
      });
    })
    .catch( error => next(error) );
});

router.get("/for-companies",
(request, response, next) => {
  return Post.list("for companies", false)
    .then(posts => {
      return response.render("post", {
        active: { active_for_companies: true },
        post: posts[0],
        footer: true
      });
    })
    .catch( error => next(error) );
});

router.get("/how-to",
(request, response, next) => {
  return Post.list("how to", false)
    .then(posts => {
      return response.render("post", {
        active: { active_how_to: true },
        post: posts[0] 
      });
    })
    .catch( error => next(error) );
});

router.get("/faq",
(request, response, next) => {
  return Post.list("faq", false)
    .then(posts => {
      return response.render("posts", {
        toc: true,
        title: "Frequently Asked Questions",
        active: { active_faq: true },
        showDate: false,
        showAuthor: false,
        posts: posts,
        footer: true
      });
    })
    .catch( error => next(error) );
});

router.get("/auditors",
(request, response, next) => {
  return Post.list("auditors", false)
    .then(posts => {
      return response.render("post", {
        active: { active_auditors: true },
        post: posts[0],
        footer: true
      });
    })
    .catch( error => next(error) );
});

router.get("/contact",
(request, response, next) => {
  return Post.list("contact", false)
    .then(posts => {
      return response.render("post", {
        active: { active_contact: true },
        post: posts[0]
      });
    })
    .catch( error => next(error) );
});

router.get("/blog",
(request, response, next) => {
  return Post.list("blog", false, false)
    .then(posts => {
      return response.render("blog", {
        title: "News and Updates",
        active: { active_blog: true },
        posts: posts
      });
    })
    .catch( error => next(error) );
});

router.get("/privacy-policy",
(request, response, next) => {
  return Post.list("privacy policy", false)
    .then(posts => {
      return response.render("post", {
        post: posts[0]
      });
    })
    .catch( error => next(error) );
});

router.get("/terms",
(request, response, next) => {
  return Post.list("terms", false)
    .then(posts => {
      return response.render("post", {
        post: posts[0]
      });
    })
    .catch( error => next(error) );
});

module.exports = router;