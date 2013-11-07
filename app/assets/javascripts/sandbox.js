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
    $('.container').on('click', '.quiz', this.getNextQuestion.bind(this))
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

  getNextQuestion: function(event){
    $(".quiz").hide();
    console.log(event);
    $.ajax({
      type: "GET",
      url: "quizzes/1/questions/next.json",
      data: { session_key: 12324 }
    })
      .done (function(questionData){
        var $renderedQuestion = Views.questionView(questionData)
        $(".container").append($renderedQuestion)
      })

  },

  postAnswer: function(data){
    console.log(data)
  }
}


// SET UP CONTROLLERS


// SET UP VIEWS
var Views = {
  quiz: function(quiz){
    var newQuiz = $(".quiz").clone();
    return newQuiz.text(quiz.name)
  },

  questionView: function(questionData){
    var newQuestion = $("#question").clone();
    console.log(questionData.question.question)
    return newQuestion.text(questionData.question.question)
  }
}


// SET UP DOCUMENT READ
$(document).ready(Controller.initialize.bind(Controller));

