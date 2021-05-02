import LandingPage from "../pages/Landing/LandingPage";
import InvoicePage from "../pages/Invoice/InvoicePage";

export default [
    { path: "/", name: "Home Page", component: LandingPage },
    { path: "/invoice", name: "Invoice Page", component: InvoicePage },
];