$(document).ready(function(){
    console.log("function is called initiallly");
    getStudentData();
    
})

function getStudentData(){

    let studentData=localStorage.getItem("student");
    studentData=JSON.parse(studentData);
    studentData.forEach(data => {
        insertNewRecord(data);
        
    });
    console.log(studentData);
}
function getPreviousData(){
    let studentData=localStorage.getItem("student");
    studentData=JSON.parse(studentData);
    return studentData;
}


var selectedRow=null;
function onFormSubmit(){
    event.preventDefault();
    var formdata=readFormData();

    if(selectedRow==null){
    insertNewRecord(formdata);
    saveDatatoLocalStorgae(formdata)
    }
    else{
        upadateRecord(formdata);
        updatingDataofLocalStorage(formdata);
    }


}

//savingData to local storgae
function saveDatatoLocalStorgae(formdata){
    let dataTobeSaved = [];
    let previousData = getPreviousData();
    if (previousData && previousData.length) {
      previousData.forEach((data) => {
        dataTobeSaved.push(data);
      });
    }
    dataTobeSaved.push(formdata);
    localStorage.setItem("student",JSON.stringify(dataTobeSaved));
    resetForm();
}


//updatingDatofLocalStorage

function updatingDataofLocalStorage(formdata){
    let dataTobeSaved = [];
      let previousData = getPreviousData();
      if (previousData && previousData.length) {
        previousData.forEach((data) => {
          dataTobeSaved.push(data);
        });
      }
    console.log(selectedRow.rowIndex);
      dataTobeSaved[selectedRow.rowIndex-1]=formdata;
      console.log("After updating");
      console.log(dataTobeSaved);
      localStorage.setItem("student", JSON.stringify(dataTobeSaved));
      resetForm();
  }


//retriving Data
 function readFormData(){
     var formData={};
     formData["fullname"] = document.getElementById("fullname").value;
     formData["roll"] = document.getElementById("roll").value;
     formData["dept"] = document.getElementById("dept").value;
     formData["series"] = document.getElementById("series").value ;
     return formData;
  }


  //InsertData

    function insertNewRecord(formdata){
        var table= document.getElementById("studentlist").getElementsByTagName('tbody')[0];
        var newRow= table.insertRow(table.length);
        var cell1=newRow.insertCell(0);
        cell1.innerHTML=formdata.fullname;
        var cell2=newRow.insertCell(1);
        cell2.innerHTML=formdata.roll;
        var cell3=newRow.insertCell(2);
        cell3.innerHTML=formdata.dept;
        var cell4=newRow.insertCell(3);
        cell4.innerHTML=formdata.series;
        var cell5=newRow.insertCell(4);
        cell5.innerHTML='<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>'
    
    
    }

    //Edit the data

    function onEdit(td){
        selectedRow=td.parentElement.parentElement;
        document.getElementById('fullname').value=selectedRow.cells[0].innerHTML;
        document.getElementById('roll').value=selectedRow.cells[1].innerHTML;
        document.getElementById('dept').value=selectedRow.cells[2].innerHTML;
        document.getElementById('series').value=selectedRow.cells[3].innerHTML;
    }
//updating html Record
    function upadateRecord(formData){
        selectedRow.cells[0].innerHTML=formData.fullname;
        selectedRow.cells[1].innerHTML=formData.roll;
        selectedRow.cells[2].innerHTML=formData.dept;
        selectedRow.cells[3].innerHTML=formData.series;

     }

    //Delete the data

     function onDelete(td){
         if (confirm('Do you want to delete this record')){
             row=td.parentElement.parentElement;

             let dataTobeSaved=[];
             let previousData=getPreviousData();
              previousData.forEach((data) => {
              dataTobeSaved.push(data);
            });

             var removed=dataTobeSaved.splice(row.rowIndex-1,1);

             console.log("Removed Data");
             console.log(removed);

             localStorage.setItem("student",JSON.stringify(dataTobeSaved));
             document.getElementById('studentlist').deleteRow(row.rowIndex);
         }
         resetForm();

     }

     //reset the data

     function resetForm(){
         document.getElementById('fullname').value= ''; 
         document.getElementById('roll').value= ''; 
         document.getElementById('dept').value= ''; 
         document.getElementById('series').value= ''; 
     }