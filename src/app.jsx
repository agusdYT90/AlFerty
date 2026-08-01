import RoutesMain from "./Routes/RoutesMain";
import { AppProvider } from "./Contexts/Global";
import "./index.css";

function App() {

     return (
          <AppProvider>
               <RoutesMain/>
          </AppProvider>
     )
}

export default App;