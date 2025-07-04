
const apiUrl="https://spring-boot-api-vx4c.onrender.com/api/users"
const params=new URLSearchParams(window.location.search);
const userId=params.get("id");
const form=document.getElementById("editForm");

const nameFld=document.getElementById("name");
const emailFld=document.getElementById("email");
const phoneFld=document.getElementById("phone");
const dobFld=document.getElementById("dob");
const roleFld=document.getElementById("role");
const idFld=document.getElementById("userId")

async function loadUsers(){
    try {
        const res=await fetch(`${apiUrl}/${userId}`);
        const user=await res.json();
        idFld.value=user.id;
        nameFld.value=user.name;
        emailFld.value=user.email;
        phoneFld.value=user.phone;
        dobFld.value=user.dob;
        roleFld.value=user.role;
    } catch (error) {
        alert("Failed to load user")
    }
}
form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const updatedUser={
        name:nameFld.value,
        email:emailFld.value,
        phone:phoneFld.value,
        dob:dobFld.value,
        role:roleFld.value
    };

    try {
        const res=await fetch(`${apiUrl}/${userId}`,{method:"PUT",
            headers:{"Content-Type":"application/json"},body:JSON.stringify(updatedUser)});
            if(res.ok){
                alert("user updated successfully!");
                window.location.href="index.html";
            }
            else{
                throw new Error(await res.text());
            }
    } catch (error) {
        alert("Update failed : "+error.message);
    }
});

window.onload=loadUsers;
