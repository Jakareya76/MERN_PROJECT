import React, { useState } from 'react';
import { Link , useHistory } from 'react-router-dom';
import regImg from './assets/singup.png';

function Singup() {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    });

    let name , value;

    const handleInput = (event) =>{
        name = event.target.name;
        value = event.target.value; 

        setUser({...user , [name]:value});
    }

    const postData = async(event) =>{
        event.preventDefault();
        
        const {name , email , phone , work , password , cpassword} = user;

        const response = await fetch("/register" ,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({name , email , phone , work , password , cpassword})
        });

        const data = await response.json();

        if(data.status === 422 || !data){
            window.alert("Invaild Registration")
        }else{
            window.alert(" Registration Successful");
            history.push("/login")
        }
    }

    return (
        <>
            <div className='singup'>
                <div className='singup-container'>
                    <div className='singup-left-area'>
                        <h1>Sing Up</h1>
                        <form method='POST' className='register-form' id='register-form'>
                            <div className='name'>
                                <i class="fas fa-user"></i>
                                <input 
                                type='text' 
                                placeholder='Username' 
                                name='name'
                                id='name'
                                value={user.name} 
                                onChange={handleInput} 
                                required />
                            </div>
                            <div className='email'>
                                <i class="fas fa-envelope"></i>
                                <input 
                                type='text' 
                                placeholder='Your Email'
                                name='email' 
                                id='email'
                                value={user.email} 
                                onChange={handleInput} 
                                required />
                            </div>
                            <div className='number'>
                                <i class="fas fa-phone-alt"></i>
                                <input type='text' 
                                placeholder='Mobile Number'
                                name='phone' 
                                id='phone'
                                value={user.phone} 
                                onChange={handleInput} 
                                required />
                            </div>
                            <div className='work'>
                                <i class="fas fa-user-tie"></i>
                                <input 
                                type='text'
                                 placeholder='Your Profession'
                                 name='work' 
                                 id='work'
                                 value={user.work} 
                                 onChange={handleInput} 
                                 required />
                            </div>
                            <div className='password'>
                                <i class="fas fa-lock"></i>
                                <input 
                                type='password' 
                                placeholder='password' 
                                name='password'
                                id='password'
                                value={user.password} 
                                onChange={handleInput} 
                                required />
                            </div>

                            <div className='cpassword'>
                                <i class="fas fa-lock"></i>
                                <input 
                                type='password' 
                                placeholder='Confirm Your Password' 
                                name='cpassword'
                                id='cpassword'
                                value={user.cpassword} 
                                onChange={handleInput} 
                                required />
                            </div>
                            <div className='reg-btn'>
                                <input 
                                type='submit' 
                                name='singup'
                                id='singup'
                                value="Register"
                                onClick={postData}
                                />
                            </div>
                        </form>
                    </div>
                    <div className='singup-right-area'>
                        <img src={regImg} />
                        <Link className='Already-Registered-Link' to='/login'>I Already Registered</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Singup;
