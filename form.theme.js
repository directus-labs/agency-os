// The following Tailwind theme aspires to be a reproduction of the
// default optional Genesis CSS theme that ships with FormKit

export default {
  // Global styles apply to _all_ inputs with matching section keys
  global: {
    fieldset: 'max-w-md border border-gray-300 rounded px-2 pb-1',
    help: 'text-xs text-gray-500',
    inner:
      'formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none font-ui',
    input:
      'appearance-none bg-white rounded-md focus:outline-none focus:ring-0 focus:shadow-none',
    label: 'block mb-1 font-bold text-sm text-gray-700 font-ui',
    legend: 'font-bold text-sm',
    loaderIcon: 'inline-flex items-center w-4 text-gray-600 animate-spin',
    message: 'text-red-500 mb-1 text-xs',
    messages: 'list-none p-0 mt-1 mb-0',
    outer: 'mb-4 formkit-disabled:opacity-50',
    prefixIcon:
      'w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-300 bg-white bg-gradient-to-b from-transparent to-gray-200 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
    suffixIcon:
      'w-7 pr-3 flex self-stretch grow-0 shrink-0 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
  },

  // Family styles apply to all inputs that share a common family
  'family:box': {
    decorator:
      'block relative h-5 w-5 mr-2 rounded-md  bg-gradient-to-b from-transparent to-gray-200 ring-1 ring-gray-300 peer-checked:ring-accent text-transparent peer-checked:text-accent',
    decoratorIcon:
      'flex p-[3px] w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
    help: 'mb-2 mt-1.5',
    input:
      'fixed left-[999em] w-0 h-0 overflow-hidden opacity-0 pointer-events-none peer bg-white rounded',
    label: '$reset text-sm text-gray-700 mt-1 select-none',
    wrapper: 'flex items-center mb-1',
  },
  'family:button': {
    input:
      '$reset inline-flex items-center bg-primary-600 text-white text-sm font-medium py-3 px-6 rounded',
    wrapper: 'mb-1',
    prefixIcon: '$reset block w-4 -ml-2 mr-2 stretch',
    suffixIcon: '$reset block w-4 ml-2 stretch',
  },
  'family:dropdown': {
    dropdownWrapper:
      'my-2 w-full drop-shadow-lg rounded [&::-webkit-scrollbar]:hidden',
    inner:
      'max-w-md relative flex ring-1 ring-gray-300 focus-within:ring-accent focus-within:ring-2 rounded mb-1 formkit-disabled:focus-within:ring-gray-300 formkit-disabled:focus-within:ring-1 [&>span:first-child]:focus-within:text-accent',
    input: 'w-full px-3 py-2',
    listbox: 'bg-white drop-shadow-lg rounded overflow-hidden',
    listboxButton: 'flex w-12 self-stretch justify-center mx-auto',
    listitem:
      'pl-7 relative hover:bg-gray-300 data-[is-active="true"]:bg-gray-300 data-[is-active="true"]:aria-selected:bg-primary-600 aria-selected:bg-primary-600 aria-selected:text-white',
    loaderIcon: 'ml-auto',
    loadMoreInner:
      'flex items-center justify-center text-sm p-2 text-center w-full text-accent formkit-loading:text-gray-500 cursor-pointer [&>span]:mr-3 [&>span]:ml-0',
    option: 'p-2.5',
    optionLoading: 'text-gray-500',
    placeholder: 'p-2.5 text-gray-400',
    selector: 'flex w-full justify-between items-center [&u]',
    selectedIcon: 'block absolute top-1/2 left-2 w-3 -translate-y-1/2',
    selectIcon: 'flex box-content w-4 px-2 self-stretch grow-0 shrink-0',
  },
  'family:text': {
    inner:
      'flex items-center max-w-md ring-1 ring-gray-300 focus-within:ring-accent focus-within:ring-2 [&>label:first-child]:focus-within:text-accent rounded mb-1',
    input:
      'w-full px-3 py-2 border-none text-base text-gray-700 placeholder-gray-400',
  },

  // Specific styles apply only to a given input type
  color: {
    inner:
      'flex max-w-[5.5em] w-full formkit-prefix-icon:max-w-[7.5em] formkit-suffix-icon:formkit-prefix-icon:max-w-[10em]',
    input:
      '$reset appearance-none w-full cursor-pointer border-none rounded p-0 m-0 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none',
    suffixIcon: 'min-w-[2.5em] pr-0 pl-0 m-auto',
  },
  file: {
    fileItem: 'flex items-center text-gray-800 mb-1 last:mb-0',
    fileItemIcon: 'w-4 mr-2 shrink-0',
    fileList:
      'shrink grow peer px-3 py-2 formkit-multiple:data-[has-multiple="true"]:mb-6',
    fileName: 'break-all grow text-ellipsis',
    fileRemove:
      'relative z-[2] ml-auto text-[0px] hover:text-red-500 pl-2 peer-data-[has-multiple=true]:text-sm peer-data-[has-multiple=true]:text-accent peer-data-[has-multiple=true]:ml-3 peer-data-[has-multiple=true]:mb-2 formkit-multiple:bottom-[0.15em] formkit-multiple:pl-0 formkit-multiple:ml-0 formkit-multiple:left-[1em] formkit-multiple:formkit-prefix-icon:left-[3.75em]',
    fileRemoveIcon: 'block text-base w-3 relative z-[2]',
    inner:
      'relative max-w-md cursor-pointer formkit-multiple:[&>button]:absolute',
    input:
      'cursor-pointer text-transparent absolute top-0 right-0 left-0 bottom-0 opacity-0 z-[2]',
    noFiles: 'flex w-full items-center px-3 py-2 text-gray-400',
    noFilesIcon: 'w-4 mr-2',
  },
  radio: {
    decorator: 'rounded-full',
    decoratorIcon: 'w-5 p-[5px]',
  },
  range: {
    inner: '$reset flex items-center max-w-md',
    input: '$reset w-full mb-1 h-2 p-0 rounded-full',
    prefixIcon:
      '$reset w-4 mr-1 flex self-stretch grow-0 shrink-0 [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
    suffixIcon:
      '$reset w-4 ml-1 flex self-stretch grow-0 shrink-0 [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto',
  },
  select: {
    inner:
      'flex relative items-center rounded mb-1 ring-1 ring-gray-300 focus-within:ring-accent focus-within:ring-2 [&>span:first-child]:focus-within:text-accent',
    input:
      'w-full pl-3 pr-8 py-2 border-none text-base text-gray-700 placeholder-gray-400 formkit-multiple:p-0 data-[placeholder="true"]:text-gray-400 formkit-multiple:data-[placeholder="true"]:text-inherit',
    selectIcon:
      'flex p-[3px] shrink-0 w-5 mr-2 -ml-[1.5em] h-full pointer-events-none',
    option: 'formkit-multiple:p-3 formkit-multiple:text-sm text-gray-700',
  },
  textarea: {
    inner:
      'flex rounded mb-1 ring-1 ring-gray-300 focus-within:ring-accent [&>label:first-child]:focus-within:text-accent',
    input:
      'block w-full h-32 px-3 py-3 border-none text-base text-gray-700 placeholder-gray-400 focus:shadow-outline',
  },

  // PRO input styles
  autocomplete: {
    closeIcon: 'block grow-0 shrink-0 w-3 mr-3.5',
    inner: '[&>div>[data-value]]:absolute [&>div>[data-value]]:mb-0',
    option: 'grow text-ellipsis',
    selection:
      'static flex left-0 top-0 right-0 bottom-0 mt-0 mb-2 rounded bg-gray-100',
  },
  mask: {
    inner:
      'flex items-center max-w-md ring-1 ring-gray-300 focus-within:ring-accent focus-within:ring-2 [&>label:first-child]:focus-within:text-accent rounded mb-1',
    input:
      'w-full px-3 py-2 border-none text-base text-gray-700 placeholder-gray-400',
  },
  rating: {
    inner: 'relative flex items-center w-[8em] formkit-disabled:bg-transparent',
    itemsWrapper: 'w-full',
    onItems: 'text-yellow-400',
    onItemWrapper:
      '[&>*]:w-full [&>svg]:h-auto [&>svg]:max-w-none [&>svg]:max-h-none',
    offItems: 'text-gray-500',
    offItemWrapper:
      '[&>*]:w-full [&>svg]:h-auto [&>svg]:max-w-none [&>svg]:max-h-none',
  },
  repeater: {
    content: 'grow p-3 flex flex-col align-center',
    controlLabel: 'absolute opacity-0 pointer-events-none',
    controls: 'flex flex-col items-center justify-center bg-gray-100 p-3',
    downControl:
      'hover:text-accent disabled:hover:text-inherit disabled:opacity-25',
    fieldset: 'py-4 px-5',
    help: 'mb-2 mt-1.5',
    item: 'flex w-full mb-1 rounded border border-gray-200',
    moveDownIcon: 'block w-3 my-1',
    moveUpIcon: 'block w-3 my-1',
    removeControl:
      'hover:text-accent disabled:hover:text-inherit disabled:opacity-25',
    removeIcon: 'block w-5 my-1',
    upControl:
      'hover:text-accent disabled:hover:text-inherit disabled:opacity-25',
  },
  taglist: {
    input: 'px-1 py-1 w-[0%] grow border-0',
    removeSelection: 'w-2.5 mx-1 self-center text-black leading-none',
    tag: 'flex items-center my-1 p-1 bg-gray-200 text-xs rounded-lg',
    tagWrapper:
      'mr-1 focus:outline-none focus:text-white [&>div]:focus:bg-accent [&>div>button]:focus:text-white',
    tagLabel: 'pl-2 pr-1',
    tags: 'flex items-center flex-wrap w-full py-1.5 px-2',
  },
  toggle: {
    altLabel: 'block w-full mb-1 font-bold text-sm',
    inner: '$reset inline-block mr-2',
    input: 'peer fixed left-[999em] opacity-0 pointer-events-none',
    innerLabel:
      'text-[10px] font-bold absolute left-full top-1/2 -translate-x-full -translate-y-1/2 px-1',
    thumb:
      'relative left-0 aspect-square rounded-full transition-all w-5 bg-gray-100',
    track:
      'p-0.5 min-w-[3em] relative rounded-full transition-all bg-gray-400 peer-checked:bg-accent peer-checked:[&>div:last-child]:left-full peer-checked:[&>div:last-child]:-translate-x-full peer-checked:[&>div:first-child:not(:last-child)]:left-0 peer-checked:[&>div:first-child:not(:last-child)]:translate-x-0',
    valueLabel: 'font-bold text-sm',
    wrapper: 'flex flex-wrap items-center mb-1',
  },
}

