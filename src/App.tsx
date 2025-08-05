import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/Home";
import { Suspense, useEffect } from "react";
import Loading from "./components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userApi";
import { userExist, userNotExist } from "./redux/reducer/useReducer";
import Header from "./components/Header";
import type { UserReducerInitailState } from "./types/user-reducer";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchProduct from "./components/SearchProduct";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitailState }) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data!));
      } else {
        dispatch(userNotExist());
      }
    });
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="login"
              element={
                <ProtectedRoute isAuthoticate={user ? false : true}>  
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchProduct/>} />
            <Route path="/cart" element={<SearchProduct/>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
