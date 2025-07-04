const apiUrl="https://spring-boot-api-vx4c.onrender.com/api/users";
const tbody=document.querySelector("#userTable tbody");
const form = document.getElementById('userForm');

const nameFld=document.getElementById("name");
const emailFld=document.getElementById("email");
const phoneFld=document.getElementById("phone");
const dobFld=document.getElementById("dob");
const roleFld=document.getElementById("role");


function renderRow(user){
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.dob}</td>
    <td>${user.role}</td>

    <td>
    <button class="edit-btn" onClick="editUser(${user.id})">Edit</button>
    <button class="delete-btn" onClick="deleteUser(${user.id})">Delete</button>
    </td>
    `;
    tbody.appendChild(row);
}

async function loadUsers(){
    try {
        const res=await fetch(apiUrl);
        const users=await res.json();
        tbody.innerHTML="";
        users.forEach(renderRow);
    } catch (error) {
        alert("Failed to load users.")
        console.log(error);
    }
}
async function addUser(user){
    try {
        const res=await fetch(apiUrl,{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user)
        });

        if(!res.ok) throw new Error("failed to add user");
        const newUser=await res.json();
        alert("User added");
        renderRow(newUser);
        form.reset();
    } catch (error) {
        alert("Server Error "+error.message);
        console.log(error);
    }
}
form.addEventListener("submit",function(e){
    e.preventDefault();

    if(!/^\d{10}$/.test(phoneFld.value.trim())){
      alert("Phone must be exactly 10 digits.");
      return;
    }

    const dobValue=new Date(dobFld.value);
    const now=new Date();
    if(dobValue>now){
        alert("DOB can't be in the future.");
        return;
    }

    const user={
        name:nameFld.value.trim(),
        email:emailFld.value.trim(),
        phone:phoneFld.value.trim(),
        dob:dobFld.value,
        role:roleFld.value
    };
    addUser(user);
});

async function deleteUser(id){
    if(!confirm("Delete this user?")) return;
    try {
        const res=await fetch(`${apiUrl}/${id}`,{method:"DELETE"});
        if(!res.ok) throw new Error("Deletion failed");
        loadUsers();
    } catch (error) {
        alert("Server error while deleting user",error.message);
        console.log(error);
    }
}
function editUser(id){
    window.location.href=`edit.html?id=${id}`;
}
window.onload=loadUsers;
