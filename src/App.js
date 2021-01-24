import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router,  Route } from 'react-router-dom'
import Header from './components/layout/Header';
import Suscribe from './components/Suscribe';
import About from './components/About';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Profile from './components/Profile'
import AddGroupCampaign from './components/AddGroupCampaign';
import AddTemplate from './components/AddTemplate';
import CampaignDetails from './components/CampaignDetails'
import './App.css';
import { UserContext } from './context/UserContext';
import AddIndividualCampaign from './components/AddIndividualCampaign';
import AddSmsGroupCampaign from './components/AddSmsGroupCampaign';



export default function App(){
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || 'notLoggedIn');
    const providerValue = useMemo(() => ({userName, setUserName, userEmail, setUserEmail, isLoggedIn, setIsLoggedIn}), [userName, setUserName, userEmail, setUserEmail, isLoggedIn, setIsLoggedIn])
    

  

  function handleLogout() {
    setUserName("");
    setUserEmail("");
    setIsLoggedIn("notLoggedIn");
  }

  if(isLoggedIn === 'notLoggedIn') { 
    return (
      <Router>
        <div className="App">
        <UserContext.Provider value = {providerValue}>
          <div className="container">
          <Header  handleLogout= {handleLogout} component={Header}/>
          </div>
          
            <div>
              <Route exact path='/' render={props=> (
                <Welcome {... props}/>
              )}>
              </Route>
              
              <Route exact path='/login'  component={Login}></Route>
              <Route exact path='/register'  component={Suscribe}></Route>
              <Route exact path='/about' component={About}></Route>
            </div>
            </UserContext.Provider>
        </div>
      </Router>
    );
  }
  else { 
    return (
      <Router>
        <div className="App">
        <UserContext.Provider value = {providerValue}>
          <div className="container">
          <Header  handleLogout= {handleLogout} component={Header}/>
          </div>
          
            <div>
              <Route exact path='/' render={props=> (
                <Welcome {... props} />
              )}>
              </Route>
              <Route exact path='/about' component={About}></Route>
              <Route exact path='/groupCampaign' component={AddGroupCampaign}></Route>
              <Route exact path='/smsGroupCampaign' component={AddSmsGroupCampaign}></Route>
              <Route exact path='/individualCampaign' component={AddIndividualCampaign}></Route>
              <Route exact path='/template' component={AddTemplate}></Route>
              <Route exact path='/profile' component={Profile}></Route>
              <Route exact path='/profile/:campaign_id' component={CampaignDetails}></Route>
            </div>
            </UserContext.Provider>
        </div>
      </Router>
    );
  }
}
