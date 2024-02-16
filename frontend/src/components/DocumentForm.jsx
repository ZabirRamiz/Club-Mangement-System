import { useState } from "react"

const DocumentForm = () =>{
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')
    const [age, setAge] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const document = {title, id, age}
        const response = await fetch('/api/documents/demo', {
            method: 'POST',
            body: JSON.stringify(document),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if( !response.ok ){
            setError(json.error)
        }
        else{
            setTitle('')
            setId('')
            setAge('')
            setError(null)
            console.log("---new Document added---")
        }
    }
    return(
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add new Document</h3>

            <label>Title: </label>
            <input
                type = "text"
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
            />

            <label>ID: </label>
            <input
                type = "number"
                onChange={(e) => setId(e.target.value)}
                value = {id}
            />

            <label>Age: </label>
            <input
                type = "number"
                onChange={(e) => setAge(e.target.value)}
                value = {age}
            />

            <button>Add Document</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default DocumentForm