import { BaseErrorType, FieldDefError } from '@/../../packages/core/src/models/exceptions';
import { useRef, useState } from 'react';

export function useInputVM(prop: string, set: (arg0: any) => void) {
  const [errors, setErrors] = useState<BaseErrorType[]>([]);
  const inputRef = useRef(null);

  function handleInput() {
    try {
      setErrors([]);
      //@ts-ignore
      set(inputRef.current?.value);
    } catch (error) {
      if (error instanceof FieldDefError) {
        setErrors(error.list.filter((i) => i.property === prop));
      }
    }
  }

  return { errors, inputRef, handleInput };
}
