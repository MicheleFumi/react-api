
import { useState, useEffect } from 'react'
const initialFormData =
{
    title: '',
    content: '',
    image: '',
    tags: [],

}
const tagList = ["Dolci", "Primi piatti", "Ricette vegetariane", "Ricette nucleari"]
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
        const { name, value, } = e.target;
        console.log(name);
        setFormData({
            ...formData,
            [name]: value,
        });




    }
    function handleChecks(e) {
        const { value, checked } = e.target;
        if (checked) {

            setFormData({
                ...formData,
                tags: [...formData.tags, value]
            });
        } else {
            // Se il checkbox è deselezionato, rimuovi il tag dall'array
            setFormData({
                ...formData,
                tags: formData.tags.filter(tag => tag !== value)
            });
        }
    }

    return (

        <main className="py-4">
            <div className="container">
                {/* Card per il form */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header">
                        <h3>Aggiungi una nuova ricetta</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            {/* Input per titolo e immagine */}
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Titolo</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    placeholder="Inserisci un titolo"
                                    value={formData.title}
                                    onChange={handleFormField}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Immagine</label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    className="form-control"
                                    placeholder="URL immagine"
                                    value={formData.image}
                                    onChange={handleFormField}
                                />
                            </div>
                            {/* Input per descrizione */}
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Descrizione</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    className="form-control"
                                    placeholder="Inserisci una descrizione"
                                    rows="3"
                                    value={formData.content}
                                    onChange={handleFormField}
                                ></textarea>
                            </div>
                            {/* Checkbox per categorie */}
                            <div className="mb-3">
                                <h5 className="form-label">Categorie</h5>
                                <div className="row">
                                    {tagList.map((tag, index) => (
                                        <div key={index} className="col-6 col-md-3">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name={tag}
                                                    value={tag}
                                                    checked={formData.tags.includes(tag)}
                                                    onChange={handleChecks}
                                                    id={`tag-${index}`}
                                                />
                                                <label className="form-check-label" htmlFor={`tag-${index}`}>
                                                    {tag}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="btn btn-primary w-100" type="submit">
                                <i className="bi bi-plus"></i> Aggiungi Ricetta
                            </button>
                        </form>
                    </div>
                </div>

                {/* Lista dei post */}
                <h2 className="my-4">Altre Ricette</h2>
                <div className="row">
                    {blogDataApi.data ? (
                        blogDataApi.data.map((post, index) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={index}>
                                <div className="card shadow-sm h-100 card-fixed-height">
                                    <img
                                        src={`${url}${post.image}`}
                                        className="card-img-top"
                                        alt={post.title}

                                    />
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={handleRemoveTitle}
                                        data-id={index}
                                    >
                                        Rimuovi
                                    </button>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text card-description">{post.content}</p>
                                        <div className="card-bottom">
                                            <div className="mt-auto">
                                                <strong>Categorie:</strong> {post.tags.join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <p>Nessuna ricetta trovata.</p>
                    )}
                </div>

            </div>
        </main>
    )
}
