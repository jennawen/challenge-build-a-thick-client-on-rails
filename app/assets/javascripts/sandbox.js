// Page loads
// - AJAX request to get quizzes
// - Display quizzes based on ajax response (json object)

// User clicks on quiz name
// - AJAX request to GET next questions
// - In request data send: session_key
// - Display first question based on ajax response (json object)

// User clicks on an answer
// - AJAX request to POST answer
// - In request data send: session_key and choice_id

// Create an object literal
var Controller = {
  // initialize with your event listeners and your quizzes
  initialize: function(e) {
    $('.container').on('click', '#quiz', this.getNextQuestion.bind(this))
    $('.container').on('click', '#choice', this.postAnswer.bind(this))
    this.getQuizzes()
  },

  getQuizzes: function(){
    console.log("Get quizzes")
    $.ajax({
      type: "GET",
      url: "quizzes.json"
    })
      .done (function(data){
        $.each ( data.quizzes, function (index, quiz){
          var $renderedQuiz = Views.quiz(quiz)
          $(".container").append($renderedQuiz)
        })
      })
  },

  getNextQuestion: function(data){
    console.log(data)
    console.log(data.firstchild)
  },

  postAnswer: function(data){
    console.log(data)
  }
}


// SET UP CONTROLLERS


// SET UP VIEWS
var Views = {

  quiz: function(quiz){
    var newQuiz = $("#quiz").clone()
    return newQuiz.text(quiz.name)
  }
}


// SET UP DOCUMENT READ
$(document).ready(Controller.initialize.bind(Controller));

