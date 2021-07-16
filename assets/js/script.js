
$(".time-block").on("click", "p", function() {
    var text = $(this)
      .text()
      .trim();
      console.log(text);
    var textInput = $("<textarea>")
      .addClass('form-control')
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
      .addClass('m-1')
      .text(text);
    
    // replace text area with p element
     $(this).replaceWith(taskP);
  })

let auditTask = function(taskEl) {
    dt = luxon.DateTime.now();

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

setInterval(function(){
    $(".hour").each(function(index, el){
      auditTask(el)
    });
  }, 5000)