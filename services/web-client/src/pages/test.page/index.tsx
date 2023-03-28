import { useModel } from '@/src/hooks/useModel';
import { FieldDef } from '@ithan/core';
import { useInputVM } from './input.vm';

export function TestPage() {
  const [fieldDef] = useModel(FieldDef);
  const inputs = [useInputVM('name', fieldDef.setName), useInputVM('code', fieldDef.setCode)];

  return (
    <div>
      {inputs.map((i) => {
        return (
          <>
            <input ref={i.inputRef} onChange={i.handleInput} />
            {i.errors.map((i) => i.code)}
          </>
        );
      })}
    </div>
  );
}
