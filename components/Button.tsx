import type { FC } from 'react';
import { signIn, signOut } from 'next-auth/react';

interface ButtonProps {
  onClick: () => {},
  value: string,
};

const Button: FC<ButtonProps> = ({ onClick, value }) => {
  return (
    <button className='btn' onClick={ onClick }>
      { value }
    </button>
  );
};

export const SignInButton: React.FC = () => (
  <button
    className='btn--signin'
    onClick={() => signIn()}
  >
    Sign in
  </button>
);

export const SignOutButton: React.FC = () => (
  <button
    className='btn--signout'
    onClick={() => signOut()}
  >
    Sign out
  </button>
);

export default Button;