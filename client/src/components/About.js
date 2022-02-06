import {useEffect ,useState} from 'react';
import userImg from './assets/user.jpg';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';


function About() {

    const history = useHistory();

    const [userData, setUserData] = useState('')

    const callAboutPage = async() =>{
        try {
            const res = await fetch("/about" ,{
                method:"GET",
                headers:{
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            console.log(data)

            setUserData(data);

            if(!res.status === 200){
                throw new Error(res.error);
                console.log("res not valid")
            }

        } catch (err) {
            console.log(err);
            history.push("/login")
        }
    }
    
    useEffect(() => {
        callAboutPage();
    }, []);


    return (
        <>
           <div className='about'>
              <form method="GET">
              <div className='about-container'>
                <div className='about-top-are'>
                   <div className='about-top-1'>
                       <img src={userImg} alt="User Image" />
                   </div>
                    <div className='about-top-2'>
                        <h3>{userData.name}</h3>
                        <p>{userData.work}</p>
                        <span>RANKING 1/10</span>
                        <Link className='edit-profile-mobile'>Edit Profile</Link>
                    </div>
                    <div className='about-top-3'>
                        <Link className='edit-profile'>Edit Profile</Link>
                    </div>
                </div>
                <div className='about-bottom-are'>

                    <div className='about-bottom-1'>
                        <h4>WORK LINK</h4>
                        <Link className='work-link'>Facebook</Link>
                        <Link className='work-link'>instragram</Link>
                        <Link className='work-link'>Twittor</Link>
                        <Link className='work-link'>Linkdin</Link>
                    </div>
                    <div className='about-bottom-2'>
                        <h4>User Id</h4>
                        <h4>Name</h4>
                        <h4>Email</h4>
                        <h4>Phone</h4>
                        <h4>profession</h4>
                    </div>
                    <div className='about-bottom-3'>
                        <h4>{userData._id}</h4>
                        <h4>{userData.name}</h4>
                        <h4>{userData.email}</h4>
                        <h4>{userData.phone}</h4>
                        <h4>{userData.work}</h4>
                    </div>
                </div>
              </div>
              </form>
           </div>
        </>
    )
}

export default About;
