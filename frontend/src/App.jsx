import HomePage from './Containers/Home/HomePage';
import PrimaryAppBar from './Components/AppBarComponent/PrimaryAppBar';

const App = () => {
  return (
    <>
    <PrimaryAppBar selectedID={1} />
    <HomePage />
    </>
  );
};

export default App;
