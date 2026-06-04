import type { AppProps } from "next/app";
import VisitorTracker from "@/components/VisitorTracker";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <VisitorTracker />
      <Component {...pageProps} />
    </>
  );
}
