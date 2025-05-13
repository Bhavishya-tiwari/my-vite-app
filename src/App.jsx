// src/App.jsx
import { createContext, useState } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Tooltip from '@radix-ui/react-tooltip';

import UnGroupped from "./pages/UnGroupped";
import Groupped from "./pages/Groupped";
import SessionUnGroupped from "./pages/SessionUnGroupped";
import SessionGroupped from "./pages/SessionGroupped";

export const EnvContext = createContext();

const PAGE_OPTIONS = [
  { value: "ungroupped", label: "UnGroupped" },
  { value: "groupped", label: "Groupped" },
  { value: "session-ungroupped", label: "Session-Ungroupped" },
  { value: "session-groupped", label: "Session-Groupped" }
];

function App() {
  const [env, setEnv] = useState("prod");
  const [page, setPage] = useState("ungroupped");

  let PageComponent;
  switch (page) {
    case "groupped":
      PageComponent = Groupped;
      break;
    case "session-ungroupped":
      PageComponent = SessionUnGroupped;
      break;
    case "session-groupped":
      PageComponent = SessionGroupped;
      break;
    case "ungroupped":
    default:
      PageComponent = UnGroupped;
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
          {/* Center: Page ToggleGroup */}
          <div className="flex items-center">
            <ToggleGroup.Root
              type="single"
              value={page}
              onValueChange={(value) => value && setPage(value)}
              className="flex bg-gray-800 rounded-xl shadow-inner border border-gray-700 overflow-hidden"
              aria-label="Page"
            >
              {PAGE_OPTIONS.map(({ value, label }, idx, arr) => (
                <Tooltip.Provider key={value}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <ToggleGroup.Item
                        value={value}
                        className={`flex items-center px-4 py-2 font-medium transition-colors duration-150
                          ${page === value
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
                        {label} page
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              ))}
            </ToggleGroup.Root>
          </div>
          {/* Right: Env Toggle */}
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
                    <ToggleGroup.Item
                      value="prod"
                      className={`px-3 py-1.5 rounded-l-lg font-semibold transition-colors
                        ${env === "prod"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white"}`}
                    >
                      Prod
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="preprod"
                      className={`px-3 py-1.5 font-semibold transition-colors
                        ${env === "preprod"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white"}`}
                    >
                      Pre-Prod
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="dev"
                      className={`px-3 py-1.5 rounded-r-lg font-semibold transition-colors
                        ${env === "dev"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white"}`}
                    >
                      Dev
                    </ToggleGroup.Item>
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
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="container mx-auto p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-[80vh] rounded-xl shadow mt-6">
        <PageComponent />
      </main>
    </EnvContext.Provider>
  );
}

export default App;
