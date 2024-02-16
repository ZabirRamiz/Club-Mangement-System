import { Link } from 'react-router-dom'

const Navbar = () =>{
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Sample navbar</h1>
                </Link>
                <Link to="/members">
                    <h1>Member</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar