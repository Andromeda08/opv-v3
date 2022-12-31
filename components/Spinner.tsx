import { motion } from 'framer-motion';
import { ImSpinner8 } from 'react-icons/im';

export const Spinner : React.FC = ({}) => {
  return (
    <div
      className='spinner'
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2
        }}
      >
        <ImSpinner8 size={ 32 } className='text-zinc-500' />
      </motion.div>
    </div>
  );
}

export const Loader = () => (
  <div className='bordered flex items-center justify-center p-4'>
    <Spinner />
  </div>
);
