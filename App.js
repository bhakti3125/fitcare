import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import TutorialsPage from "./components/TutorialsPage";
import TutorialDetail from "./components/TutorialDetail";
import BlogsPage from "./components/BlogsPage";
import BlogDetail from "./components/BlogDetail";
import ContactPage from "./components/ContactPage";
import AddBlog from "./components/AddBlog";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/tutorials" element={<TutorialsPage />} />
              <Route path="/tutorials/:slug" element={<TutorialDetail />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="/admin/add-blog" element={<AddBlog />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;