import { useState, useEffect } from 'react'
import titleArray from '../Data/db.jsx'
const initialFormData =
{
    title: '',
    platforms: '',
    author: '',
    published: false
}

const url = 'http://localhost:3000'
const endpoint = '/post/'

export default function AppMain() {

    const [titles, setTitles] = useState(titleArray)
    const [formData, setFormData] = useState(initialFormData)
    const [blogDataApi, setBlogDataApi] = useState({})

    function fetchData() {
        fetch(`${url}${endpoint}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);

                setBlogDataApi(data)
            }
            )
    }
    useEffect(fetchData, [])






    function handleFormSubmit(e) {
        e.preventDefault()

        const newTitle = {
            id: Date.now(),
            ...formData
        }
        setTitles([...titles, newTitle])
        setFormData(initialFormData);

    }

    function handleRemoveTitle(e) {
        e.preventDefault()

        const titleToRemove = e.target.getAttribute('data-id')
        console.log(titleToRemove);


        fetch(`${url}${endpoint}${titleToRemove}`, {
            method: 'DELETE',
            headers: {
                'content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);

            })
        setBlogDataApi((prevState) => {
            return {
                ...prevState,
                data: prevState.data.filter((post) => post.slug !== titleToRemove),
            };
        });


    }

    function handleChangeTitle(e) {
        const selectedTitle = e.target.getAttribute('data-id')

        const newModifiedTitle = prompt("Modifica il titolo", selectedTitle);
        e.preventDefault()
        const updatedTitles = titles.map(title => {
            if (title.title === selectedTitle) {
                return { ...title, title: newModifiedTitle };
            }
            return title;
        });
        setTitles(updatedTitles)
    }

    function handleFormField(e) {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    }




    return (
        <main>


            <div className="container">
                <form onSubmit={handleFormSubmit}>
                    <div className="input-group my-5">
                        <input type="text" name='title' className="form-control" placeholder="Inserisci un titolo" aria-label="Inserisci un titolo " aria-describedby="button-addon2" value={formData.title} onChange={handleFormField} />
                        <input type="text" name='platforms' className="form-control" placeholder="Inserisci le piattaforme" aria-label="Inserisci le piattaforme " aria-describedby="button-addon2" value={formData.platforms} onChange={handleFormField} />
                    </div>
                    <div className="input-group my-5">
                        <input type="text" className="form-control" placeholder="Inserisci l'autore" aria-label="Inserisci l'autore " aria-describedby="button-addon2" name='author' value={formData.author} onChange={handleFormField} />
                        <div className="form-check ms-3">
                            <input className="form-check-input" type="checkbox" name='published' value={formData.published} onChange={handleFormField} id="" />
                            <label className="form-check-label"> pubblicato </label>
                        </div>


                    </div>
                    <button className="btn btn-primary btn-lg mb-3 " type="submit">
                        <i className="bi bi-plus"></i> Add
                    </button>
                </form>






                <h2 className='my-2'>Altri titoli</h2>

                <ul className="list-group mt-4">

                    {blogDataApi.data ?
                        blogDataApi.data.map((post, index) => (
                            <div className="list-group-item mx-4" key={index}>
                                <h3>{post.title}</h3>
                                <div>{post.slugs}</div>
                                <div>{post.content}</div>
                                <img className='pt-2' src={`${url}${post.image}`} alt="" />
                                <div className='py-2'><strong>{post.tags.join(", ")}</strong></div>
                                <button className='btn btn-warning me-2' onClick={handleChangeTitle} data-id={post.title}>Cambia</button>
                                <button className='btn btn-danger' onClick={handleRemoveTitle} data-id={post.slug}>Rimuovi</button>
                            </div>
                        )) :
                        <p>test failed</p>
                    }
                </ul>

            </div>

        </main >
    )
}