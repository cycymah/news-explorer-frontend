import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import About from '../About/About';

function App() {
  return (
    <div className="page">
      <div className="fon">
        <Header />
        <SearchForm />
      </div>
      <Main>
        <About />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
