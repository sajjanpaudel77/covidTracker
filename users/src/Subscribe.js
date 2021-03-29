import React,{useState} from 'react'
import {withRouter,Link} from 'react-router-dom'
// import { Context } from './Context/Context_provider'


function Subscribe({history}) {
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
        fetch('http://localhost:4444/newAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(input) //our state line 5
        })
        .then(data => data.json())
           .then(res => {
               if(res){
                   setUser(res)
                   history.push('/covidapp') // history, withroute when using onclick event
               } else{
                   alert('Your Information is wrong')
               }
               
           }).finally(() => setInput({}))    }
    return (
        <div className="login_container">
            <div>
                <p className="form_title">COVID TRACKING APP</p>
                <p className="form_infotitle"><strong>SUBSCRIBE NOW!</strong></p>
            </div>

            <div className="form_flex">
            <div className="input_container1">
                    <input placeholder="NAME (REQUIRED)" name='name' value={input.name} onChange={handleChange}/>
                    <input placeholder="MAIL (REQUIRED)" name='email' value={input.email} onChange={handleChange}/>
                    <input placeholder="PASSWORD (REQUIRED)" name='password' type='password' value={input.password} onChange={handleChange}/>
                </div>

                <div className="input_container1">
                    <input placeholder="SURNAME (REQUIRED)" name='surname' value={input.surname} onChange={handleChange}/>
                    <input placeholder="TELEPHONE (REQUIRED)"  name='phone_number' value={input.phone_number} onChange={handleChange}/>
                    <input placeholder="REPEAT PASSWORD (REQUIRED)" name='password' type='password' value={input.password} onChange={handleChange}/>
                </div>
            </div>
            <div>
                <button className="btn_comein" onClick={handleSubmit}>SUBSCRIBE</button>            
            </div>
            <div className="flex_subscribe">
                <h4>DO YOU HAVE ALREADY AN ACCOUNT?</h4>
                <button className="btn_subscribe"><Link to='/login' className='link1'>LOG IN!</Link></button>
            </div>
            </div>
    )
}

export default withRouter(Subscribe)
