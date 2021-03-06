const movies = [
  {imdbID:1,Title:"Batman",Year:2017,Poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BYzc4ODgyZmYtMGFkZC00NGQyLWJiMDItMmFmNjJiZjcxYzVmXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_UX182_CR0,0,182,268_AL_.jpg"},
  {imdbID:2,Title:"Iron Man",Year:2017,Poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTkzMjEzMjY1M15BMl5BanBnXkFtZTcwNTMxOTYyOQ@@._V1_UY268_CR3,0,182,268_AL_.jpg"},
  {imdbID:3,Title:"Super Man",Year:2017,Poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMTU3NzA5MjI0Nl5BMl5BanBnXkFtZTcwMTEwNzMzMQ@@._V1_UX182_CR0,0,182,268_AL_.jpg"},
  {imdbID:4,Title:"Wonder Woman",Year:2017,Poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX182_CR0,0,182,268_AL_.jpg"},
  {imdbID:5,Title:"Spider Man",Year:2017,Poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_UX182_CR0,0,182,268_AL_.jpg"},
  {imdbID:6,Title:"Deadpool",Year:2016,Poster:"https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyODg5Njc4N15BMl5BanBnXkFtZTgwMzExMjE3NzE@._V1_UY268_CR1,0,182,268_AL_.jpg"}
]

const URL = "https://www.omdbapi.com/"
const API_KEY = "2e2ca7ac"

const fetchData = (value) =>{
  return fetch(`${URL}?apikey=${API_KEY}&s=${value.toLowerCase()}&page=1`)
  .then((result)=>{
    return result.json()
  })
}

const fetchDataById = (id) =>{
  return fetch(`${URL}?apikey=${API_KEY}&i=${id.toLowerCase()}`)
  .then((result)=>{
    return result.json()
  })
}

const setEventsListeners = () => {
  document.querySelector("#formulario")
  .addEventListener("submit",search,false)
}

const search = (event) => {
  event.preventDefault()
  const value = event.target.search.value
  const content = document.querySelector(".content")
  content.innerHTML = ""
  if(value.trim() !== ''){
    const loading = document.querySelector(".loading")
    loading.classList.add("loading-show")
    // movies.filter((movie)=>{
    //   return movie.Title.toLowerCase().includes(value.toLowerCase())
    // }).forEach((result)=>{
    //   content.appendChild(card(result))
    // })
    setTimeout( () => {
      fetchData(value)
      .then(data => {
        if(data.Search){
          data.Search.forEach(movie => content.appendChild(card(movie)))
          const cards = document.getElementsByClassName("card")
          Array.from(cards).forEach((card)=>{
            card.onclick = event => {
              fetchDataById(card.id).then(result => modal(result))
            }
          })
        }
        loading.classList.remove("loading-show")
      })
    },1000)
  }else{
    movies.forEach((movie)=>{
      content.appendChild(card(movie))
    })
  }
}


const card = (movie) => {
  const card = document.createElement("div")
  card.setAttribute("class","card")
  card.setAttribute("id",movie.imdbID)
  card.setAttribute("onclick",()=>console.log("click"))

  const content = document.createElement("div")
  content.setAttribute("class","card-content")

  const imagen = document.createElement("img")
  imagen.setAttribute("src",movie.Poster)

  const name = document.createElement("h3")
  name.setAttribute("class","title-movie")
  name.innerHTML = movie.Title

  const year = document.createElement("label")
  year.innerHTML = `Year: ${movie.Year}`

  content.appendChild(name)
  content.appendChild(year)

  card.appendChild(imagen)
  card.appendChild(content)

  return card
}

const modal = (movie) => {
  const modal = document.getElementsByClassName("modal")[0]
  modal.innerHTML = ""
  modal.onclick = (event) => {
    modal.classList.remove("modal-show")
  }

  const modalFrame = document.createElement("div")
  modalFrame.classList.add("modal-frame")
  modal.appendChild(modalFrame)

  const image = document.createElement("img")
  image.setAttribute("src",movie.Poster)
  image.style.height = "200px"
  modalFrame.appendChild(image)

  const modalContent = document.createElement("div")

  const title = document.createElement("h2")
  title.innerHTML = movie.Title
  modalContent.appendChild(title)

  const plot = document.createElement("p")
  plot.innerHTML = movie.Plot
  modalContent.appendChild(plot)

  modalFrame.appendChild(modalContent)



  modal.classList.add("modal-show")
}

const main = () =>{
  setEventsListeners()
  const content = document.querySelector(".content")
  movies.forEach((movie)=>{
    content.appendChild(card(movie))
  })
}

main()
