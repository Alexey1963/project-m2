const btnUppend = document.querySelector('.button');
let windowLine = document.querySelectorAll('.line');
const btnSort = document.querySelector('.sortBtn');
const btnDelete = document.querySelector('.deleteBtn');

class Note {
    constructor(recipeId, recipe) {
        this.recipeId = recipeId;
        this.recipe = recipe;
    }
}

class NoteList {
    constructor() {
        this.recipes = [];
    }

    addRecipe(id, input) {

        this.recipes.push(new Note(id, input));

    }

    removeRecipe(id) {

        let index = this.recipes.findIndex((x) => x.recipeId === id);
        this.recipes.splice(index, index++);
    }
}

function convertId(x) {
    return +x.replace('_', '');
}

function sortById(arr) {
    arr.sort((a, b) => {
        let aa = convertId(a.recipeId);
        let bb = convertId(b.recipeId);
        if (aa > bb) {
            return 1;
        } else if (aa < bb) {
            return -1;
        }
        return 0;
    });
    // console.log(arr);
    return arr;
};

function reDraw(arr) {
    for (i = 0; i < arr.length; i++) {

        windowLine[i].firstElementChild.value = `${convertId(arr[i].recipeId)} ${arr[i].recipe}`;
        console.log(windowLine[i])
    }
    
}
function removeLine(e) {

    noteList.removeRecipe(e.currentTarget.parentElement.id);
    e.currentTarget.parentElement.remove();
}

function createNewLine(id) {

    let newDiv = document.createElement('div');
    newDiv.classList.add('line');
    newDiv.id = `_${+id.replace('_','') + 1}`;

    let newInput = document.createElement('input');
    newInput.classList.add('input');
    newInput.name = 'name0';
    newInput.type = 'text';
    newDiv.append(newInput);

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('deleteBtn');
    btnDelete.type = 'button';
    newDiv.append(btnDelete);

    windowForm = document.querySelector('.formWindow');
    windowForm.append(newDiv);

    // newDiv.addEventListener('mousedown', dragAndDropHandler);
    // newDiv.addEventListener('mousemove', dragAndDropHandler);
    // newDiv.addEventListener('mouseup', dragAndDropHandler);

    btnDelete.addEventListener('click', removeLine);

    let currentDiv = newDiv.previousElementSibling;
    noteList.addRecipe(currentDiv.id, currentDiv.firstElementChild.value);
    
}



function eventHandler(e) {
    
    console.log(e.currentTarget);
    windowLine = document.querySelectorAll('.line');
    
    switch(e.currentTarget) {
        
        case btnUppend:
            
            createNewLine(windowLine[windowLine.length - 1].id);
            
            console.log(noteList);

        break;

        case btnSort:

            let arrForSort = [];
            for (i = 0; i < noteList.recipes.length; i++) {
                    arrForSort.push(noteList.recipes[i]);

            }
            
            console.log(arrForSort);

            
            if(btnSort.classList.contains('reverse')) {
                
                reDraw(sortById(arrForSort).reverse());

            } else {
                
                reDraw(sortById(arrForSort));
            }
            
            btnSort.classList.toggle('reverse');
    }
}

    
    
const noteList = new NoteList;

btnSort.onmouseout = function() {
    btnSort.classList.toggle('over');
}
btnSort.onmouseover = function() {
    btnSort.classList.add('over');
}

btnUppend.addEventListener('click', eventHandler);

btnDelete.addEventListener('click', removeLine);

btnSort.addEventListener('click', eventHandler);


