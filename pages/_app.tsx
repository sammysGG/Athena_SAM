import type { AppProps } from "next/app";
import VisitorTracker from "@/components/VisitorTracker";
import MalwareBeacon from "@/components/MalwareBeacon";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <VisitorTracker />
      <MalwareBeacon />
      <Component {...pageProps} />
    </>
  );
}
