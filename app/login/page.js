'use client'
import { Login } from "./action";
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation';
import './page.css'

export default function Page() {
  const router = useRouter();
  const initialState = {
    message: null,
    officerName: null,
  }
  const [state, formAction] = useFormState(Login, initialState)

 if (state.message === 'login success') {
      alert(`${state.message}, username: ${state.officerName}`);
      router.push(`/insertData?officername=${state.officerName}`); //parse state offciername
    } else if (state.message) {
      alert(state.message);
    }

  return (
    <div className='align-center'>
    <h1>Login Page</h1>
    <form action={formAction}>
      <h3>
        Username :  
        <input type="text" name="username" className="input"/>
      </h3>
      <h3>
        Password :
        <input type="password" name="password" className="input"/>
      </h3>
      <button className="button-1">Submit</button>
      {/* <div>Status:{state.message}</div> */}
    </form>
    </div>
  );
}
