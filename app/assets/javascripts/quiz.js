var currentQuiz = null;
var userKey = (new Date()).toString()
var moreQuestions = false;

$.ajax({
  type: "GET",
  url: "quizzes.json"
})
  .done(function(data){
    $.each(data.quizzes, function(index, quiz){
      var newQuiz = $("#quiz").clone()
      newQuiz.show()
      newQuiz.html(quiz.name)
      newQuiz.on("click", function(e){
        $("#quiz").hide()
        currentQuiz = quiz.quiz_id
        beginQuiz();
      })
      $(".container").append(newQuiz)
    })

  });

var beginQuiz = function(){
  while (moreQuestions === false)
  {
    next()
  }
};



var next = function(){
  $.ajax({
    type: "GET",
    url: "quizzes/" + currentQuiz + "/questions/next.json",
    data: { session_key: userKey }
  })
  .done(function(data){
    debugger
    console.log(data);
  })
};