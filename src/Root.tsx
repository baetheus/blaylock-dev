import { About } from 'pages/About';
import { Home } from 'pages/Home';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/about/" component={About} />
    </Router>
  );
};

export default Root;
