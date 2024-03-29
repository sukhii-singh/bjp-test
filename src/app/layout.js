
// import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
// const inter = Inter( { subsets: [ "latin" ] } );
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StoreProvider from "./StoreProvider";


export const metadata = {
  title: "NN Network",
  description: "News App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-[#F0F2F5] hide-scroll`} style={{
        display: 'flex',
        height: '100%',
        width: '100%'
      }}  >
        <StoreProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}  >
            <Header />
            <Sidebar />
            {children}
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
