import '../style/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './LogIn';
import Logout from './Logout';
import UserProfile from './UserProfile';
import ProtectedRoute from './ProtectedRoute';
import UserFeed from './UserFeed';
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
        <ProtectedRoute path="/myProfile" component={UserProfile} />
        <ProtectedRoute path="/myFeed" component={UserFeed} />
        <ProtectedRoute path="/logout" component={Logout} />
        <Route path="/users/:path" exact component={UserProfile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
