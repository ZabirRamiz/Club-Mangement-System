const MemberDetails = ({member}) =>{
    return(
        <div className="document-details">
            <h4>{member.name}</h4>
            <p><strong>Name: </strong>{member.name}</p>
            <p><strong>SID: </strong>{member.sid}</p>
            <p><strong>GSuite: </strong>{member.gsuite}</p>
            <p><strong>Department: </strong>{member.department}</p>
            <p><strong>Designation: </strong>{member.designation}</p>
            <p><strong>Joining Date: </strong>{member.joining_date}</p>
            <p><strong>Phone: </strong>{member.phone}</p>
        </div>
    )
}

export default MemberDetails

//<p><strong>Joining Date: </strong>${member.joining_date.toDateString()}</p>
//<p><strong>Last Promotion: </strong>${member.last_promotion ? document.last_promotion.toDateString() : 'N/A'}</p>