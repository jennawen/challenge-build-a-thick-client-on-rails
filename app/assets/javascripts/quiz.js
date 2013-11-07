var currentQuiz, currentQuestion;
var userKey = (new Date()).toString()

var startProgram = function(){
  $.ajax({
  type: "GET",
  url: "quizzes.json"
  })
  .done(function(data){
    console.log("get quizzes")
    $.each(data.quizzes, function(index, quiz){
      var newQuiz = $("#quiz").clone()
      newQuiz.text(quiz.name)
      $(".container").append(newQuiz)
      newQuiz.on("click", function(e){
        $(newQuiz).hide();
        currentQuiz = quiz.quiz_id
        next();
      })
    })
  });
}

var next = function(){
  $.ajax({
    type: "GET",
    url: "quizzes/" + currentQuiz + "/questions/next.json",
    data: { session_key: userKey }
  })
  .done(function(data){
    currentQuestion = data.question.question_id
    var newQuestion = $(".question:first").clone()
    newQuestion.html(data.question.question)
    newQuestion.show()
    $(".container").append(newQuestion)
    $.each(data.question.choices, function(index, choice){
      var newChoice = $("#choice").clone();
      newChoice.html(choice.choice)
      newQuestion.append(newChoice)
      newChoice.on("click", function(e){
        $(".question").hide()
        answer(choice.choice_id)
      })
    })
  })
};

var answer = function(choiceId){
  $.ajax({
    type: "POST",
    url: "questions/" + currentQuestion + "/answers.json",
    data: {session_key: userKey, choice_id: choiceId }
  })
  .done(function(data){
    if(data.status.more_questions === false){
      $(".question").hide()
      showResults(data.status);
    }
    else{
      next();
    }
  })
}

var showResults = function(data_results){
  $(".num_correct").text(data_results.num_correct)
  $(".num_incorrect").text(data_results.num_incorrect)
  $("#results").show()
}



  startProgram()