import './bootstrap';
import { createRoot } from 'react-dom/client';
import App from "./App";

const root = createRoot(document.getElementById('app')); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
