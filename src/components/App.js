import '../style/App.css';
import Login from './LogIn';
import UserProfile from './UserProfile';

import facebookApi from '../apis/facebook-api'

function App() {


  const trial = async() => {
    const res = await facebookApi.get('/users');
    console.log(res);
  }
  trial();


  return (
    <div className="App">
      <Login />
      {/* <UserProfile/> */}
    </div>
  );
}

export default App;
