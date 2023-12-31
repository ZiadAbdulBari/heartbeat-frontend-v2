import store from "@/store/store";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
// import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import MainLayout from "@/layout/MainLayout";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
        {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      </MainLayout>
    </Provider>
  );
}
