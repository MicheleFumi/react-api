# React + Vite

## Steps

- Install react (new project)
- Clean up the app.jsx component
- import the useState hook
- add a button to the page and hadle its click
- create a function to fetch data from the api
- call the fetchData function when the button is clicked
- use map to loop over the results

## Install react (new project)

```bash
npm create vite@latest
cd react-rick-morty
npm i
npm run dev
```

## Clean up the app.jsx component

```jsx


function App(){

return (

  <>

  </>
)
}


export default App
```

## Import the useState hook

```jsx
// App.jsx
import { useState } from 'react'

// ...
```

Adda state variable

```jsx


function App(){
 const [charactersData, setCharactersData] = useState({})

return ( 

  <>

  </>
)
}


export default App
```

## add a button to the page and hadle its click

```jsx

function App(){
const [charactersData, setCharactersData] = useState({})


  function handleClick(e) {
    // Fetch data here ...
  }

return ( 

  <>
  <button type='button' onClick={handleClick}>Fetch Characters</button>
  </>
  )
}



```

## create a function to fetch data from the api

```jsx

function fetchData(url = 'https://rickandmortyapi.com/api/character') {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setCharactersData(data)
      })

```

## call the fetchData function when the button is clicked

Use the function inside the button handler

```jsx
  function handleClick(e) {
    // Fetch data here ...
    fetchData()
  }

```

## use map to loop over the results

```jsx

 <section className='characters'>
  <div className="container">
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">

      {/* Loop over the results */}

      {
        charactersData.results ?

          charactersData.results.map(character => (

            <div className="col" key={character.id}>
              <div className="card">
                <img src={character.image} alt="" />
                <p>
                  {character.name}
                </p>
              </div>
            </div>

          )) :

          <p>No results yet</p>

      }


    </div>
  </div>

</section>
```