const DocumentDetails = ({document}) => {
    return (
        <div className="document-details">
            <h4>{document.title}</h4>
            <p><strong>ID: </strong>{document.id}</p>
            <p><strong>Age: </strong>{document.age}</p>
            <p>Entry created at: {document.createdAt}</p>
        </div>
    )
}

export default DocumentDetails