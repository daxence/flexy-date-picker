import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{r as s}from"./iframe-ywIjMFkq.js";import{d as _,g as Le,a as _e,i as Ie,c as d,T as Fe}from"./time-slot-list-O7Y9guTV.js";import"./preload-helper-C1FmrZbK.js";const Re="HH:mm",Oe="Select time";function w({value:c,defaultValue:p,onChange:t,timeStep:j=15,minTime:Ve="00:00",maxTime:we="23:59",schedule:I,timeFormat:q=Re,placeholder:F=Oe,locale:C,date:je,disabledTime:R,inline:a=!1,isDisabled:m=!1,readOnly:l=!1,clearable:qe=!0,onOpen:u,onClose:k,onClear:D,className:O,style:A}){const E=c!==void 0,[Ce,W]=s.useState(p??""),n=E?c??"":Ce,[i,U]=s.useState(!1),f=s.useRef(null),B=s.useCallback(()=>{a||m||l||(U(!0),u==null||u())},[a,m,l,u]),o=s.useCallback(()=>{a||(U(!1),k==null||k())},[a,k]),K=s.useCallback(()=>{i?o():B()},[i,o,B]),M=je??_(),De=I?Le(I):_e(j,Ve,we);s.useEffect(()=>{if(a)return;function r(L){f.current&&!f.current.contains(L.target)&&o()}return i&&document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[i,a,o]),s.useEffect(()=>{if(a)return;function r(L){L.key==="Escape"&&o()}return i&&document.addEventListener("keydown",r),()=>document.removeEventListener("keydown",r)},[i,a,o]);function Ee(r){E||W(r),t==null||t(r),a||o()}function He(r){r.stopPropagation(),E||W(""),t==null||t(""),D==null||D()}const H=n&&!Ie(M,n,R)?_(`2000-01-01T${n}`).locale(C??"en").format(q):n?_(`2000-01-01T${n}`).locale(C??"en").format(q):"",$=e.jsx(Fe,{timeSlots:De,selectedTime:n,onSelectTime:Ee,timeFormat:q,locale:C,targetDate:M,disabledTime:R,isDisabled:m,readOnly:l});return a?e.jsx("div",{ref:f,className:d("hdp-root hdp-root--time-only",O),style:A,"data-inline":"true",children:e.jsx("div",{role:"region","aria-label":"Time picker",className:"hdp-popover hdp-popover--inline hdp-popover--time-only",children:$})}):e.jsxs("div",{ref:f,className:d("hdp-root hdp-root--time-only",O),style:A,"data-open":i,children:[e.jsxs("div",{role:"button",tabIndex:m?-1:0,"aria-label":H||F,"aria-haspopup":"dialog","aria-expanded":i,className:d("hdp-input-wrapper",m&&"hdp-input-wrapper--disabled",l&&"hdp-input-wrapper--readonly",i&&"hdp-input-wrapper--open"),onClick:K,onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&(r.preventDefault(),K())},children:[e.jsxs("svg",{className:"hdp-clock-icon","aria-hidden":"true",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("polyline",{points:"12 6 12 12 16 14"})]}),e.jsx("span",{className:d("hdp-input-value",!H&&"hdp-input-value--placeholder"),children:H||F}),qe&&n&&!m&&!l&&e.jsx("button",{type:"button","aria-label":"Clear time",className:"hdp-clear-button",tabIndex:-1,onClick:He,children:"×"}),e.jsx("svg",{className:d("hdp-input-chevron",i&&"hdp-input-chevron--open"),"aria-hidden":"true",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"6 9 12 15 18 9"})})]}),i&&e.jsx("div",{role:"dialog","aria-label":"Time picker","aria-modal":"false",className:"hdp-popover hdp-popover--time-only",children:$})]})}try{w.displayName="TimePicker",w.__docgenInfo={description:"",displayName:"TimePicker",filePath:"/home/aymen/Desktop/dev/dis/realrate-project-2026 and open source/hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",methods:[],props:{value:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Controlled value in `HH:mm` (24-hour) format",name:"value",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},defaultValue:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Initial value when uncontrolled",name:"defaultValue",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},onChange:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Called with the selected `HH:mm` string, or `''` after clear",name:"onChange",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"((time: string) => void)"}},timeStep:{defaultValue:{value:"15"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Uniform interval in minutes (default 15). Ignored when `schedule` is set.",name:"timeStep",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"number"}},minTime:{defaultValue:{value:"00:00"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Earliest slot in `HH:mm` (default `'00:00'`). Ignored when `schedule` is set.",name:"minTime",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},maxTime:{defaultValue:{value:"23:59"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Latest slot in `HH:mm` (default `'23:59'`). Ignored when `schedule` is set.",name:"maxTime",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},schedule:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Schedule-based slot generation. Each range has its own step interval.\nGaps between ranges produce no slots.\nOverrides `timeStep` / `minTime` / `maxTime` when provided.",name:"schedule",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{example:`schedule={{
  ranges: [
    { from: '08:00', to: '12:00', step: 15 },
    { from: '14:00', to: '17:00', step: 30 },
  ],
}}`},type:{name:"DateSchedule"}},timeFormat:{defaultValue:{value:"HH:mm"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"dayjs format string for slot labels and input display (default `'HH:mm'`)",name:"timeFormat",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},placeholder:{defaultValue:{value:"Select time"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Placeholder shown in the input when no time is selected",name:"placeholder",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},locale:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"dayjs locale string (e.g. `'fr'`, `'ar'`)",name:"locale",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},date:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Reference date used by `disabledTime` predicates.\nDefaults to today when omitted.",name:"date",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"Dayjs"}},disabledTime:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Disable specific slots by weekday / date / predicate",name:"disabledTime",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"DisabledTimeConfig"}},inline:{defaultValue:{value:"false"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:`Render the slot list directly inside the element (no input trigger,
no popover). Useful when embedding in a custom layout.`,name:"inline",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"boolean"}},isDisabled:{defaultValue:{value:"false"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Disable all interaction",name:"isDisabled",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"boolean"}},readOnly:{defaultValue:{value:"false"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Prevent selection while still showing the picker",name:"readOnly",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"boolean"}},clearable:{defaultValue:{value:"true"},declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"Show a clear (×) button when a time is selected",name:"clearable",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"boolean"}},onOpen:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"",name:"onOpen",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"(() => void)"}},onClose:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"",name:"onClose",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"(() => void)"}},onClear:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"",name:"onClear",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"(() => void)"}},className:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"",name:"className",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"string"}},style:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"}],description:"",name:"style",parent:{fileName:"hos-date-picker/src/features/time-picker/components/time-picker/time-picker.tsx",name:"TimePickerProps"},required:!1,tags:{},type:{name:"CSSProperties"}}},tags:{}}}catch{}const Ke={title:"Components/TimePicker",component:w,parameters:{layout:"centered"},argTypes:{value:{control:!1,description:"Controlled value in `HH:mm` format."},defaultValue:{control:!1,description:"Uncontrolled initial value."},timeStep:{control:{type:"number",min:5,max:60,step:5}},minTime:{control:"text"},maxTime:{control:"text"},timeFormat:{control:"text"},inline:{control:"boolean"},isDisabled:{control:"boolean"},readOnly:{control:"boolean"},clearable:{control:"boolean"}},tags:["autodocs"]},h={args:{timeStep:15,minTime:"08:00",maxTime:"18:00"}},g={render:c=>{function p(){const[t,j]=s.useState("09:00");return e.jsxs("div",{children:[e.jsx(w,{...c,value:t,onChange:j}),e.jsxs("p",{style:{marginTop:12,color:"#64748b"},children:["Selected: ",t||"none"]})]})}return e.jsx(p,{})},args:{timeStep:30,minTime:"08:00",maxTime:"20:00"}},P={args:{inline:!0,timeStep:15,minTime:"09:00",maxTime:"17:00",defaultValue:"09:00"}},T={args:{schedule:{ranges:[{from:"08:00",to:"12:00",step:15},{from:"14:00",to:"18:00",step:30}]}}},x={args:{inline:!0,schedule:{ranges:[{from:"08:00",to:"12:00",step:15},{from:"14:00",to:"16:00",step:5},{from:"16:00",to:"18:00",step:10}]}}},y={args:{inline:!0,timeStep:30,minTime:"08:00",maxTime:"18:00",disabledTime:{predicate:(c,p)=>{const[t]=p.split(":").map(Number);return t<9||t>=17}}}},v={args:{isDisabled:!0,defaultValue:"10:00"}},N={args:{readOnly:!0,defaultValue:"10:00"}},b={args:{clearable:!1,defaultValue:"09:00"}},S={args:{timeFormat:"h:mm A",timeStep:30,minTime:"08:00",maxTime:"18:00"}},V={args:{placeholder:"Choose a slot…"}};var G,z,J;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    timeStep: 15,
    minTime: '08:00',
    maxTime: '18:00'
  }
}`,...(J=(z=h.parameters)==null?void 0:z.docs)==null?void 0:J.source}}};var Q,X,Y;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => {
    function ControlledTimePicker() {
      const [value, setValue] = useState('09:00');
      return <div>
          <TimePicker {...args} value={value} onChange={setValue} />
          <p style={{
          marginTop: 12,
          color: '#64748b'
        }}>Selected: {value || 'none'}</p>
        </div>;
    }
    return <ControlledTimePicker />;
  },
  args: {
    timeStep: 30,
    minTime: '08:00',
    maxTime: '20:00'
  }
}`,...(Y=(X=g.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,re;P.parameters={...P.parameters,docs:{...(Z=P.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    inline: true,
    timeStep: 15,
    minTime: '09:00',
    maxTime: '17:00',
    defaultValue: '09:00'
  }
}`,...(re=(ee=P.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var te,ie,ae;T.parameters={...T.parameters,docs:{...(te=T.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    schedule: {
      ranges: [{
        from: '08:00',
        to: '12:00',
        step: 15
      }, {
        from: '14:00',
        to: '18:00',
        step: 30
      }]
    }
  }
}`,...(ae=(ie=T.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var se,ne,oe;x.parameters={...x.parameters,docs:{...(se=x.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    inline: true,
    schedule: {
      ranges: [{
        from: '08:00',
        to: '12:00',
        step: 15
      }, {
        from: '14:00',
        to: '16:00',
        step: 5
      }, {
        from: '16:00',
        to: '18:00',
        step: 10
      }]
    }
  }
}`,...(oe=(ne=x.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var ce,me,pe;y.parameters={...y.parameters,docs:{...(ce=y.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    inline: true,
    timeStep: 30,
    minTime: '08:00',
    maxTime: '18:00',
    disabledTime: {
      predicate: (_date, time) => {
        const [hour] = time.split(':').map(Number);
        return hour < 9 || hour >= 17;
      }
    }
  }
}`,...(pe=(me=y.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var le,de,ue;v.parameters={...v.parameters,docs:{...(le=v.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    isDisabled: true,
    defaultValue: '10:00'
  }
}`,...(ue=(de=v.parameters)==null?void 0:de.docs)==null?void 0:ue.source}}};var ke,fe,he;N.parameters={...N.parameters,docs:{...(ke=N.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    readOnly: true,
    defaultValue: '10:00'
  }
}`,...(he=(fe=N.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};var ge,Pe,Te;b.parameters={...b.parameters,docs:{...(ge=b.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    clearable: false,
    defaultValue: '09:00'
  }
}`,...(Te=(Pe=b.parameters)==null?void 0:Pe.docs)==null?void 0:Te.source}}};var xe,ye,ve;S.parameters={...S.parameters,docs:{...(xe=S.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    timeFormat: 'h:mm A',
    timeStep: 30,
    minTime: '08:00',
    maxTime: '18:00'
  }
}`,...(ve=(ye=S.parameters)==null?void 0:ye.docs)==null?void 0:ve.source}}};var Ne,be,Se;V.parameters={...V.parameters,docs:{...(Ne=V.parameters)==null?void 0:Ne.docs,source:{originalSource:`{
  args: {
    placeholder: 'Choose a slot…'
  }
}`,...(Se=(be=V.parameters)==null?void 0:be.docs)==null?void 0:Se.source}}};const Me=["Default","Controlled","Inline","WithSchedule","InlineWithSchedule","DisabledSlots","Disabled","ReadOnly","NoClear","CustomFormat","CustomPlaceholder"];export{g as Controlled,S as CustomFormat,V as CustomPlaceholder,h as Default,v as Disabled,y as DisabledSlots,P as Inline,x as InlineWithSchedule,b as NoClear,N as ReadOnly,T as WithSchedule,Me as __namedExportsOrder,Ke as default};
