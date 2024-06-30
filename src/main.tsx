import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext.tsx";
import { LoaderProvider } from "@/context/LoaderContext.tsx";
import { ErrorProvider } from "@/context/ErrorContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <LoaderProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </LoaderProvider>
    </AuthProvider>
  </BrowserRouter>,
);
