import { useRef } from "react";

const Repetidor = ({
  onClick,
  delayInicial = 250,
  delayMinimo = 50,
  aceleracion = 0.5,
  children,
  ...props
}) => {
  const timeoutRef = useRef(null);
  const delayRef = useRef(delayInicial);

  const ejecutar = () => {
    onClick();
    delayRef.current = Math.max(delayMinimo, delayRef.current * aceleracion);
    timeoutRef.current = setTimeout(ejecutar, delayRef.current);
  };

  const iniciar = () => {
    delayRef.current = delayInicial;
    ejecutar();
  };

  const detener = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  return (
    <button
      onPointerDown={iniciar}
      onPointerUp={detener}
      onPointerLeave={detener}
      {...props}
    >
      {children}
    </button>
  );
};

export default Repetidor;
