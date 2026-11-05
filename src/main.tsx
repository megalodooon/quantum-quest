import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./ui/App";
import { initPersistence } from "./cloud";

initPersistence();
createRoot(document.getElementById("root")!).render(<App />);
