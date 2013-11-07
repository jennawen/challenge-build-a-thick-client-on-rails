/*// A: page loads (getQuizzes)
//  - ajax call to get quizzes
//  - display them
// B: click on a quiz (getNextQuestion)
//   - ajax call to get the next question
//   - display it
// C: click on an answer (submitAnswer)
//   - ajax call to submit answer and get status
//   - tell the user wrong or right
//   - trigger handler (B)

var Controller = {
  initialize: function(e) {
    // set up the rest of my event handlers (using jQuery .on())
    $('.content').on('click', '.quiz', this.getNextQuestion.bind(this))
    $('.content').on('click', '.question-choice', this.submitAnswer)
    // get quizzes
    this.getQuizzes()
  },

  getQuizzes: function() {
    // ajax to get quizzes
    $.ajax({
      url: "/quizzes.json"
    }).done(function(data) {
      for (var i in data.quizzes) {
        var $renderedQuiz = Views.quiz(data.quizzes[i]);
        Views.append($renderedQuiz);
      }
    })
  },

  doSomething: function() {
    console.log("it worked!")
  },

  getNextQuestion: function() {
    // ajax to get the next question
    // a: Controller
    // b: .content div element
    // c: .quiz element
    this.doSomething()
    console.log("this=", this)
    console.log('getNextQuestion')
  },

  submitAnswer: function() {
    // ajax to submit answer
    console.log('submitAnswer')
  }
}


var Views = {
  append: function($view) {
    $('.content').append($view);
  },

  quiz: function(quiz) {
    return $('.quiz').clone().html(quiz.name);
  }
}



$(document).ready(Controller.initialize.bind(Controller));*/