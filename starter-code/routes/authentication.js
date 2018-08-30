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
    res.send(result);
  });
});
router.get("/createpost", ensureLoggedIn("/login"), (req, res) => {
  res.render("../views/authentication/createpost.hbs", { user: req.user, userId: req.user._id});
});

router.post("/createpost", ensureLoggedIn("/login"), (req, res) => {
    const { content, picName, picPath} = req.body;
    // res.send(req.body)
    // console.log(req.user._id)
    new Posts({
        creatorId : req.user._id,
        creatorName: req.user.username,
        content,
        picName,
        picPath,
    }).save().then(data => {
        res.send(data)
    })

//   new Celeb({
//     name,
//     occupation,
//     catchPhrase
//   })
//     .save()
//     .then(data => {
//       res.render("show", { data, new: true });
//     });
// });
    // Posts.create(req.body, err => {
    //     if (err) {
    //         throw err
    //     }
    //     console.log(`Created a posts!`)
//   })
//   res.redirect('/posts')
})

module.exports = router;
