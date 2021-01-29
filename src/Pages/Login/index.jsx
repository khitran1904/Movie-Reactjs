/* eslint-disable no-unused-vars */
import React ,{ useState, useEffect } from 'react'
import { login } from "../../Action/Movie";

export default function Login() {
    
    const [taiKhoan,setTaiKhoan] = useState("");
    const [matKhau,setMatKhau] = useState("");
    let temp={taiKhoan : taiKhoan , matKhau:matKhau};
    let handleChangeTK = (evt) => {
        const value = evt.target.value;
        setTaiKhoan(value);
        temp={...temp,taiKhoan:value}
        console.log(value);
    }
    
    let handleChangeMK = (evt )=>{
        const {value} = evt.target;
        setMatKhau(value);
        temp={...temp,matKhau:value}
        console.log(value);
    }

    let handleLogin = (temp) => {
        console.log(temp);
        login(temp)
    }
    return (
        <div className="login" >
            <div className="login__form mx-auto text-center">
                <span className="form__header" >Login here</span>
                <form >
                    <input name="Username" placeholder="USERNAME" required onChange={handleChangeTK} />
                    <input type="password" name="Password" placeholder="PASSWORD" required onChange={handleChangeMK}/>
                    <div className="">
                        <input className="btn__login" type="button" defaultValue="LOGIN" onClick={handleLogin} />
                        <p> To register new account <span>→</span>
                        <a className="" href="/"> Click Here</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
