import { useEffect, useState } from 'react';

const useForm = (initial = {}) => {
  // create a state object for inputs
  const [inputs, setInputs] = useState(initial);
  const initialValue = Object.values(initial).join('');
  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({ ...inputs, [name]: value });
  }

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  };

  useEffect(() => {
    setInputs(initial);
  }, [initialValue]);

  return { inputs, handleChange, resetForm, clearForm };
};
export default useForm;
