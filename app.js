const btnCargar = document.getElementById("btnCargar")
btnCargar.addEventListener("click",()=>{
   fetch('https://jsonplaceholder.typicode.com/users')
   .then(response => response.json())
   .then(json => {
   let info = "";
   for (let i=0;i<json.length;i++){
     info += `<option value = '${json[i].id}'> ${json[i].name} </option>`
   }
   const datos = document.getElementById("users")
   datos.innerHTML=info;
  })
})

const btnDatos = document.getElementById("btnDatos");
btnDatos.addEventListener("click",()=>{
  const datosautor = document.getElementById("datosAutor");
  let id = document.getElementById("users").value;
  fetch('https://jsonplaceholder.typicode.com/users/'+id)
  .then((response) => response.json())
  .then((json) => {
    let datos = '';
    datos = `<div id="datosUsuario"  class="colortitulos">
    <p>Nombre: ${json.name}</p>
    <p>Usuario: ${json.username}</p>
    <p>Email: ${json.email}</p>
    <p>Domicilio: ${json.address.street}</p>
    <p>Telefono: ${json.phone}</p>
    <button onclick="CerrarDatos()" class="botones">Eliminar</button>
    </div>`;
    datosautor.innerHTML = datos;
  });
});

function CerrarDatos(){
  let cerrar = document.getElementById("datosAutor");
  cerrar.innerHTML = ""
}

const menu = document.getElementById("users")
menu.addEventListener("change",()=>{
  const divdatos = document.getElementById("posts")
  let id = document.getElementById("users").value
  fetch("https://jsonplaceholder.typicode.com/posts?userId="+id)
  .then((response) => response.json())
  .then((json) => {
    let datos = "";
    for (let i=0;i<json.length;i++){
      let a=i+1;
      datos = `<div>
      <h3>ID: ${a}</h3>
      <h3 class="titulos">Titulo: ${json[i].title}</h3>
      <h3>Cuerpo:</h3>
      <p class="cuerpo">${json[i].body}</p>
      <button onclick="Comentarios(${json[i].id})" class="botones">Ver Comentarios</button>
      <div id="comment${json[i].id}"></div> 
      </div>`
      divdatos.innerHTML = datos;
    }    
  })
})

function Comentarios(postid){
  let comentarios = document.getElementById("comment"+postid)
  fetch("https://jsonplaceholder.typicode.com/comments?postId="+postid)
  .then((response) => response.json())
  .then((json) => {
    let comentario = "<button onclick='CerrarComentarios("+postid+")' class=botones>Cerrar Comentarios</button>"
    for (let i=0; i<json.length;i++){
      let a=i+1;
      comentario += `<div class="comentarios"><hr>
      <h3 class="titulos">Comentario ${a}</h3>
      <h3>Nombre: ${json[i].name}</h3> 
      <h4>Email: ${json[i].email}</h4>
      <p class="comentarios">Cuerpo: ${json[i].body}</p>
      </div>`
      } 
       comentarios.innerHTML = comentario;
  })
}

function CerrarComentarios(){
  let cerrar = document.getElementById("comment"+postid);
  cerrar.innerHTML = ""
}