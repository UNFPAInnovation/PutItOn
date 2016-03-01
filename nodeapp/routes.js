module.exports = function (superSecret, apiRoutes, db) {

    var jwt = require('jsonwebtoken');
    var crypto = require('crypto');
    var getHash = function (str) {
        return crypto.createHash("md5")
            .update(str)
            .digest('hex');
    };

    apiRoutes.post('/register', function (req, res) {
        if (!req.body.name || !req.body.password) {
            console.log(req.body);
            res.status(400);
            res.json({'message': 'Both name and password are required'});
            return;
        } else {
            var hash = getHash(req.body.password);
        }
        db.query('select from User where name=:name', {params: {name: req.body.name}, limit: 1})
            .then(function (results) {
                if (results.length === 0) {
                    db.query('insert into User set name = :name, password = :password',
                        {
                            params: {
                                name: req.body.name,
                                password: hash
                            }
                        }
                    ).then(function (response) {
                        res.json({'message': 'Success'});
                    });
                } else {
                    res.status(400);
                    res.json({'message': 'User name already taken'});
                }
            });
    });

    apiRoutes.post('/authenticate', function (req, res) {
        db.query('select from User where name=:name', {
            params: {
                name: req.body.name
            },
            limit: 1
        }).then(function (results) {
            if (results.length > 0 && results[0].password === getHash(req.body.password)) {
                var user = results[0];
                var token = jwt.sign({'userId': user['@rid']}, superSecret, {
                    expiresIn: 12 * 60 * 60
                });

                res.json({
                    success: true,
                    message: 'Success!',
                    token: token
                });
            } else {
                res.status(400);
                res.json({'message': 'Wrong credentials'});
            }
        });
    });

    apiRoutes.use(function (req, res, next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, superSecret, function (err, decoded) {
                if (err) {
                    res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    apiRoutes.get('/quiz', function (req, res) {
        db.select().from('Quiz').all()
            .then(function (quizes) {
                res.json(quizes);
            });
    });

    apiRoutes.get('/quiz/:id', function (req, response) {
        var quiz = null;
        db.query('select from Quiz where @rid=:id ', {params: {id: req.params.id}, limit: 1})
            .then(function (quizes) {
                if (quizes.length < 1) {
                    response.json({message: 'no quiz was found'});
                    return null;
                }
                quiz = quizes[0];
                return db.query('select expand( out() ) from Quiz where @rid=:id', {params: {id: req.params.id}});
            })
            .then(function (resultQuestions) {
                quiz.questions = resultQuestions;

                return Promise.map(quiz.questions, function(question) {
                    return db.query('select expand( out() ) from Question where @rid=:id', {params: {id: question['@rid']}})
                        .then(function (answers) {
                            question.answers = answers;
                            question.trueAnswer = answers.filter(function (obj) {
                                return obj.out_isTrueAnswerFor;
                            })[0];
                        });
                });
        }).then(function() {
            response.json(quiz);
        });

    });

    apiRoutes.post('/result', function (req, res) {
        var userId = req.decoded.userId;
        var questionId = req.body.questionId;
        var isTrue = req.body.isTrue;

        db.create('EDGE', 'Result').from(userId).to(questionId)
            .set({
                isCorrect: isTrue
            })
            .one()
            .then(function (edge) {
                console.log('created edge:', edge);
            });

        res.json({message: 'Success'});
    });

    apiRoutes.get('/userscore', function (req, res) {
        var userId = req.decoded.userId;

        db.query('select count(*) from Result where out = :id and isCorrect = true', {params: {id: userId}})
            .then(function (score) {
                console.log(score[0]);
                res.json({userscore : score[0].count});
            });
    });

    return apiRoutes;
};
