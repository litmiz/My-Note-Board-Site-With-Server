// Note class
class Note {
    constructor(id, name, date, time) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;
    }
}

// Event listeners:
document.getElementById("addBtn").addEventListener("click", function () {
    addNote(document.getElementById("noteText").value, document.getElementById("noteDate").value, document.getElementById("noteTime").value);
});

document.getElementById("seaBtn").addEventListener("click", function () {
    searchText = document.getElementById("searchText");
    if (searchText.value === '') {
        notes2 = notes;
    }
    else {
        notes2 = notes.filter(function (search) {
            if (search.name === searchText.value) {
                return search;
            }
        });
    }
    notesSection = document.getElementById("notesSection");
    notesSection.innerHTML = '';
    notes2.forEach(function (note) {
        addNoteToDom(note);
    });
});

// Notes operations
function addNote(name, date, time) {
    id = 1 + parseInt(localStorage.getItem("lastId"));
    localStorage.setItem("lastId", id);
    const note = new Note(id, name, date, time);
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    addNoteToDom(note);
}

function removeNote(note) {
    notes = notes.filter(function (search) {
        if (search.id !== note.id) {
            return search;
        }
    });

    /* Another option:
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === note.id) {
            index = i;
        }
    }
    notes.splice(index , 1);
    */
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNoteToDom(note) {
    const notesSection = document.getElementById("notesSection");
    const fullNote = document.createElement("div");
    fullNote.classList.add("fullNote");
    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.type = "button";
    delBtn.textContent = "X";
    const noteInside = document.createElement("section");
    noteInside.classList.add("noteInside");
    const noteHeader = document.createElement("p");
    noteHeader.classList.add("noteInside");
    const noteDesDate = document.createElement("p");
    noteDesDate.classList.add("noteInside");
    const noteDesTime = document.createElement("p");
    noteDesTime.classList.add("noteInside");

    notesSection.append(fullNote);
    fullNote.appendChild(delBtn);
    fullNote.appendChild(noteInside);
    noteInside.appendChild(noteHeader);
    noteInside.appendChild(noteDesDate);
    noteInside.appendChild(noteDesTime);

    noteHeader.textContent = note.name;
    noteDesDate.textContent = note.date;
    noteDesTime.textContent = note.time;

    delBtn.addEventListener("click", function () {
        removeNote(note);
        fullNote.remove();
    });
}

// Load notes from local storage
const notesJson = localStorage.getItem("notes");
notes = [];
if (notesJson !== null) {
    notes = JSON.parse(notesJson);
}

if (localStorage.getItem("lastId") === null) {
    localStorage.setItem("lastId", '0');
}

notes.forEach(function (note) {
    addNoteToDom(note);
});
