// src/App.jsx
import { createContext, useState, useEffect, useContext } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Tooltip from '@radix-ui/react-tooltip';

import UnGroupped from "./pages/UnGroupped";
import Groupped from "./pages/Groupped";
import SessionUnGroupped from "./pages/SessionUnGroupped";
import SessionGroupped from "./pages/SessionGroupped";
import { SubsIdContext } from "./main"; // Import the context

export const EnvContext = createContext();

function App({
  groupOptions,
  userOptions,
  environments
}) {
  const [env, setEnv] = useState(environments?.[0]?.value || "prod");
  const [groupType, setGroupType] = useState(groupOptions?.[0]?.value || "ungroupped");
  const [userType, setUserType] = useState(userOptions?.[0]?.value || "new-user");
  const { getSubsId, setSubsId } = useContext(SubsIdContext);

  // Local state to force re-render and provide controlled input
  const [subsIdInput, setSubsIdInput] = useState(() => getSubsId(env, groupType));

  // Sync local state with context when env/groupType changes
  useEffect(() => {
    setSubsIdInput(getSubsId(env, groupType));
  }, [env, groupType, getSubsId]);

  // When input changes, update both local state and context
  const handleSubsIdChange = (e) => {
    setSubsIdInput(e.target.value);
    setSubsId(env, groupType, e.target.value);
  };

  // Preload Pricify script on app mount
  useEffect(() => {
    // Only add if not already present
    if (!document.querySelector('script[src="https://js.chargebee.com/atomicpricing/pricify.js"]')) {
      const script = document.createElement("script");
      script.src = "https://js.chargebee.com/atomicpricing/pricify.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Compute page based on toggles
  let PageComponent;
  let pageProps = {};
  if (groupType === "ungroupped" && userType === "new-user") {
    PageComponent = UnGroupped;
    pageProps = { userType };
  } else if (groupType === "groupped" && userType === "new-user") {
    PageComponent = Groupped;
  } else if (groupType === "ungroupped" && userType === "session") {
    PageComponent = SessionUnGroupped;
    pageProps = { subsId: subsIdInput };
  } else {
    PageComponent = SessionGroupped;
    pageProps = { subsId: subsIdInput };
  }

  return (
    <EnvContext.Provider value={{ env, setEnv }}>
      {/* Professional Navbar */}
      <nav className="bg-gray-900/95 backdrop-blur shadow-md border-b border-gray-800 p-2">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left: App Name Only */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-extrabold text-blue-400 tracking-tight select-none">MyViteApp</span>
          </div>
          {/* Center: Two Toggles */}
          <div className="flex items-center space-x-4">
            {/* Groupped/Ungroupped Toggle */}
            <ToggleGroup.Root
              type="single"
              value={groupType}
              onValueChange={(value) => value && setGroupType(value)}
              className="flex bg-gray-800 rounded-xl shadow-inner border border-gray-700 overflow-hidden"
              aria-label="Group Type"
            >
              {groupOptions.map(({ value, label }, idx, arr) => (
                <Tooltip.Provider key={value}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <ToggleGroup.Item
                        value={value}
                        className={`flex items-center px-4 py-2 font-medium transition-colors duration-150
                          ${groupType === value
                            ? "bg-blue-500 text-white shadow-inner ring-2 ring-blue-400"
                            : "text-white hover:bg-blue-700 hover:text-white"}
                          ${idx === 0 ? "rounded-l-xl" : ""}
                          ${idx === arr.length - 1 ? "rounded-r-xl" : ""}
                        `}
                        style={{ borderRight: idx < arr.length - 1 ? '1px solid #374151' : undefined }}
                      >
                        <span className="hidden sm:inline">{label}</span>
                      </ToggleGroup.Item>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        className="bg-gray-900 text-white px-3 py-1 rounded shadow text-xs"
                      >
                        {label}
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </ToggleGroup.Root>
            {/* Session/New User Toggle */}
            <ToggleGroup.Root
              type="single"
              value={userType}
              onValueChange={(value) => value && setUserType(value)}
              className="flex bg-gray-800 rounded-xl shadow-inner border border-gray-700 overflow-hidden"
              aria-label="User Type"
            >
              {userOptions.map(({ value, label }, idx, arr) => (
                <Tooltip.Provider key={value}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <ToggleGroup.Item
                        value={value}
                        className={`flex items-center px-4 py-2 font-medium transition-colors duration-150
                          ${userType === value
                            ? "bg-blue-500 text-white shadow-inner ring-2 ring-blue-400"
                            : "text-white hover:bg-blue-700 hover:text-white"}
                          ${idx === 0 ? "rounded-l-xl" : ""}
                          ${idx === arr.length - 1 ? "rounded-r-xl" : ""}
                        `}
                        style={{ borderRight: idx < arr.length - 1 ? '1px solid #374151' : undefined }}
                      >
                        <span className="hidden sm:inline">{label}</span>
                      </ToggleGroup.Item>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="bottom"
                        className="bg-gray-900 text-white px-3 py-1 rounded shadow text-xs"
                      >
                        {label}
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </ToggleGroup.Root>
          </div>
          {/* Right: Env Toggle and Subscription ID */}
          <div className="flex items-center space-x-4">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <ToggleGroup.Root
                    type="single"
                    value={env}
                    onValueChange={(value) => value && setEnv(value)}
                    className="inline-flex bg-gray-800 rounded-lg shadow-inner border border-gray-700"
                    aria-label="Environment"
                  >
                    {environments.map(({ value, label }, idx, arr) => (
                      <ToggleGroup.Item
                        key={value}
                        value={value}
                        className={`px-3 py-1.5 font-semibold transition-colors
                          ${idx === 0 ? "rounded-l-lg" : ""}
                          ${idx === arr.length - 1 ? "rounded-r-lg" : ""}
                          ${env === value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white"}`}
                      >
                        {label}
                      </ToggleGroup.Item>
                    ))}
                  </ToggleGroup.Root>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="bottom"
                    className="bg-gray-900 text-white px-3 py-1 rounded shadow text-xs"
                  >
                    Switch environment
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            {/* Subscription ID textbox */}
            {false && userType === "session" && env !== "dev" && (
              <input
                type="text"
                className="ml-4 px-3 py-1.5 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gray-800"
                placeholder="Subscription ID"
                value={subsIdInput}
                onChange={handleSubsIdChange}
                style={{ minWidth: 180 }}
                disabled
                hidden
              />
            )}
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="container mx-auto p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-[80vh] rounded-xl shadow mt-6">
        <PageComponent {...pageProps} />
      </main>
    </EnvContext.Provider>
  );
}

export default App;

// Move JSON editor logic to a reusable function
export function useJsonKeyEditor() {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonKeys, setJsonKeys] = useState([]);
  const [jsonError, setJsonError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleShowPricingPage() {
    setJsonError("");
    setSuccessMsg("");
    let parsed;
    try {
      parsed = JSON.parse(jsonInput);
      if (!parsed || typeof parsed !== "object") {
        setJsonKeys([]);
        setJsonError("Parsed value is not an object.");
        return;
      }
      setJsonKeys(Object.keys(parsed));
    } catch (e) {
      setJsonKeys([]);
      setJsonError("Invalid JSON: " + e.message);
      return;
    }

    // Try to extract sessionData from the parsed object
    let sessionData = parsed.sessionData ? parsed.sessionData : parsed;
    if (!sessionData || typeof sessionData !== "object" || !sessionData.url) {
      setJsonError("No valid sessionData found in JSON.");
      return;
    }

    // Call Pricify.openPricingPage
    function openPricing() {
      if (window.Pricify) {
        window.Pricify.openPricingPage({
          pricingPage: sessionData,
        });
        setSuccessMsg("Pricing page opened!");
      } else {
        setTimeout(openPricing, 100);
      }
    }
    openPricing();
  }

  // Return a component to render
  function JsonKeyEditorComponent() {
    return (
      <div className="container mx-auto mt-8 mb-2 p-4 bg-white rounded shadow flex flex-col gap-2 max-w-2xl">
        <label className="font-semibold text-gray-700 mb-1">
          Paste JSON here:
        </label>
        <textarea
          className="border border-gray-300 rounded p-2 font-mono text-sm bg-gray-50"
          rows={4}
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder='Paste JSON here...'
        />
        <div className="flex items-center gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 font-semibold"
            onClick={handleShowPricingPage}
            type="button"
          >
            Show Pricing Page
          </button>
          {jsonError && (
            <span className="text-red-600 text-sm ml-2">{jsonError}</span>
          )}
          {successMsg && (
            <span className="text-green-600 text-sm ml-2">{successMsg}</span>
          )}
        </div>
        {jsonKeys.length > 0 && (
          <div className="mt-2">
            <span className="font-medium text-gray-700">Top-level keys:</span>
            <ul className="list-disc list-inside text-gray-800 mt-1">
              {jsonKeys.map(key => (
                <li key={key} className="font-mono">{key}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return JsonKeyEditorComponent;
}
