import React, {PropsWithChildren} from 'react';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="App">
      <header>
        <Navbar/>
      </header>
      <main className="container-fluid">
        {children}
      </main>
      <footer className="py-3 bg-info">
        <Footer/>
      </footer>
    </div>
  );
};

export default Layout;