// Create some re-useable definitions because
// many input types are identical in how
// we want to style them.
const textClassification = {
  label:
    'block mb-1 font-bold text-sm formkit-invalid:text-red-500 text-gray-700 dark:text-gray-300 font-mono',
  inner: `flex items-center max-w-md
        border
        border-gray-300
        formkit-invalid:border-red-500
        mb-1

        overflow-hidden
        focus-within:ring-accent
        focus-within:border-accent
        focus-within:ring-1
        transition duration-150
      `,
  input: `w-full h-10 px-3 border-0 focus:ring-0 text-lg md:text-base text-gray-700 placeholder-gray-400`,
}
const boxClassification = {
  fieldset: 'max-w-md border border-gray-300 rounded-md px-2 pb-1',
  legend: 'font-bold text-sm',
  wrapper: 'flex items-center mb-2 cursor-pointer',
  help: 'mb-2',
  input:
    ' appearance-none h-5 w-5 mr-2 border border-gray-400 rounded bg-white text-accent focus:ring-offset-2 focus:ring-accent focus:outline-none focus:ring-1   transition duration-150',
  label: 'text-sm text-gray-700 font-ui mt-1',
}
const buttonClassification = {
  wrapper: 'mb-1',
  input: 'btn btn-primary',
}

// export our definitions using our above
// templates and declare one-offs and
// overrides as needed.
export const formTheme = {
  // the global key will apply to all inputs
  global: {
    outer: 'mb-6 formkit-disabled:opacity-50 ',
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
      'text-gray-600 text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-accent file:text-white hover:file:bg-primary-600',
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
