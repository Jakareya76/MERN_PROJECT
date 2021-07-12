import React,{useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {userContext} from '../App';

function Logout() {

    const {state , dispatch} = useContext(userContext);

    const history = useHistory();

    useEffect(()=>{
        fetch("/logout" , {
            method:"GET",
            headers:{"Content-Type": "application/json"}
        }).then(()=>{
            dispatch({type:"USER", payload:false});
            history.push("/login");
        }).catch(()=>{
            alert("Faild To Logout")
        })
    })
    return (
        <>
           
        </>
    )
}

export default Logout
