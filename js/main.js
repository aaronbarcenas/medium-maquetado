/*Modal*/
$('.openBtn').on('click',function(){
    $('.modal-body').load('content.html',function(){
        $('#myModal').modal({show:true});
    });
});
//guardar 
const saveCharacters = () => {
    let name = $('#nombre').val()
    let time = $('#tiempo').val()
    let description = $('#Descrip').val()
    let picture = $('#foto').val()
    let date = $('#fecha-E').val() 
    let header = $('#titulo').val()
    let category = $('category').val()
    let likes = parseInt(Math.random() * (101 - 10) + 10)
    let share = parseInt(Math.random() * (101 - 10) + 10)
    let article = { name, time, description, picture, date , header, category, likes, share }
    console.log(article)
    
    $.ajax({
        url: `https://ajaxclass9g.firebaseio.com/koderRangers/medium/posts/.json`,
        method: "POST",
        data: JSON.stringify(article),
        success: (response) => {
            console.log(response)
        },
        error: (error) => {
            console.log(error)
        }
    })
    
}

// Tercer contenedor primera parte el post mas reciente
const getCharacters = () => {
    $.ajax({
        url: `https://ajaxclass9g.firebaseio.com/koderRangers/medium/posts/.json`,
        method: "GET",
        success: (response) => {
            console.log(response)
            let articulo = response;
            $('#lastArticle').empty()
            for (llave in articulo) { //creamos el contenido de cada variable
                console.log(articulo[llave])
                let { name, time ,description, picture, date,  header, category, likes, share } = articulo[llave]
                
                //con esto imprimimos todo lo que va dentro de la card
                $('#lastArticle').append(`
                <div class="img-container"><img src="${picture}" alt="image"></div>
                                        <div class="card-wrapper">
                                            <h2 class="title-wrap">${header}</h2>
                                            <p class="card-article"></p>
                                            <p class="card-footer"><a class="anchor-style" href="https://medium.com/">${description}</a></p>
                                            <p class="card-links-wrap"><a class="card-links" href="">${name}</a> - <a class="card-links"
                                                    href="#"> ${date}.${time}</a></p>
                                                    <a href="#" class="card-link ml-5">SEE EDITOR’S PICKS ></a>
                                        </div>
                
                `)
            }
        },
    })
}
$("#button").click(saveCharacters)
//$("#button").click(getCharacters)
getCharacters()

/*
    --filtrar por destacados(shares) y colocar el que contenga mas shares colocar en la primera parte del contenedor
    --filtrar los siguientes destacados(shares) 2,3,4 lugar y colocarlos en la segunda seccion.
    --filtrar por fecha de creacion y obtener el mas reciente para ponerla en lel tercer contenedor.
    --filtrar por popularidad y colocar los primeros 4 en la segunda seccion de la segunda parte de la pagina
    --adicional cada articulo creado sera categorizado y cada pestaña del menu principar filtrara y mostrara segun la categoria a la que corresponda...
    
*/