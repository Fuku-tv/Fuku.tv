import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  id: string;
}

const Portal: React.FC<Props> = ({ children, id }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.querySelector(`#${id}`)) : null;
};

export default Portal;
