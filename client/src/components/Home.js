import React,{useState , useEffect} from 'react';

function Home() {

  const [userData, setUserData] = useState('');
  const [show , setshow] = useState(false)

  const homePage = async() =>{
      try {
          const res = await fetch("/getdata" ,{
              method:"GET",
              headers:{
                  "Content-Type": "application/json"
              },
          });

          const data = await res.json();

          setUserData(data);
          setshow(true)

      } catch (err) {
          console.log(err);

      }
  }
  
  useEffect(() => {
      homePage();
  }, []);
    return (
        <>
          <div className='home-page'>
            <div className='home-div'>
              <p>Welcome</p>
              <h1>{userData.name}</h1>
              <h2>{show ? "Happy to see you back" : "We Are The MERN Developer"}</h2>
            </div>
          </div>
        </>
    )
}

export default Home;
