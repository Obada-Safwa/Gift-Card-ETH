import RecoilWrapper from "@/components/RecoilWrapper";
import "./globals.css";

export const metadata = {
  title: "GiftCards ETH",
  description: "Get GiftCards By Ethereum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <RecoilWrapper>{children}</RecoilWrapper>
      </body>
    </html>
  );
}
