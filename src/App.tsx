import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/theme/theme-provider";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/api/userApi";
import type { UserReducerInitailState } from "./types/reducer";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import toast from "react-hot-toast";
import type { User } from "./types/types";

// Components
const Header = lazy(() => import("./components/Header"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const SearchProduct = lazy(() => import("./pages/SearchProduct"));
const Cart = lazy(() => import("./pages/Cart"));
const ShoppingInfo = lazy(() => import("./pages/ShoppingInfo"));
const Orders = lazy(() => import("./pages/OrderDetails"));
const Recent = lazy(() => import("./pages/Recent"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const TrackOrder = lazy(() => import("./components/sections/TrackOrders"));

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitailState }) => state.userReducer
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const data = await getUser(firebaseUser.uid);

          if (!data) {
            // User exists in Firebase but not in backend → redirect to complete profile
            dispatch(userNotExist());
            toast.error("Please complete your profile before continuing.");
            // Optionally navigate to /login so user selects gender/dob
          } else {
            dispatch(userExist(data as User));
          }
        } catch (err) {
          console.error(err);
          toast.error("Error fetching user profile");
        }
      } else {
        dispatch(userNotExist());
      }
    });

    return () => unsubscribe();
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
              path="/login"
              element={
                <ProtectedRoute isAuthoticate={user ? false : true}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shoppinginfo"
              element={
                <ProtectedRoute
                  isAuthoticate={user ? true : false}
                  message="Checkout"
                  navigate="/cart"
                >
                  <ShoppingInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute isAuthoticate={user ? true : false}>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Recent"
              element={
                <ProtectedRoute isAuthoticate={user ? true : false}>
                  <Recent />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/order/:orderId" element={<TrackOrder />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
