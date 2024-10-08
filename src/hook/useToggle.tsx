import { useState } from "react";

export default function useToggle(initial: boolean) {
  const [value, setValue] = useState(initial);

  const toggleValue = () => setValue(!value);

  return { value, toggleValue };
}
