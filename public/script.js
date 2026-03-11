const API = "http://localhost:3000/users";

let editId = null;

async function addUser(){

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if(!name || !email){
        alert("Enter name and email");
        return;
    }

    if(editId){

        await fetch(API + "/" + editId,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,email})
        });

        cancelEdit();

    } else {

        await fetch(API,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,email})
        });

    }

    document.getElementById("name").value="";
    document.getElementById("email").value="";

    loadUsers();
}

function editUser(id,name,email){

    document.getElementById("name").value=name;
    document.getElementById("email").value=email;

    editId=id;

    document.getElementById("submitBtn").innerText="Update User";
    document.getElementById("cancelBtn").style.display="inline";

    document.getElementById("formBox").classList.add("editing");
    loadUsers();
}

function cancelEdit(){

    editId=null;

    document.getElementById("name").value="";
    document.getElementById("email").value="";

    document.getElementById("submitBtn").innerText="Add User";
    document.getElementById("cancelBtn").style.display="none";

    document.getElementById("formBox").classList.remove("editing");
}

async function deleteUser(id){

    await fetch(API + "/" + id,{
        method:"DELETE"
    });

    loadUsers();
}

async function loadUsers(){

    const res = await fetch(API);
    const users = await res.json();

    const list = document.getElementById("users");
    list.innerHTML="";

    users.forEach(user=>{

        const li = document.createElement("li");

        li.innerHTML=`
        ${user.name} (${user.email})
        <div>
        <button id="editBtn" onclick="editUser('${user._id}','${user.name}','${user.email}')">Edit</button>
        <button id="deleteBtn" onclick="deleteUser('${user._id}')">Delete</button>
        </div>
        `;

        list.appendChild(li);

    });

}

loadUsers();