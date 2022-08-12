document.querySelector("#enviar").addEventListener("click",async()=>{
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    const object = JSON.stringify({email,password});console.log(object)

    const respuesta = await fetch("user/ingresar",{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body:object
    });
    console.log(respuesta)
    const data = await respuesta.json();
    console.log(data)
})