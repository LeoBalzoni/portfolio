"use client";

import { motion, useReducedMotion } from "framer-motion";

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollFadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={
        reduced ? { duration: 0 } : { duration: 0.6, delay, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      variants={{
        hidden: reduced ? {} : { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0 : 0.5 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      initial={reduced ? false : "hidden"}
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      variants={{
        hidden: reduced ? {} : { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0 : 0.5 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScaleOnHover({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.div
      whileHover={reduced ? undefined : { scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
