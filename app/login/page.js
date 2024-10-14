'use client';
import { Login } from "./action";
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import "./page.css";
import { useUserContext } from "../userContext";
// import { useEffect } from "react";

export let check_login = false;

export default function Page() {
  const router = useRouter();
  const initialState = {
    message: null,
    officerName: null,
  }

  const [state, formAction] = useFormState(Login, initialState);

  if (state.message === 'login success') {
    check_login = true;
    localStorage.setItem('officerName', state.officerName);
    alert(`${state.message}, Officer: ${state.officerName}`);
    router.push(`/serviceForm`); 
  } else if (state.message) {
    alert(state.message);
  }

  return (
    <div className='align_center'>
      <h1><b>Login</b></h1>
      <form action={formAction}>
        <h3 className="login-label" >
          Username:
        </h3>
          <input type="text" name="username" className="input" />
        <h3 className="login-label">
          Password:
        </h3>
          <input type="password" name="password" className="input" />
         <br></br>
        <button className="button-1">Submit</button>
      </form>
    </div>
  );
}
