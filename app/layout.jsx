export const metadata = {
  title: 'ElectraSimator',
  description: 'Contractor chaos sim game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#111', color: '#eee', fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
