import React from 'react';
import '../bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';

const App = () => {
  return (
    <Router>
      <Route exact path='/' component={HomeScreen}></Route>
      <Route exact path='/transaction' component={TransactionScreen}></Route>
    </Router>
  );
};

export default App;
