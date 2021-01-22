import React ,{ useState, useEffect } from 'react'

export default function Login() {
    
    const [taiKhoan,setTaiKhoan] = useState("");
    const [matKhau,setMatKhau] = useState("");
    const handleChangeTK = (evt )=>{
        const tk = evt.target;
        console.log("tk");
        // setTaiKhoan(tk);
        
    }
    const handleChangeMK = (evt )=>{
        // setTaiKhoan(evt.target);
        
    }
    return (
        <div className="login" >
            <div className="login__form mx-auto text-center">
                <span className="form__header" >Login here</span>
                <form >
                    <input name="Username" placeholder="USERNAME" required onChange={(evt)=>handleChangeTK()} />
                    <input type="password" name="Password" placeholder="PASSWORD" required onChange={(evt)=>handleChangeMK()}/>
                    <div className="">
                        <input className="btn__login" type="button" defaultValue="LOGIN" />
                        <p> To register new account <span>→</span>
                        <a className="" href="/"> Click Here</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
