import { useState, useEffect } from 'react'
const initialFormData =
{
    title: '',
    content: '',
    image: '',
    tags: '',
    published: false
}

const url = 'http://localhost:3000'
const endpoint = '/post/'

export default function AppMain() {

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
        console.log(formData);

        const newRecipe = {
            id: Date.now(),
            ...formData
        }
        fetch(`${url}${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(newRecipe),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('success!:', res);
                setBlogDataApi(res)
            })




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
                setBlogDataApi(res)
            })





    }
    /* 
        function handleChangeTitle(e) {
            const selectedTitle = e.target.getAttribute('data-id')
    
            const newModifiedTitle = prompt("Modifica il titolo", selectedTitle);
    
            fetch(`${url}${endpoint}${selectedTitle}`, {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json'
                }
            })
            e.preventDefault()
            const updatedTitles = titles.map(title => {
                if (blogDataApi.title === selectedTitle) {
                    return { ...title, title: newModifiedTitle };
                }
                return title;
            });
            setTitles(updatedTitles)
        }
     */
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
                        <input type="text" name='title' className="form-control" placeholder="Inserisci un titolo" aria-label="Inserisci un titolo " aria-describedby="button-addon2" value={blogDataApi.title} onChange={handleFormField} />
                        <input type="text" name='image' className="form-control" placeholder="aggiungi un'immagine" aria-label="aggiungi un'immagine " aria-describedby="button-addon2" value={blogDataApi.image} onChange={handleFormField} />
                    </div>
                    <div className="input-group my-5">
                        <input type="text" className="form-control" placeholder="Inserisci una descrizione" aria-label="Inserisci una descrizione " aria-describedby="button-addon2" name='content' value={blogDataApi.content} onChange={handleFormField} />
                        <div className="form-check ms-3">
                            <input className="form-check-input" type="checkbox" name='published' value={blogDataApi.published} onChange={handleFormField} id="" />
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
                                {/*   <div className='py-2'><strong>{post.tags.join(", ")}</strong></div> */}
                                {/*  <button className='btn btn-warning me-2' onClick={handleChangeTitle} data-id={post.title}>Cambia</button> */}
                                <button className='btn btn-danger' onClick={handleRemoveTitle} data-id={index}>Rimuovi</button>
                            </div>
                        )) :
                        <p>test failed</p>
                    }
                </ul>

            </div>

        </main >
    )
}