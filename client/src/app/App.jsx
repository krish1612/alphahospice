import { Suspense, useEffect, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Contact from "../pages/Contact";
import Loading from "../components/Loading";
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Trustee = lazy(() => import("../pages/Trustee"));
const Donors = lazy(() => import("../pages/Donors"));
const BuyBrick = lazy(() => import("../pages/Buybrick"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

// Import React toast for Alert
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import AdminLayout from "../components/Admin/AdminLayout";
import Dashboard from "../components/Admin/Dashboard";
import BrickTable from "../components/Admin/BrickTable";
import DonorTable from "../components/Admin/DonorTable";
import ManageContent from "../components/Admin/ManageContent";
import TrusteeManage from "../components/Admin/TrusteeManage";
import SMM from "../components/Admin/SMM";

function App() {
  const alert = useSelector((state) => state.alert);
  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (alert.alertType)
      switch (alert.alertType) {
        case "success":
          toast.success(alert.content, {
            position: "top-right",
            autoClose: 1000,
          });
          break;
        case "error":
          toast.warn(alert.content, {
            position: "top-right",
          });
          break;
      }
  }, [alert]);

  return (
    <>
      <Suspense fallback={<Loading loading={loading} />}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="bricks" element={<BrickTable />} />
              <Route path="donors" element={<DonorTable />} />
              <Route path="manage" element={<ManageContent />} />
              <Route path="trustee" element={<TrusteeManage />} />
              <Route path="smm" element={<SMM />} />
            </Route>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trustee" element={<Trustee />} />
            <Route path="/buybrick" element={<BuyBrick />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}
export default App;
