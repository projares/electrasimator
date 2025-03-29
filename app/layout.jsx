export const metadata = {
  title: 'ElectraSimator',
  description: 'Contractor chaos sim game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#111', color: '#eee' }}>
        {children}
      </body>
    </html>
  );
}
