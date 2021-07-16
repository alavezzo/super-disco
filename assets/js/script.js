let now = luxon.DateTime.now()
let today = now.toISODate();
let calendar = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATE_FULL)
tasks = []

localStorage.setItem('today', JSON.stringify(today))

let todaysDate = function () {
    $("#currentDay").text(calendar)
}

let loadTasks = function() {
    if (today !== JSON.parse(localStorage.getItem('today'))) {
        tasks = [];
    }
    else if (JSON.parse(localStorage.getItem('tasks'))===null){ 
        tasks = [];
    } 
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
        $(".description").each(function(index, el){
            $(this).text(tasks[index])
        })
    }
}

let warnings = function() {
        $(".hour").each(function(index, el){
            auditTask(el);
        })
}

$(".time-block").on("click", "p", function() {
    var text = $(this)
      .text()
      .trim();
    var textInput = $("<textarea>")
      .addClass('description')
      .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger('focus');
  });

$('.time-block').on('blur', 'textarea', function(){
    // get the textarea's current value/text
    var text = $(this)
      .val()
      .trim();
  
    // get the parent ul's id attribute
    // var status = $(this)
    //   .closest('.time-block')
    //   .attr('id')
    //   .replace('list-', '');
  
    // get the task's position in the list of other li elements
    // var index = $(this)
    //   .closest('.time-block-item')
    //   .index();
    
    // tasks[status][index].text = text;
    // saveTasks();
  
    // recreate p element
    var taskP =$('<p>')
      .addClass('description')
      .text(text);
    
    // replace text area with p element
     $(this).replaceWith(taskP);

     saveTasks()

  })

let saveTasks = function() {
    tasks = []
    $(".description").each(function(index, el){
        text = $(this).text().trim()
        tasks.push(text)
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
  

let auditTask = function(taskEl) {
    dt = luxon.DateTime.now();
    todaysDate();

    if (taskEl.getAttribute('hour') < dt.hour) {
        taskTextBoxEl = $('.time-block')
        $(taskTextBoxEl).addClass('past') 
    } else if (taskEl.getAttribute('hour') === dt.hour) { 
        taskTextBoxEl = $('.time-block')
        $(taskTextBoxEl).addClass('present') 
    } else if (taskEl.getAttribute('hour') > dt.hour) { 
    taskTextBoxEl = $('.time-block')
    $(taskTextBoxEl).addClass('future') 
}
}

todaysDate();
loadTasks();
warnings();

setInterval(function(){
    $(".hour").each(function(index, el){
      auditTask(el)
    });
  }, ((1000*60)*30))