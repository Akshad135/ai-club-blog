require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./model/userSchema");
const blogPostRoutes = require("./routes/blogPostRoutes");
require("./db/conn");

const PORT = 6005;
const clientid = "72892787850-kucjsccujs9d8auhqknug3cpk4k0hg9e.apps.googleusercontent.com";
const clientsecret = "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";

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json()); // This middleware should come after cors middleware

// setup session
app.use(session({
    secret: process.env.SESSION_SECRET || "YOUR_SECRET_KEY",
    resave: false,
    saveUninitialized: true
}));

// setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userdb.findOne({ googleId: profile.id });

            if (!user) {
                user = new userdb({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });

                await user.save();
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Use blog post routes
app.use("/api", blogPostRoutes);

// Initial Google OAuth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login"
}));

app.get("/login/success", async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "user Login", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("http://localhost:3000");
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
