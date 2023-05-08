import { FC, ReactNode } from 'react';
import { AuthProvider, Nav } from '@components';
import '@styles/globals.css';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share IA Prompts'
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;