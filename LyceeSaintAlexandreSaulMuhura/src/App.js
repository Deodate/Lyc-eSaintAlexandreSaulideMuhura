import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/common/Layout";
import { Home } from "./pages/Home";
import { BlogSinglePage } from "./components/common/BlogSinglePage";
import { About } from "./pages/About";
import { Courses } from "./pages/WhyLycee";
import { Blog } from "./pages/NewsEvent";
import { Instructor } from "./pages/ContactUs";
import DashboardLayout from "./components/Authentications";
import BabyeyiLetter from "./components/Authentications/Babyeyi";
import LoginAuth from "./components/Authentications/login";
import SignupAuth from "./components/Authentications/signupAuth";
import ForgetPwdAuth from "./components/Authentications/forgetPwd";
import UserList from "./components/Authentications/UserList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/student-lists"
            element={
              <Layout>
                <student-lists />
              </Layout>
            }
          />
          <Route
            path="/:id"  
            element={
              <Layout>
                <LoginAuth />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <Courses />
              </Layout>
            }
          />
           <Route
            path="/UserList"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
          <Route
            path="/instructor"
            element={
              <Layout>
                <Instructor />
              </Layout>
            }
          />
          <Route
            path="/staff"
            element={
              <Layout>
                <staff />
              </Layout>
            }
          />
          <Route
            path="/babyeyi"
            element={
              <Layout>
                <BabyeyiLetter />
              </Layout>
            }
          />
          <Route
            path="/comments"
            element={
              <Layout>
                <comments />
              </Layout>
            }
          />
          <Route
            path="/gallery"
            element={
              <Layout>
                <gallery />
              </Layout>
            }
          />
           <Route
            path="/SignupAuth"
            element={
              <Layout>
                <SignupAuth />
              </Layout>
            }
          />
            <Route
            path="/LoginAuth"
            element={
              <Layout>
                <LoginAuth />
              </Layout>
            }
          />
           <Route
            path="/ForgetPwdAuth"
            element={
              <Layout>
                <ForgetPwdAuth />
              </Layout>
            }
          />
          <Route
            path="/newsEvents"
            element={
              <Layout>
                <newsEvents />
              </Layout>
            }
          />
          <Route
            path="/blog"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />
          <Route
            path="/single-blog"
            element={
              <Layout>
                <BlogSinglePage />
              </Layout>
            }
          />
          {/* Add the DashboardLayout Route */}
          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
