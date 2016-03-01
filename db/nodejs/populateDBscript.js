var jsonData = require('./data');
var OrientDB = require('orientjs');

var server = OrientDB({
    host: 'localhost',
    port: 2424,
    username: 'putiton',
    password: 'putiton99'
});

var db = server.use('putitontest');

var questions = jsonData.questions;
for(var i = 0; i < questions.length; i++){

    //Question
    var question = questions[i];
    db.query('INSERT INTO Question SET text = :textQuestion, questionCommentOnCorrectAnswer = :questionCommentOnCorrectAnswer,' +
        'questionCommentOnWrongAnswer = :questionCommentOnWrongAnswer',
        {
            params: {
                textQuestion: question.textQuestion,
                questionCommentOnCorrectAnswer: question.questionCommentOnCorrectAnswer,
                questionCommentOnWrongAnswer: question.questionCommentOnWrongAnswer
            }
        }
    ).then(function (response){
        console.log('insert question');
        //console.log(response);
    });

    db.query('create edge E from #13:0 to (select * from Question where text = :textQuestion )',
        {
            params: {
                textQuestion: question.textQuestion
            }
        }
    ).then(function (response){
        console.log('Bind question to Quiz');
        //console.log(response);
    });

    //Answers
    var answers = question.answers;
    for(var j = 0; j < answers.length; j++) {
        var answer = answers[j];

        db.query('INSERT INTO Answer SET text = :textAnswer',
            {
                params: {
                    textAnswer: answer.textAnswer
                }
            }
        ).then(function (response){
            console.log('insert Answer');
            //console.log(response);
        });

        db.query('create edge E from (select * from Question where text = :textQuestion ) ' +
            'to (select * from Answer where text = :textAnswer )',
            {
                params: {
                    textQuestion: question.textQuestion,
                    textAnswer: answer.textAnswer
                }
            }
        ).then(function (response){
            console.log('Bind Question to Answer');
            //console.log(response);
        });

        if(answer.isTrueAnswer){
            db.query('create edge isTrueAnswerFor from (select * from Answer where text = :textAnswer) ' +
                'to (select * from Question where text = :textQuestion )',
                {
                    params: {
                        textQuestion: question.textQuestion,
                        textAnswer: answer.textAnswer
                    }
                }
            ).then(function (response){
                console.log('Bind TRUE Answer to Question');
                //console.log(response);
            });

        }

    }
}



process.on('SIGTERM', function () {
    console.log("Closing");
    db.close();
});

//-----------------------------
console.log('end.');
