import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import { withAuth } from '@okta/okta-react';


const Login = (props) => {
  const [auth, setAuth] = useState(null)

  const checkAuthentication = async () => {
   const authenticated = await props.auth.isAuthenticated();
   if (authenticated !== auth) {
     setAuth(authenticated)
   }
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  const login = async (e) => {
    props.auth.login('/home');
  }

   return (
    auth ? <Redirect to="/home" /> 
    : (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button variant="contained" color="primary" onClick={login}>Login with Okta</Button>
    </div>
    ))
}

export default withAuth(Login);

  // class Login extends React.Component {
  //  constructor(props) {
  //    super(props);
  //    this.state = { authenticated: null };
  //    this.checkAuthentication = this.checkAuthentication.bind(this);
  //    this.login = this.login.bind(this);
  //  }
  
  //  async checkAuthentication() {
  //    const authenticated = await this.props.auth.isAuthenticated();
  //    if (authenticated !== this.state.authenticated) {
  //      this.setState({ authenticated });
  //    }
  //  }
  
  //  async componentDidMount() {
  //    this.checkAuthentication()
  //  }
  
  //  async login(e) {
  //    this.props.auth.login('/home');
  //  }
  
  //  render() {
  //    if (this.state.authenticated) {
  //      return <Redirect to='/home' />
  //    } else {
  //      return (
  //        <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
  //          <Button variant="contained" color="primary" onClick={this.login}>Login with Okta</Button>
  //        </div>
  //      )
  //    }
  //  }
  // }