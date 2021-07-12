import React,{useEffect ,useState} from 'react';

function Contact() {



    const [userData, setUserData] = useState({name:"", email:"", phone:"",message:""})

    const contactPage = async() =>{
        try {
            const res = await fetch("/getdata" ,{
                method:"GET",
                headers:{
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            setUserData({...userData , name:data.name, email:data.email, phone:data.phone});

        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        contactPage();
    }, []);

    
    const handleMessage = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]:value });
    }

    const contactForm = async(e) =>{
        e.preventDefault() 

        const {name , email , phone , message} = userData;

        const res = await fetch("/contact" , {
            method:"POST",
            headers:{ 
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name , email , phone , message
            })
        });

        const datas = await res.json();

        if(datas){
            alert("Message Send")
            setUserData({...userData , message:""});
        }
    
    };

    return (
        <>
           <div className='contact'>
              <div className='contact-container'>
                  <h1>Get is Touch</h1>
                <form method="POST" className='contact-form'>
                    <div className='contact-info'>
                        <input type='text' onChange={handleMessage} value={userData.name}  name='name' placeholder='Your Name' required/>
                        <input type='text' onChange={handleMessage} value={userData.email} name='email'  placeholder='Your Email' required/>
                        <input type='text' onChange={handleMessage} value={userData.phone} name='phone'  placeholder='Your Phone Number' required/>
                    </div>
                    <div className='contact-messages'>
                    <textarea 
                    placeholder='Write Your Message' 
                    id="message" 
                    name="message" 
                    value={userData.message}
                    onChange={handleMessage}
                    rows="10"
                     cols="81" 
                     required/>
                    </div>
                    <div className='send-message'>
                        <input onClick={contactForm} type='submit' value='Send Message' />
                    </div>
                </form>
              </div>
           </div>
        </>
    )
}

export default Contact;
