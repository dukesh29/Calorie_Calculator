import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import Form from "./containers/Form/Form";
import './App.css';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={(
            <Home/>
          )}/>
          <Route path='/new' element={(
            <Form/>
          )}/>
          <Route path='/:id/edit' element={(
            <Form edit/>
          )}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
