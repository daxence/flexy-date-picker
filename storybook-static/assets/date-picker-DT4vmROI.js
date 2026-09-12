import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{u as l,M as a,C as d,a as t,A as h}from"./blocks-DvYwaqPZ.js";import{D as r,a as i,P as c,R as j,I as x,b as p,W as f,c as u,d as m,M as g,e as y,f as b,S as k,g as D,h as S,i as v,j as w,N as R,k as T,T as C,l as M,m as I,n as P,o as A,C as N,p as W}from"./date-picker.stories-BXxqdxh2.js";import"./preload-helper-C1FmrZbK.js";import"./iframe-ywIjMFkq.js";import"./index-B9tOt9gZ.js";import"./time-slot-list-O7Y9guTV.js";function o(s){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",p:"p",pre:"pre",strong:"strong",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:r}),`
`,e.jsx(n.h1,{id:"datepicker",children:"DatePicker"}),`
`,e.jsxs(n.p,{children:[`A fully customizable React date picker with single & range selection, time
picking, CSS token theming, rich tooltips, slot overrides, and full event
support. It ships zero-dependency beyond React and
`,e.jsx(n.a,{href:"https://day.js.org/",rel:"nofollow",children:"dayjs"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install hos-date-picker
`})}),`
`,e.jsx(n.p,{children:"Import the CSS once in your app entry file:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`import 'hos-date-picker/styles';
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"quick-start",children:"Quick start"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { DatePicker } from 'hos-date-picker';

function App() {
  return (
    <DatePicker
      placeholder="Select date"
      onDateChange={(d) => console.log(d?.format('YYYY-MM-DD'))}
    />
  );
}
`})}),`
`,e.jsx(d,{of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"interactive-playground",children:"Interactive playground"}),`
`,e.jsx(n.p,{children:"Every prop is wired to a live Control — use the panel below to experiment."}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t,{of:c}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"selection-modes",children:"Selection modes"}),`
`,e.jsx(n.h3,{id:"single-default",children:"Single (default)"}),`
`,e.jsxs(n.p,{children:["Click any day to select a single date. ",e.jsx(n.code,{children:"onDateChange"}),` is called with a
`,e.jsx(n.code,{children:"dayjs"})," object (or ",e.jsx(n.code,{children:"null"})," on clear)."]}),`
`,e.jsx(d,{of:i}),`
`,e.jsx(n.h3,{id:"range",children:"Range"}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:'mode="range"'}),` to enable two-step selection: first click sets the
`,e.jsx(n.strong,{children:"start"})," date, second click sets the ",e.jsx(n.strong,{children:"end"}),` date.
`,e.jsx(n.code,{children:"onRangeChange"})," receives ",e.jsx(n.code,{children:"{ start, end }"}),"."]}),`
`,e.jsx(d,{of:j}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"inline-calendar",children:"Inline calendar"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"inline"})," to embed the calendar directly without an input trigger."]}),`
`,e.jsx(d,{of:x}),`
`,e.jsx(n.h3,{id:"inline-range-with-two-panels",children:"Inline range with two panels"}),`
`,e.jsx(d,{of:p}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"time-picker",children:"Time picker"}),`
`,e.jsxs(n.p,{children:["Enable ",e.jsx(n.code,{children:"enableTime"}),` to add a scrollable time-slot list. Constrain the
available slots with `,e.jsx(n.code,{children:"minTime"}),", ",e.jsx(n.code,{children:"maxTime"}),", and ",e.jsx(n.code,{children:"timeStep"}),"."]}),`
`,e.jsx(d,{of:f}),`
`,e.jsx(d,{of:u}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"disabled-dates",children:"Disabled dates"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"disabled"})," prop accepts:"]}),`
`,e.jsxs(n.p,{children:[`| Shape | Behaviour |
|-------|-----------|
| `,e.jsx(n.code,{children:"true"}),` | Disable every date |
| `,e.jsx(n.code,{children:"{ before }"}),` | Disable dates before the given dayjs |
| `,e.jsx(n.code,{children:"{ after }"}),` | Disable dates after the given dayjs |
| `,e.jsx(n.code,{children:"{ dates }"}),` | Disable a specific list of dayjs values |
| `,e.jsx(n.code,{children:"{ predicate }"})," | Disable any date where the function returns ",e.jsx(n.code,{children:"true"})," |"]}),`
`,e.jsx(n.p,{children:"All shapes can be combined in a single object."}),`
`,e.jsx(d,{of:m}),`
`,e.jsx(d,{of:g}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"default-values",children:"Default values"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"defaultValue"})," (single) or ",e.jsx(n.code,{children:"defaultRangeValue"}),` (range) to pre-select
dates in `,e.jsx(n.strong,{children:"uncontrolled"})," mode."]}),`
`,e.jsx(d,{of:y}),`
`,e.jsx(d,{of:b}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"adjacent-month-days",children:"Adjacent month days"}),`
`,e.jsxs(n.p,{children:["By default (",e.jsx(n.code,{children:"showAdjacentMonthDays: false"}),`) the grid only shows days of the
current month. Set it to `,e.jsx(n.code,{children:"true"}),` to fill the grid with greyed-out overflow
days.`]}),`
`,e.jsx(d,{of:k}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"week-start-day",children:"Week start day"}),`
`,e.jsx(d,{of:D}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"multiple-months",children:"Multiple months"}),`
`,e.jsx(d,{of:S}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"states",children:"States"}),`
`,e.jsx(n.h3,{id:"disabled-picker",children:"Disabled picker"}),`
`,e.jsx(d,{of:v}),`
`,e.jsx(n.h3,{id:"read-only",children:"Read-only"}),`
`,e.jsx(d,{of:w}),`
`,e.jsx(n.h3,{id:"no-clear-button",children:"No clear button"}),`
`,e.jsx(d,{of:R}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"tooltips",children:"Tooltips"}),`
`,e.jsxs(n.p,{children:["Pass a ",e.jsx(n.code,{children:"string"}),", ",e.jsx(n.code,{children:"ReactNode"}),", or a ",e.jsx(n.strong,{children:"render function"}),` to add tooltips to
day cells. The function receives `,e.jsx(n.code,{children:"{ date, isToday, isSelected, isDisabled, isRangeStart, isRangeEnd, isInRange }"}),"."]}),`
`,e.jsx(d,{of:T}),`
`,e.jsx(d,{of:C}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"theming",children:"Theming"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"theme"}),` prop accepts an object whose keys map directly to CSS custom
properties. All tokens and their CSS variable names are listed in the
`,e.jsx(n.strong,{children:"Theme tokens"})," section below."]}),`
`,e.jsx(n.h3,{id:"teal",children:"Teal"}),`
`,e.jsx(d,{of:M}),`
`,e.jsx(n.h3,{id:"purple",children:"Purple"}),`
`,e.jsx(d,{of:I}),`
`,e.jsx(n.h3,{id:"rose",children:"Rose"}),`
`,e.jsx(d,{of:P}),`
`,e.jsx(n.h3,{id:"dark-amber",children:"Dark (amber)"}),`
`,e.jsx(d,{of:A}),`
`,e.jsx(n.h4,{id:"theme-tokens-reference",children:"Theme tokens reference"}),`
`,e.jsxs(n.p,{children:[`| Prop key | CSS variable | Default |
|---|---|---|
| `,e.jsx(n.code,{children:"primary"})," | ",e.jsx(n.code,{children:"--hdp-primary"})," | ",e.jsx(n.code,{children:"#0f766e"}),` |
| `,e.jsx(n.code,{children:"primaryHover"})," | ",e.jsx(n.code,{children:"--hdp-primary-hover"})," | ",e.jsx(n.code,{children:"#115e59"}),` |
| `,e.jsx(n.code,{children:"primaryForeground"})," | ",e.jsx(n.code,{children:"--hdp-primary-foreground"})," | ",e.jsx(n.code,{children:"#ffffff"}),` |
| `,e.jsx(n.code,{children:"background"})," | ",e.jsx(n.code,{children:"--hdp-background"})," | ",e.jsx(n.code,{children:"#f8fafc"}),` |
| `,e.jsx(n.code,{children:"surface"})," | ",e.jsx(n.code,{children:"--hdp-surface"})," | ",e.jsx(n.code,{children:"rgba(255,255,255,0.88)"}),` |
| `,e.jsx(n.code,{children:"surfaceStrong"})," | ",e.jsx(n.code,{children:"--hdp-surface-strong"})," | ",e.jsx(n.code,{children:"rgba(255,255,255,0.98)"}),` |
| `,e.jsx(n.code,{children:"foreground"})," | ",e.jsx(n.code,{children:"--hdp-foreground"})," | ",e.jsx(n.code,{children:"#0f172a"}),` |
| `,e.jsx(n.code,{children:"muted"})," | ",e.jsx(n.code,{children:"--hdp-muted"})," | ",e.jsx(n.code,{children:"#e6fffb"}),` |
| `,e.jsx(n.code,{children:"accentSoft"})," | ",e.jsx(n.code,{children:"--hdp-accent-soft"})," | ",e.jsx(n.code,{children:"rgba(15,118,110,0.12)"}),` |
| `,e.jsx(n.code,{children:"mutedForeground"})," | ",e.jsx(n.code,{children:"--hdp-muted-foreground"})," | ",e.jsx(n.code,{children:"#64748b"}),` |
| `,e.jsx(n.code,{children:"border"})," | ",e.jsx(n.code,{children:"--hdp-border"})," | ",e.jsx(n.code,{children:"rgba(148,163,184,0.28)"}),` |
| `,e.jsx(n.code,{children:"inputBackground"})," | ",e.jsx(n.code,{children:"--hdp-input-background"})," | ",e.jsx(n.code,{children:"var(--hdp-surface)"}),` |
| `,e.jsx(n.code,{children:"borderRadius"})," | ",e.jsx(n.code,{children:"--hdp-border-radius"})," | ",e.jsx(n.code,{children:"16px"}),` |
| `,e.jsx(n.code,{children:"dayBorderRadius"})," | ",e.jsx(n.code,{children:"--hdp-day-border-radius"})," | ",e.jsx(n.code,{children:"14px"}),` |
| `,e.jsx(n.code,{children:"shadow"})," | ",e.jsx(n.code,{children:"--hdp-shadow"})," | ",e.jsx(n.em,{children:"deep shadow"}),` |
| `,e.jsx(n.code,{children:"fontFamily"})," | ",e.jsx(n.code,{children:"--hdp-font-family"}),` | Inter, system-ui |
| `,e.jsx(n.code,{children:"fontSize"})," | ",e.jsx(n.code,{children:"--hdp-font-size"})," | ",e.jsx(n.code,{children:"14px"}),` |
| `,e.jsx(n.code,{children:"todayColor"})," | ",e.jsx(n.code,{children:"--hdp-today-color"})," | ",e.jsx(n.code,{children:"#0f766e"}),` |
| `,e.jsx(n.code,{children:"disabledOpacity"})," | ",e.jsx(n.code,{children:"--hdp-disabled-opacity"})," | ",e.jsx(n.code,{children:"0.38"}),` |
| `,e.jsx(n.code,{children:"transitionDuration"})," | ",e.jsx(n.code,{children:"--hdp-transition-duration"})," | ",e.jsx(n.code,{children:"150ms"}),` |
| `,e.jsx(n.code,{children:"zIndex"})," | ",e.jsx(n.code,{children:"--hdp-z-index"})," | ",e.jsx(n.code,{children:"9999"})," |"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"custom-renderers",children:"Custom renderers"}),`
`,e.jsx(n.h3,{id:"renderday",children:e.jsx(n.code,{children:"renderDay"})}),`
`,e.jsx(n.p,{children:"Replace the day cell content with any React tree."}),`
`,e.jsx(d,{of:N}),`
`,e.jsx(n.h3,{id:"rendernavbutton",children:e.jsx(n.code,{children:"renderNavButton"})}),`
`,e.jsx(n.p,{children:"Replace the prev/next navigation buttons."}),`
`,e.jsx(d,{of:W}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"full-prop-reference",children:"Full prop reference"}),`
`,e.jsx(h,{of:r})]})}function U(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{U as default};
