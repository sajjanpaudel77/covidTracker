import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'

function Login({history}) {

    const [input, setInput] = useState({})
    const [user, setUser] = useState({})

    function handleChange (e){
      let{name,value} = e.target
        setInput({
         ...input, 
         [name]: value //[ needs to be dynamical property in object without [] will be just name property]
      })
    }

    function handleSubmit(){
        fetch('http://localhost:4444/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(input) //our state line    
            })
           .then(data => data.json())
           .then(res => {
               if(res){
                   console.log(res)
                   setUser(res)
                   history.push('/covidapp')
               } else{
                   alert('Your Information is wrong')
               }
               
           }).finally(() => setInput({}))
    }
    return (
        <div className="subscribe_container">
        <div className="login_container">
            <div className="form_title">
                <p><strong>LOG IN NOW</strong></p>
            </div>
            <div className="form_flex">
                <div className="input_container">
                    <input placeholder="MAIL" name='email' value={input.email} onChange={handleChange} />
                    <input placeholder="PASSWORD" name='password' type='password' value ={input.password} onChange={handleChange} />
                </div>
            </div>
            <button className="btn_login" onClick={handleSubmit}>LOG IN</button>
         </div>

        </div>
    )
}

export default withRouter(Login)
