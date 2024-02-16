import React, { useState } from 'react';

const MemberForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [sid, setSid] = useState('');
    const [gsuite, setGsuite] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [joining_date, setJoiningDate] = useState('');
    const [phone, setPhone] = useState('');
    const [last_promotion, setLastPromotion] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const member = { name, password, sid, gsuite, department, designation, joining_date, phone, last_promotion };
        console.log(member)
        const response = await fetch('/api/members', {
            method: 'POST',
            body: JSON.stringify(member),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json)
        if (!response.ok) {
            setError(json.error);
        } else {
            // Reset form fields
            setName('');
            setPassword('');
            setSid('');
            setGsuite('');
            setDepartment('');
            setDesignation('');
            setJoiningDate('');
            setPhone('');
            setLastPromotion('');
            setError(null);
            console.log("---New member added---");
        }
    };

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add New Member</h3>

            <label>Name: </label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />

            <label>Password: </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <label>SID: </label>
            <input
                type="number"
                onChange={(e) => setSid(e.target.value)}
                value={sid}
            />

            <label>GSuite: </label>
            <input
                type="text"
                onChange={(e) => setGsuite(e.target.value)}
                value={gsuite}
            />

            <label>Department: </label>
            <input
                type="text"
                onChange={(e) => setDepartment(e.target.value)}
                value={department}
            />

            <label>Designation: </label>
            <input
                type="text"
                onChange={(e) => setDesignation(e.target.value)}
                value={designation}
            />

            <label>Joining Date: </label>
            <input
                type="date"
                onChange={(e) => setJoiningDate(e.target.value)}
                value={joining_date}
            />

            <label>Phone: </label>
            <input
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
            />

            <label>Last Promotion: </label>
            <input
                type="date"
                onChange={(e) => setLastPromotion(e.target.value)}
                value={last_promotion}
            />

            <button>Add Member</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default MemberForm;
