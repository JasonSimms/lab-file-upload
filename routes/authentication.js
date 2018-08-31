const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Posts = require("../models/posts");

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  ensureLoggedOut(),
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

// ALL ABOUT POSTS --------------------------------------------------
router.get("/posts", (req, res) => {
  Posts.find({}).then(result => {
    // res.send(result);
    res.render('posts', {result})
    // res.render("movielist", { data, title: "List of freaking movies" })
  });
});
router.get("/createpost", ensureLoggedIn("/login"), (req, res) => {
  res.render("../views/authentication/createpost.hbs", {
    user: req.user,
    userId: req.user._id
  });
});

router.post("/createpost", ensureLoggedIn("/login"), (req, res) => {
  const { content, picName } = req.body;
  // res.send(req.files.picPath.name)
  console.log(req.user._id);
  if (req.files.picPath) req.files.picPath.mv(`./public/images/postpics/${req.files.picPath.name}`);
  new Posts({
    creatorId: req.user._id,
    creatorName: req.user.username,
    content,
    picName,
    picPath: `/images/postpics/${req.files.picPath.name}`
  })
    .save()
    .then(data => {
      // res.send(data)
      res.render("newpost", { data });
    });
});

module.exports = router;
