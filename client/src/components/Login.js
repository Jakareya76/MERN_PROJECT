import {useState , useContext} from 'react';
import loginImg from './assets/login.png';
import {useHistory} from 'react-router-dom';
import {userContext} from '../App';


function Login() {
    const {state , dispatch} = useContext(userContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const loginUser = async(event) =>{
        event.preventDefault();

       const res = await fetch("/login" , {
           method:"POST",
           headers: {
            "Content-Type" : "application/json"
             },
           body:JSON.stringify({
               email,
               password
           })
       });

       const data = res.json();

       if(res.status === 400 || !data){
           window.alert("Username or Passowrd Worng")
       }else{
           dispatch({type:"USER", payload:true});
           window.alert("User Login Successful");
           history.push("/")
       }
    }

    return (
        <>
           <div className='login'>
               <div className='login-container'>
                   <div className='left-login'>
                      <img src={loginImg} alt='Login_Img' />   
                   </div>
                   <div className='right-login'>
                       <h1>Login</h1>
                        <form method='POST'>
                            <div className='email'>
                               <i class="fas fa-user"></i>
                                <input 
                                type='text' 
                                name='email' 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                placeholder='Your Email'  
                                required/>
                            </div>
                            <div className='password'>
                               <i class="fas fa-lock"></i>
                                <input 
                                type='password' 
                                name='password' 
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                placeholder='Password'  
                                required/>
                            </div>
                            <div className='log-btn'>
                                <input 
                                type='submit' 
                                value='Login' 
                                onClick={loginUser}
                                name='login-btn' 
                                id='login-btn' />
                            </div>
                        </form>
                   </div>
               </div>
           </div>
        </>
    )
}

export default Login;
