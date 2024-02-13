import { login, signup } from './loginaction';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      <form className="flex flex-col items-center">
        <label htmlFor='email'>Email:</label>
        <input id='email' name='email' type='email' required className="border" />
        <label htmlFor='email'>Password:</label>
        <input id='password' name='password' type='password' required className="border" />
        <div className="flex flex-col items-center">
          <button formAction={login} className="border">Log in</button>
          <button formAction={signup} className="border">Sign up</button>
        </div>
      </form>
    </div>
  )
}
