import './App.css'
import LoginForm from './context/loginForm/LoginForm'
import FakeAPI from './infra/FakeAPI'

function App() {

  return (
    <>
      <LoginForm repository={FakeAPI()}></LoginForm>
    </>
  )
}

export default App
