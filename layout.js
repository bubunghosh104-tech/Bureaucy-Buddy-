import "./globals.css";

export const metadata = {
  title: "Bureaucracy Buddy | Simple Government Paperwork Help for India",
  description: "Understand government paperwork, passport, Aadhaar, driving licence, and certificates in simple plain language. Available in English, Hindi, and Bengali.",
  keywords: ["government paperwork India", "Aadhaar update", "Passport process", "Driving licence", "Ration card", "Bureaucracy Buddy"],
  authors: [{ name: "Bureaucracy Buddy Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
