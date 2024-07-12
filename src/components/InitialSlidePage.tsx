import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
}

const animations = {
  initial: { opacity: 1, x: 0 },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};
const InitialSlidePage = ({ children, className }: Props) => {
  return (
    <motion.div
      className={className}
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default InitialSlidePage;
