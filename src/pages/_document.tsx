import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-gray-100 text-gray-800 text-center max-w-full mx-auto transition py-16 px-8">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
