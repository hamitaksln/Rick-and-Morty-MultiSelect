import { useResizeObserver } from '@mantine/hooks';
import { motion } from 'framer-motion';

export const ResizablePanel = ({ children }: { children: React.ReactNode }) => {
  const [ref, bounds] = useResizeObserver();

  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};
