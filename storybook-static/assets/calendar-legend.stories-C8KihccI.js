import{j as e}from"./jsx-runtime-BjG_zV1W.js";const j=[{label:"Dates Sélectionnées",className:"hdp-legend-box--selected"},{label:"Disponibilité",className:"hdp-legend-box--available"},{label:"Pas De Disponibilité",className:"hdp-legend-box--unavailable"},{label:"Séjour Minimal",className:"hdp-legend-box--minimal-stay"},{label:"Pas D'Arrivée",className:"hdp-legend-box--no-arrival"}];function r({items:t=j,className:D,style:C}){return e.jsx("div",{className:`hdp-calendar-legend ${D||""}`,style:C,children:t.map((c,L)=>e.jsxs("div",{className:"hdp-legend-item",children:[e.jsx("div",{className:`hdp-legend-box ${c.className}`}),e.jsx("span",{className:"hdp-legend-label",children:c.label})]},L))})}try{r.displayName="CalendarLegend",r.__docgenInfo={description:"",displayName:"CalendarLegend",filePath:"/home/aymen/Desktop/dev/dis/realrate-project-2026 and open source/hos-date-picker/src/features/date-picker/components/calendar-legend/calendar-legend.tsx",methods:[],props:{items:{defaultValue:{value:`[
  { label: 'Dates Sélectionnées', className: 'hdp-legend-box--selected' },
  { label: 'Disponibilité', className: 'hdp-legend-box--available' },
  { label: 'Pas De Disponibilité', className: 'hdp-legend-box--unavailable' },
  { label: 'Séjour Minimal', className: 'hdp-legend-box--minimal-stay' },
  { label: "Pas D'Arrivée", className: 'hdp-legend-box--no-arrival' },
]`},declarations:[{fileName:"hos-date-picker/src/features/date-picker/components/calendar-legend/calendar-legend.tsx",name:"CalendarLegendProps"}],description:"",name:"items",parent:{fileName:"hos-date-picker/src/features/date-picker/components/calendar-legend/calendar-legend.tsx",name:"CalendarLegendProps"},required:!1,tags:{},type:{name:"LegendItem[]"}},className:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/date-picker/components/calendar-legend/calendar-legend.tsx",name:"CalendarLegendProps"}],description:"",name:"className",parent:{fileName:"hos-date-picker/src/features/date-picker/components/calendar-legend/calendar-legend.tsx",name:"CalendarLegendProps"},required:!1,tags:{},type:{name:"string"}},style:{defaultValue:null,declarations:[{fileName:"hos-date-picker/src/features/date-picker/components/calendar-legend/calendar-legend.tsx",name:"CalendarLegendProps"}],description:"",name:"style",parent:{fileName:"hos-date-picker/src/features/date-picker/components/calendar-legend/calendar-legend.tsx",name:"CalendarLegendProps"},required:!1,tags:{},type:{name:"CSSProperties"}}},tags:{}}}catch{}const _={title:"Components/CalendarLegend",component:r,parameters:{layout:"centered"},tags:["autodocs"]},a={args:{}},s={args:{items:[{label:"Available",className:"hdp-legend-box--available"},{label:"Selected",className:"hdp-legend-box--selected"},{label:"Unavailable",className:"hdp-legend-box--unavailable"}]}},l={args:{className:"custom-legend",style:{background:"#f0f0f0",padding:"20px",borderRadius:"8px"}}},n={args:{items:[{label:"Selected Dates",className:"hdp-legend-box--selected"}]}},d={args:{items:[{label:e.jsxs("span",{children:[e.jsx("strong",{children:"Selected"})," dates"]}),className:"hdp-legend-box--selected"},{label:e.jsx("span",{style:{fontStyle:"italic"},children:"Available"}),className:"hdp-legend-box--available"}]}};var o,i,p;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {}
}`,...(p=(i=a.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var m,g,b;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Available',
      className: 'hdp-legend-box--available'
    }, {
      label: 'Selected',
      className: 'hdp-legend-box--selected'
    }, {
      label: 'Unavailable',
      className: 'hdp-legend-box--unavailable'
    }]
  }
}`,...(b=(g=s.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var u,h,x;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    className: 'custom-legend',
    style: {
      background: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px'
    }
  }
}`,...(x=(h=l.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var N,f,v;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Selected Dates',
      className: 'hdp-legend-box--selected'
    }]
  }
}`,...(v=(f=n.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var S,y,k;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items: [{
      label: <span><strong>Selected</strong> dates</span>,
      className: 'hdp-legend-box--selected'
    }, {
      label: <span style={{
        fontStyle: 'italic'
      }}>Available</span>,
      className: 'hdp-legend-box--available'
    }]
  }
}`,...(k=(y=d.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};const A=["Default","CustomItems","WithCustomStyling","SingleItem","WithReactNodeLabels"];export{s as CustomItems,a as Default,n as SingleItem,l as WithCustomStyling,d as WithReactNodeLabels,A as __namedExportsOrder,_ as default};
