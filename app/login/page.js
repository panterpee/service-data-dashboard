'use client';
import { Login } from "./action";
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import './page.css';
import { useUserContext } from "../userContext";

export let check_login = false;

export default function Page() {
  const router = useRouter();
  const initialState = {
    message: null,
    officerName: null,
  }

  const [state, formAction] = useFormState(Login, initialState);
  const { setOfficerName } = useUserContext();

  if (state.message === 'login success') {
    check_login = true;
    setOfficerName(state.officerName); // Set the officerName in context
    alert(`${state.message}, Officer: ${state.officerName}`);
    router.push(`/insertData?officername=${state.officerName}`); // Send state
  } else if (state.message) {
    alert(state.message);
  }

  return (
    <div className='align-center'>
      <h1>Login Page</h1>
      <form action={formAction}>
        <h3>
          Username:
          <input type="text" name="username" className="input" />
        </h3>
        <h3>
          Password:
          <input type="password" name="password" className="input" />
        </h3>
        <button className="button-1">Submit</button>
      </form>
    </div>
  );
}
