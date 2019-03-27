// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports
import AppLayout from './AppLayout'
import HomePageContainer from './components/HomePageContainer';
// import TweetAdd from './components/tweet/add'
// import TweetViewContainer from './components/tweet/view-container'
// import UserLogin from './components/user/login'
// import UserRegister from './components/user/register'
// import About from './components/about'
import NotFound from './NotFound';

const App = () => (
  <AppLayout>
    <Switch>
      <Route exact path="/" component={HomePageContainer}/>
      {/* <Route path="/tweet/add" component={TweetAdd}/>
      <Route path="/tweet/:tweetId" component={TweetViewContainer}/>
      <Route path="/user/login" component={UserLogin}/>
      <Route path="/user/register" component={UserRegister}/>
      <Route path="/about" component={About}/> */}
      <Route component={NotFound}/>
    </Switch>
  </AppLayout>
)

export default App
