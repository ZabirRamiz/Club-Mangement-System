import { useEffect, useState } from "react"
import SponsorFeed from "./SponsorFeed.jsx"
import SponsorForm from "./SponsorForm.jsx"

const Sponsor = () => {
    const [sponsors, setSponsors] = useState([])
    const [maxHeight, setMaxHeight] = useState(window.innerHeight);
    useEffect( () =>{
        const fetchSponors = async() =>{
            const response = await fetch('api/sponsor/getSponsors')
            const json = await response.json()
            console.log(json)
            if(response.ok){
                setSponsors(json)
            }
        }
        fetchSponors()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setMaxHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return(
        <>
        <div className="flex items-right" style={{ backgroundImage: 'url("https://png.pngtree.com/background/20210716/original/pngtree-light-blue-cute-striped-baby-blue-background-picture-image_1348681.jpg")', backgroundSize: 'cover', minHeight: '100vh' }}>

            <div className="w-2/6">
                <SponsorForm />
            </div>
            <div className="w-4/5 overflow-y-auto" style={{ maxHeight: `${maxHeight}px` }}>
                {sponsors.map(sponsor => (
                    <SponsorFeed key={sponsor._id} sponsor={sponsor} />
                ))}
            </div>


        </div>

        </>
    
      )

}

export default Sponsor