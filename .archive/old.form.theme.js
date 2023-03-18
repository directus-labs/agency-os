/ export our definitions using our above
// templates and declare one-offs and
// overrides as needed.
export const formTheme = {
  // the global key will apply to all inputs
  global: {
    outer: 'mb-4 formkit-disabled:opacity-50 ',
    help: 'text-xs text-gray-500',
    messages: 'list-none p-0 mt-1 mb-0',
    message: 'text-red-500 mb-1 text-xs',
  },
  button: buttonClassification,
  color: {
    label: 'block mb-1 font-bold text-sm',
    input:
      'w-16 h-8 appearance-none cursor-pointer border border-gray-300 rounded-md mb-2 p-1',
  },
  date: textClassification,
  'datetime-local': textClassification,
  checkbox: boxClassification,
  email: textClassification,
  file: {
    label: 'block mb-1 font-bold text-sm',
    inner: 'max-w-md cursor-pointer',
    input:
      'text-gray-600 text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-accent file:text-white hover:file:bg-accent',
    noFiles: 'block text-gray-800 text-sm mb-1',
    fileItem: 'block flex text-gray-800 text-sm mb-1',
    fileRemove: 'ml-auto text-accent text-sm',
  },
  month: textClassification,
  number: {
    ...textClassification,
    input:
      'w-full h-10 px-3 border-0 focus:ring-0 text-base text-gray-700 placeholder-gray-400 text-right',
  },
  password: textClassification,
  radio: {
    ...boxClassification,
    input: boxClassification.input.replace('rounded', 'rounded-full'),
  },
  range: {
    inner: 'max-w-md',
    input:
      'form-range appearance-none w-full h-2 p-0 bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:shadow-none',
  },
  search: textClassification,
  select: {
    input: 'pr-3',
    ...textClassification,
  },
  submit: buttonClassification,
  tel: textClassification,
  text: textClassification,
  textarea: {
    ...textClassification,
    input:
      'block w-full h-32 px-3 border-0 text-base  placeholder-gray-400 focus:shadow-outline',
  },
  time: textClassification,
  url: textClassification,
  week: textClassification,
}
