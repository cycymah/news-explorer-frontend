import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function App() {
  return (
    <div className="page">
      <div className="fon">
        <Header />
        <SearchForm />
      </div>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
