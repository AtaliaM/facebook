import '../style/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './LogIn';
import UserProfile from './UserProfile';
// import facebookApi from '../apis/facebook-api';

function App() {

  // const trial = async() => {

  //   console.log(process.env.NODE_ENV);
  //   const res = await facebookApi.get('/users');
  //   console.log(res);
  // }
  // trial();


  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/myProfile" component={UserProfile}/>

      </BrowserRouter>
    </div>
  );
}

export default App;
