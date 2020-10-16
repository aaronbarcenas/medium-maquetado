/*Modal*/
$('.openBtn').on('click',function(){
    $('.modal-body').load('content.html',function(){
        $('#myModal').modal({show:true});
    });
});
//guardar 
let allPost = []
const saveCharacters = () => {
    let name = $('#nombre').val()
    let reference = $('#referencia').val()
    let time = $('#tiempo').val()
    let description = $('#Descrip').val()
    let picture = $('#foto').val()
    let date = $('#fecha-E').val() 
    let header = $('#titulo').val()
    let category = $('category').val()
    let likes = parseInt(Math.random() * (3001 - 2900) + 2900)  //para los mas populares
    let share = parseInt(Math.random() * (3001 - 2900) + 2900)    //para los mas destacasdos
    let article = { name, reference, time, description, picture, date , header, category, likes, share }
    
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


const getPost = () => {
    $.ajax({
        url: `https://ajaxclass9g.firebaseio.com/koderRangers/medium/posts/.json`,
        method: "GET",
        async: false,
        success: (response) => {
            console.log(response)
            let posts = response;
            $('#lastArticle').empty()
            for (key in posts) { //creamos el contenido de cada variable
                console.log(posts[key])
                const post = {...posts[key], key}
            //    let { name, time ,description, picture, date,  header, category, likes, share } = articulo[llave]
                allPost.push(posts[key])
                
            }
            // obtiene un arreglo para ordenarlo por likes 
            let postsByLikes = allPost
            postsByLikes.sort(function(a, b){return b.likes - a.likes})
            console.log(postsByLikes)
            // toma los 4 post m as populares y los inserta en el html
            for (let i=0; i < 4; i++ ){
                
                $('#post-more-popular').append(`
                <li>
                    <div class="mini-container">
                        <h5 class="title-wrap-small">${postsByLikes[i].header}</h5>
                    </div>
                    <div class="mini-container mt-1">
                        <p class="card-footer-small"><a class="anchor-style"
                                href="https://medium.com/">${postsByLikes[i].name}</a> in <a class="anchor-style"
                                href="https://kodemia.mx/">${postsByLikes[i].reference}</a></p>
                        <p class="card-links-wrap-small"><a class="card-links" href="">${postsByLikes[i].date}</a> . <a class="card-links" href="">${postsByLikes[i].time}in read</a></p>
                    </div>
                </li>
                `)
            }


            // Funcion para imprimir los post con mas shares...
            let postsByShares = allPost
            postsByShares.sort(function(a, b){return b.share - a.share})
            console.log(postsByShares)

                $('#post-more-share').append(`
                    <div class="img-container"><img src="${postsByShares[0].picture}" alt=""></div>
                    <div class="card-wrapper">
                        <h2 class="title-wrap">${postsByShares[0].header}</h2>
                        <p class="card-article">${postsByShares[0].description}</p>
                        <p class="card-footer"><a class="anchor-style" href="https://medium.com/">${postsByShares[0].name}</a>
                            in <a class="anchor-style" href="https://kodemia.mx/">${postsByShares[0].reference}</a></p>
                        <p class="card-links-wrap"><a class="card-links" href="">${postsByShares[0].date}</a> - <a class="card-links"
                                href="">${postsByShares[0].time} min read</a></p>
                    </div>
                `)

                $(`#post-more-share2`).append(`
                    <div class="center-card pr-3 pl-3 d-flex flex-lg-row">
                    <div class="img-small"><img src="${postsByShares[1].picture}" alt=""></div>
                        <div class="smal-wrap d-flex flex-column">
                            <div class="mini-container">
                                <h5 class="title-wrap-small">${postsByShares[1].header}</h5>
                                <p class="card-article-small">${postsByShares[1].description}</p>
                            </div>
                            <div class="mini-container mt-1">
                                <p class="card-footer-small"><a class="anchor-style"
                                        href="https://medium.com/">${postsByShares[1].name}</a> in <a class="anchor-style"
                                        href="https://kodemia.mx/">${postsByShares[1].reference}</a></p>
                                <p class="card-links-wrap-small"><a class="card-links" href="">${postsByShares[1].date}</a> - <a class="card-links" href="">${postsByShares[1].time} min read</a></p>
                            </div>
                        </div>
                    </div>
                    
                <div class="center-card pr-3 pl-3 d-flex flex-lg-row">
                    <div class="img-small"><img src="${postsByShares[2].picture}" alt=""></div>
                    <div class="smal-wrap d-flex flex-column">
                        <div class="mini-container">
                            <h5 class="title-wrap-small">${postsByShares[2].header}</h5>
                            <p class="card-article-small">${postsByShares[2].description}</p>
                        </div>
                        <div class="mini-container mt-1">
                            <p class="card-footer-small"><a class="anchor-style"
                                    href="https://medium.com/">${postsByShares[2].name}</a></p>
                            <p class="card-links-wrap-small"><a class="card-links" href="">${postsByShares[2].date}</a> - <a class="card-links" href="">${postsByShares[2].time} min read</a></p>
                        </div>
                    </div>
                </div>
                <div class="center-card pr-3 pl-3 d-flex flex-lg-row">
                    <div class="img-small"><img src="${postsByShares[3].picture}" alt=""></div>
                    <div class="smal-wrap d-flex flex-column">
                        <div class="mini-container over">
                            <h5 class="title-wrap-small">${postsByShares[3].header}</h5>
                            <p class="card-article-small">${postsByShares[3].description}</p>
                        </div>
                        <div class="mini-container mt-1">
                            <p class="card-footer-small"><a class="anchor-style"
                                    href="https://medium.com/">${postsByShares[3].name}</a></p>
                            <p class="card-links-wrap-small"><a class="card-links" href="">${postsByShares[3].date}</a> - <a class="card-links" href="">${postsByShares[3].time} min read</a></p>
                        </div>
                    </div>
                </div>
                `)

                // Funcionpara imprimir el ultimo post, e recien agregado
                const printLastPost = () => {
                    let len = allPost.length
                    let lastPost = allPost[len - 1]
                    let { name, time ,description, picture, date, header } = lastPost
                    $('#lastArticle').append(`
                        <div class="img-container"><img src="${picture}" alt="image"></div>
                                <div class="card-wrapper">
                                    <h2 class="title-wrap">${header}</h2>
                                    <p class="card-footer"><a class="anchor-style" href="https://medium.com/">${description}</a></p>
                                    <p class="card-links-wrap"><a class="card-links" href="">${name}</a><br> <a class="card-links" href="#"> ${date}.${time}min read</a></p> 
                        </div>
                    `)
                }
                printLastPost()
                
                for(let i = 0; i < allPost.length-1; i++ ){
                    $(`#post`).append(`
                        <div class="row">
                            <div class="col-4" id="imagen">
                                <img src="${allPost[i].picture}" alt="">
                            </div>
                            <div class="col-8">
                                <h6>${allPost[i].header}</h6>
                                <p><a href="">${allPost[i].name}</a> in <a href="">${allPost[i].reference}</a></p>
                                    <div class="row ">
                                        <div class="col d-inline-flex">
                                            <p>${allPost[i].date}</p><p>.</p><p>${allPost[i].time} min read</p><img class="align-self-start justify-content-end" width="16px" src="img/more.svg" alt=""><!--No se recorre al final-->
                                        </div>
                                    </div>
                            </div>
                        </div>
                    `)
                }
                

            /*
            const getMostPostPopular = () => {
                let arrayLikes = []
                let postMostLiked = allPost.reduce((acc, post) => {
                    if(post.likes ) arrayLikes.push(post.likes)
                    if(post.likes === Math.max(...arrayLikes)) acc = post 
                    return acc
                }, {})
                return postMostLiked
                console.log(postMostLiked)
            }*/

                
                //con esto imprimimos todo lo que va dentro de la card
                // colocar el elemento mas destacado + shares
                /*
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
                
                `)*/
            
        },
    })
}
$("#button").click(saveCharacters)
$("#button").click(getPost)
getPost()
/*
    --filtrar por destacados(shares) y colocar el que contenga mas shares colocar en la primera parte del contenedor
    --filtrar los siguientes destacados(shares) 2,3,4 lugar y colocarlos en la segunda seccion.
    --filtrar por fecha de creacion y obtener el mas reciente para ponerla en lel tercer contenedor.
    --filtrar por popularidad(likes) y colocar los primeros 4 en la segunda seccion de la segunda parte de la pagina
    --adicional cada articulo creado sera categorizado y cada pestaña del menu principar filtrara y mostrara segun la categoria a la que corresponda...
    
*/