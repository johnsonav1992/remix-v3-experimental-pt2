import { createRoot } from "@remix-run/component";
import { App } from "./App";
import { EcommerceApp } from "./EcommerceApp";

createRoot(document.body).render(<EcommerceApp />);
