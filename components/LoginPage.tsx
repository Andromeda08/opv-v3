import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  return (
    <div className='login_page'>
      <div className='main'>
        <img src='/icon.png' alt='icon' />
        <div className='text'>
          <h1>osu!pv</h1>
          <p>view yours and others osu! profiles</p>
        </div>
      </div>
      <button
        className='btn--cta-login'
        onClick={ () => signIn('osu') }
      >
        Sign in using osu!
      </button>
    </div>
  );
};

export default LoginPage;