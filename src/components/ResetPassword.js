import queryString from "query-string";
import React , {useState} from "react";
import { useLocation} from "react-router";
import { useNavigate } from 'react-router-dom';
export default function ResetPassword() {
     const navigateTo = useNavigate();
     const Host = "http://localhost:5000";
	const location = useLocation();
	const { token, id } = queryString.parse(location.search);
     const [Password, setPassword] = useState({
          NewPassword :'',
          ConformPassword:''
     });
     const HandelChange = (e)=>{
          setPassword({...Password , [e.target.name] : e.target.value})
          console.log(Password)
     }
     const OnSumbit = async (e)=>{
          e.preventDefault();
          const response = await fetch(`${Host}/api/auth/resetpassword?token=${token}&id=${id}`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    
               },
               body: JSON.stringify({
                    "password":Password.NewPassword
                    
               }),
          })
          const json = await response.json()
          console.log(json)
          alert("yor password is now changed login with your new passeord")
          if(json.success){
               navigateTo("/login");
          }
     }
	return (
		<>
			<div className="container text-center">
               <form onSubmit={OnSumbit}>
				<div className="mt-5">
					<label>New Password:</label>
					<input
						type="password"
                              name="NewPassword"
						onChange={HandelChange}
						required
					/>
				</div>
				<div className="mt-5">
					<label>New Password:</label>
					<input
						type="password"
                              name="ConformPassword"
						onChange={HandelChange}
						required
					/>
				</div>
                    <button className="btn btn-danger mt-5" type="sumbit" disabled ={Password.NewPassword !== Password.ConformPassword}> sumbit </button>
               </form>
			</div>
		</>
	);
}
