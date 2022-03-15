// Make global variable to edit entries
var selectedRow = null;

function onFormSubmit(){
    if(validate()){
        let formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
        } else {
            updateEntry(formData);
            selectedRow = null;
        }    
        resetForm();
    }
}

// Retrieve the data
function readFormData(){
    let formData = {};
    formData["plantName"] = document.getElementById("plantName").value;
    formData["growthCondition"] = document.getElementById("growthCondition").value;
    formData["maxHeight"] = document.getElementById("maxHeight").value;
    formData["imageUrl"] = document.getElementById("imageUrl").value;
    formData["infoUrl"] = document.getElementById("infoUrl").value;
    return formData;  // Returning form object
}

// Insert the data
function insertNewRecord(data){
    let table = document.getElementById("plantList").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.length);                     // Initially, length will be 0, upon insertion, it will increment by 1

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<a href="${data.infoUrl}" target="_blank" class="infoLink"><figure><img src="${data.imageUrl}" alt="" class="plantThumbPic"/></figure></a>`;
    cell2 = newRow.insertCell(1);                                   // Inside this row, we have to insert new cells 
    cell2.innerHTML = data.plantName;                               // Plant name is from the data parameter that was passed in.
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.growthCondition; 
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.maxHeight; 
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<i class="far fa-edit" onClick="onEdit(this)"></i>
                       <i class="far fa-trash-alt" onClick="onDelete(this)"></i>`; 
}

// Reset form
function resetForm (){
    document.getElementById("plantName").value = '';
    document.getElementById("growthCondition").value = '';
    document.getElementById("maxHeight").value = '';
    document.getElementById("imageUrl").value = '';
    document.getElementById("infoUrl").value = '';
}

// Edit entries, putting the recorded entry back into the input fields
function onEdit (td){
    selectedRow = td.parentElement.parentElement;
    selectedAnchor = selectedRow.querySelector('.infoLink').getAttribute("href");
    selectedImage = selectedRow.querySelector('.plantThumbPic').getAttribute("src");
    document.getElementById("plantName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("growthCondition").value = selectedRow.cells[2].innerHTML;
    document.getElementById("maxHeight").value = selectedRow.cells[3].innerHTML;
    if (selectedImage){
        document.getElementById("imageUrl").value = selectedImage;
    }
    if (selectedAnchor){
        document.getElementById("infoUrl").value = selectedAnchor;
    }    
}

// Update cells with new values from the readFormData function
function updateEntry(formData){
    console.log("In UpdateEntry function");
    console.log(selectedRow.cells[0].querySelector('.plantThumbPic').src);
    selectedRow.cells[1].innerHTML = formData.plantName;
    selectedRow.cells[2].innerHTML = formData.growthCondition;
    selectedRow.cells[3].innerHTML = formData.maxHeight;
    selectedRow.cells[0].querySelector('.plantThumbPic').src = formData.imageUrl;
    selectedRow.cells[0].querySelector('.infoLink').href = formData.infoUrl;
}

// Delete entry
function onDelete(td) {
    if(confirm('Are you sure you want to delete this entry?')){
        row = td.parentElement.parentElement;
        document.getElementById("plantList").deleteRow(row.rowIndex);
        resetForm();
    }
}

// Form Validation

function validate(){
    let isValid = true;
    let errorMessage = document.getElementById("nameValidationError");
    if (document.getElementById("plantName").value == ""){
        isValid = false;
        errorMessage.classList.remove("hide");
    } else {
        isValid = true;
        if (!errorMessage.classList.contains("hide")){
            errorMessage.classList.add("hide");
        }
    }
    return isValid;
}