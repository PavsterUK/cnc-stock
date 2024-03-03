import Dashboard from './components/Dashboard';
import { CategoriesProvider } from './components/Categories/CategoriesContext';
import './index.css';

function App() {

    return (
        <>
            <CategoriesProvider>
                <Dashboard />
            </CategoriesProvider>
        </>
    );
}

export default App;
