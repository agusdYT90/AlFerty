import { AuthProvider } from "./Auth.jsx";
import { UserProvider } from "./User.jsx";
import LoadingGlobal from "../Utils/LoadingGlobal.jsx";

export const AppProvider = ({ children }) => {
     return (
          <AuthProvider>
               <UserProvider>
                    <LoadingGlobal>{children}</LoadingGlobal>
               </UserProvider>
          </AuthProvider>
     );
};
