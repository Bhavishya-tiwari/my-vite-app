import { StrictMode, createContext, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'; // Import the CSS file

const GROUP_OPTIONS = [
  { value: "ungroupped", label: "Ungroupped" },
  { value: "groupped", label: "Groupped" }
];
const USER_OPTIONS = [
  { value: "new-user", label: "New User" },
  { value: "session", label: "Returning User" }
];
const ENVIRONMENTS = [
  { value: "prod", label: "Prod" },
  { value: "preprod", label: "Pre-Prod" },
  { value: "dev", label: "Dev" }
];

// Subscription ID context for (env, groupType) mapping
export const SubsIdContext = createContext();

function SubsIdProvider({ children }) {
  // Use a ref to avoid unnecessary rerenders
  const subsIdMapRef = useRef(new Map());

  // Get subscription id for a key
  const getSubsId = (env, groupType) => {
    return subsIdMapRef.current.get(`${env}:${groupType}`) || "";
  };

  // Set subscription id for a key
  const setSubsId = (env, groupType, value) => {
    subsIdMapRef.current.set(`${env}:${groupType}`, value);
  };

  return (
    <SubsIdContext.Provider value={{ getSubsId, setSubsId }}>
      {children}
    </SubsIdContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SubsIdProvider>
      <App
        groupOptions={GROUP_OPTIONS}
        userOptions={USER_OPTIONS}
        environments={ENVIRONMENTS}
      />
    </SubsIdProvider>
  </StrictMode>,
)
