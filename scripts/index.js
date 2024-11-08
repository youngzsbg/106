let isFormVisible = true;


function toggleVisibility(){
    console.log("Hide")
    if(isFormVisible==true){
        $("#form").addClass("hide-form"); 
        isFormVisible = false;
    }else{
        $("#form").removeClass("hide-form");
        isFormVisible = true;
    }


}
let isImportant =  true;

function toggleImportance(){
    console.log("icon clicked")
    if(isImportant==true){
        $("#iImportant").removeClass("fas fa-thumbs-up").addClass("far fa-thumbs-up");
        isImportant = false;
    }else{
        $("#iImportant").removeClass("far fa-thumbs-up").addClass("fas fa-thumbs-up");
        isImportant = true
    }
}

function saveTask(){
     console.log("save task fn")
   // get the values
   const title = $("#txtTitle").val();
   const desc = $("#txtDescription").val();
   const color = $("#selColor").val();
   const date = $("#selDate").val();
   const status = $("#selStatus").val();
   const budget = $("#numBudget").val();

   let taskToSave = new Task(isImportant, title, desc, color, date, status, budget);
    console.log(taskToSave)

    //displayTask(taskToSave);

    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskToSave),
        contentType:"application/json",
        success: function(response){
            console.log(response);
        },
        error: function(error)
        {
            console.log(error);
        }
    })
}

function loadTask(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            let data = JSON.parse(response); //convert from JSON into objects
            console.log(data);
            //create logic to render ony the messages that match with your name
            for(let i=0; i< data.length;i++)
                {
                    let task= data[i];
                    if(task.name== "Kendall")
                    {
                        console.log(task);
                        displayTask(task)
                    }
                } 
        },
        error: function(error){
            console.log(error)
        }
    })
}

function displayTask(taskToSave){
    let icon = taskToSave.important ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'
    let syntax = `
    <div class="task-container" style="border-color:${taskToSave.color}">
        <i class="${icon} icon-important "></i>

        <div class="task">
            <div class="info">
                <h5>${taskToSave.title}</h5>
                <p>${taskToSave.description}</p>
            </div>

            <div class="status">${taskToSave.status}</div>

            <div class= "date-budget">
                <span>${taskToSave.date}</span>
                <span>${taskToSave.budget}</span>
            </div>
        </div>
    </div>

    `
    $("#list").append(syntax)
}

function testRequest(){
    $.ajax({
        type: "GET",
        url:"http://fsdiapi.azurewebsites.net",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
}

function deleteTask(){
    console.log("deleting task")
    remove()
}


function init(){
    console.log("init");
    $("#btnSave").click(saveTask);
    loadTask();
    $("#iImportant").click(toggleImportance)
}
window.onload = init; 