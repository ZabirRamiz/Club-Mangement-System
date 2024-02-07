import { useEffect, useState } from "react"

import DocumentDetails from'../components/DocumentDetails.jsx'
import DocumentForm from'../components/DocumentForm.jsx'
const Home = () =>{
    const [documents, setDocuments] = useState(null)
    // useState: saves a value in documents, and through setDocuments, which is a function that we can name whatever we like, sets another value in documents
    // used to reactively change values 
    useEffect(() => {
        const fetchDocuments = async() => {
            const response = await fetch('/api/documents')
            const json = await response.json()      // will return a document object

            if ( response.ok ){
                setDocuments(json)
            }
        }

        fetchDocuments()
    }, [] ) // useEffect hook - fired when the page is loaded, [] make sure that it is fired only once, and not for the subsequent instances of the page
    return(
        <div className="home">
            <div className="documents">
                {documents && documents.map((document)=>(
                    <DocumentDetails key={document._id} document = {document} />
                )) }
            </div>
            <DocumentForm />
        </div>
    )
}

export default Home