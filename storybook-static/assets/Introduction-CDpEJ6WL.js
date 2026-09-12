import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{u as s,M as o}from"./blocks-DvYwaqPZ.js";import"./preload-helper-C1FmrZbK.js";import"./iframe-ywIjMFkq.js";import"./index-B9tOt9gZ.js";function t(r){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"hos-date-picker",children:"hos-date-picker"}),`
`,e.jsx(n.p,{children:`A fully customizable React date picker library — built with TypeScript, Vite,
and dayjs.`}),`
`,e.jsx(n.h2,{id:"features-at-a-glance",children:"Features at a glance"}),`
`,e.jsxs(n.p,{children:[`| Feature | Details |
|---|---|
| `,e.jsx(n.strong,{children:"Single & range selection"}),` | Pick one date or a start/end range |
| `,e.jsx(n.strong,{children:"Inline or popover"}),` | Embed the calendar or use the default input trigger |
| `,e.jsx(n.strong,{children:"Time picker"}),` | Scrollable time-slot panel with configurable step |
| `,e.jsx(n.strong,{children:"CSS token theming"})," | Override any design token via ",e.jsx(n.code,{children:"theme"}),` prop or CSS variables |
| `,e.jsx(n.strong,{children:"Slot overrides"})," | Fine-grained ",e.jsx(n.code,{children:"classNames"})," / ",e.jsx(n.code,{children:"styles"}),` per UI slot |
| `,e.jsx(n.strong,{children:"Custom renderers"})," | ",e.jsx(n.code,{children:"renderDay"}),", ",e.jsx(n.code,{children:"renderNavButton"}),", ",e.jsx(n.code,{children:"renderInput"}),` |
| `,e.jsx(n.strong,{children:"Disabled rules"}),` | Before/after bounds, date list, weekday predicate |
| `,e.jsx(n.strong,{children:"Tooltips"}),` | String, ReactNode, or context-aware render function |
| `,e.jsx(n.strong,{children:"Multi-month"})," | Show ",e.jsx(n.code,{children:"numberOfMonths"}),` panels side by side |
| `,e.jsx(n.strong,{children:"Accessible"}),` | Keyboard navigation, ARIA labels, focus management |
| `,e.jsx(n.strong,{children:"Controlled & uncontrolled"})," | Works with or without external state |"]}),`
`,e.jsx(n.h2,{id:"package-info",children:"Package info"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install hos-date-picker
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// 1. Import the styles once
import 'hos-date-picker/styles';

// 2. Use the component
import { DatePicker } from 'hos-date-picker';

<DatePicker onDateChange={(d) => console.log(d)} />
`})}),`
`,e.jsx(n.h2,{id:"storybook-structure",children:"Storybook structure"}),`
`,e.jsxs(n.p,{children:[`| Section | What's inside |
|---|---|
| `,e.jsx(n.strong,{children:"Components / DatePicker"}),` | All stories + live Controls for every prop |
| `,e.jsx(n.strong,{children:"Components / DatePicker (docs)"})," | Full MDX documentation with examples |"]}),`
`,e.jsxs(n.p,{children:["Navigate to ",e.jsx(n.strong,{children:"Components → DatePicker"})," to start exploring."]})]})}function h(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(t,{...r})}):t(r)}export{h as default};
