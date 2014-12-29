module.exports = function(app, passport, Post) {

    // Home page
    app.get('/', function(req, res) {
        res.render('index.ejs'), { message: req.flash('loginMessage') };// load the index.ejs file
    });

    // check if user is logged in to display dashboard
    app.get('/posts', isLoggedIn, function(req, res) {
        res.render('posts.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/posts',
            failureRedirect : '/'
        }));

    // logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/posts', function(req, res) {
        Post.find(function(err, posts) {
            if(err) res.send(err);
            res.json(posts);
        });
    });

    app.post('/api/posts', function(req, res) {
        Post.create({
            name : req.user.facebook.name,
            destination: req.body.destination,
            date: req.body.date,
            comments: req.body.comments,
            done: false
        }, function(err, post) {
            if(err) res.send(err);

            Post.find(function(err, posts) {
                if(err) res.send(err);
                res.json(posts);
            });
        });
    });

    app.delete('/api/posts/:post_id', function(req, res) {
        Post.remove({
            _id : req.params.post_id
        }, function(err, post) {
            if(err) res.send(err);

            Post.find(function(err, posts) {
                if(err) res.send(err);
                res.json(posts);
            });
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}