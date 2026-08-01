import { useAuth } from "../Hooks/UseContexts.jsx";
import Loading from "../Utils/Loading.jsx";

const LoadingGlobal = ({ children }) => {
     const { CargandoA } = useAuth();

     return (
          <Loading Texto={""} Duracion={3000} Condicion={CargandoA} completo={true}>
               {children}
          </Loading>
     );
};

export default LoadingGlobal;
