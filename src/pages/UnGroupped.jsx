import React, { useContext, useEffect, useState } from "react";
import { EnvContext } from "../App";

function UnGroupped() {
  const { env } = useContext(EnvContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/my-vite-app/data.json")
      .then((res) => res.json())
      .then((json) => setData(json[env]?.ungroupped));
  }, [env]);

  return (
    <div>
      <h1 className="text-3xl font-bold">UnGroupped ({env})</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default UnGroupped;
