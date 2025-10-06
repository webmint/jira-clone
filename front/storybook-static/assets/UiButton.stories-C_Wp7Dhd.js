import{f as o,w as D,u as s,e as t}from"./index-BK-8tX7l.js";import{d as R,b as V,e as T,f as A,g as q,j as L,t as j,n as F,o as H}from"./vue.esm-bundler-CL4nnvHA.js";const P=["disabled"],U={key:0,class:"mr-2 h-4 w-4 animate-spin",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","aria-hidden":"true"},N=R({__name:"UiButton",props:{label:{},variant:{default:"primary"},size:{default:"md"},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1}},emits:["click"],setup(e,{emit:r}){const n=e,a=r,E=i=>{!n.disabled&&!n.loading&&a("click",i)},M=V(()=>{const i="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",l={primary:"bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",secondary:"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400",danger:"bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",ghost:"text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400"},I={sm:"px-3 py-1.5 text-sm rounded-md",md:"px-4 py-2 text-base rounded-lg",lg:"px-6 py-3 text-lg rounded-lg"};return[i,l[n.variant],I[n.size]].join(" ")});return(i,l)=>(H(),T("button",{type:"button",class:F(M.value),disabled:e.disabled||e.loading,onClick:E},[e.loading?(H(),T("svg",U,[...l[0]||(l[0]=[L("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"},null,-1),L("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"},null,-1)])])):A("",!0),q(" "+j(e.label),1)],10,P))}});N.__docgenInfo={exportName:"default",displayName:"UiButton",description:"",tags:{},props:[{name:"label",description:"Button label text",required:!0,type:{name:"string"}},{name:"variant",description:"Visual style variant",required:!1,type:{name:"union",elements:[{name:'"primary"'},{name:'"secondary"'},{name:'"danger"'},{name:'"ghost"'}]},defaultValue:{func:!1,value:"'primary'"}},{name:"size",description:"Size variation",required:!1,type:{name:"union",elements:[{name:'"sm"'},{name:'"md"'},{name:'"lg"'}]},defaultValue:{func:!1,value:"'md'"}},{name:"disabled",description:"Disabled state",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loading",description:"Loading state",required:!1,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"click",type:{names:["MouseEvent"]}}],sourceFiles:["/Users/mykolakudlyk/Projects/private/jira-clone/front/src/components/atoms/Button/UiButton.vue"]};const O={title:"Atoms/UiButton",component:N,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","danger","ghost"],description:"Visual style variant"},size:{control:"radio",options:["sm","md","lg"],description:"Button size"},disabled:{control:"boolean",description:"Disabled state"},loading:{control:"boolean",description:"Loading state"},label:{control:"text",description:"Button label text"}},args:{onClick:o()}},c={args:{label:"Primary Button",variant:"primary",size:"md"}},d={args:{label:"Secondary Button",variant:"secondary",size:"md"}},m={args:{label:"Delete",variant:"danger",size:"md"}},u={args:{label:"Ghost Button",variant:"ghost",size:"md"}},p={args:{label:"Small Button",variant:"primary",size:"sm"}},g={args:{label:"Medium Button",variant:"primary",size:"md"}},b={args:{label:"Large Button",variant:"primary",size:"lg"}},v={args:{label:"Disabled Button",variant:"primary",size:"md",disabled:!0}},y={args:{label:"Loading...",variant:"primary",size:"md",loading:!0}},C={args:{label:"Saving...",variant:"secondary",size:"md",loading:!0}},f={args:{label:"Submit",variant:"primary",size:"lg"}},k={args:{label:"Cancel",variant:"ghost",size:"md"}},B={args:{label:"Confirm Delete",variant:"danger",size:"md"}},w={args:{label:"+ Add Issue",variant:"secondary",size:"sm"}},z={args:{label:"Click Me",variant:"primary",size:"md",onClick:o()},play:async({args:e,canvasElement:r})=>{const a=D(r).getByRole("button");await s.click(a),await t(e.onClick).toHaveBeenCalledOnce(),await t(a).toBeInTheDocument(),await t(a).toHaveTextContent("Click Me")}},h={args:{label:"Tab to Me",variant:"primary",size:"md",onClick:o()},play:async({args:e,canvasElement:r})=>{const a=D(r).getByRole("button");await s.tab(),await t(a).toHaveFocus(),await s.keyboard("{Enter}"),await t(e.onClick).toHaveBeenCalled()}},S={args:{label:"Disabled - No Click",variant:"primary",size:"md",disabled:!0,onClick:o()},play:async({args:e,canvasElement:r})=>{const a=D(r).getByRole("button");await t(a).toBeDisabled(),await s.click(a),await t(e.onClick).not.toHaveBeenCalled()}},x={args:{label:"Loading...",variant:"primary",size:"md",loading:!0,onClick:o()},play:async({args:e,canvasElement:r})=>{const n=D(r),a=n.getByRole("button"),E=n.getByRole("button").querySelector("svg");await t(E).toBeInTheDocument(),await t(a).toBeDisabled(),await s.click(a),await t(e.onClick).not.toHaveBeenCalled()}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'md'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'md'
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Delete',
    variant: 'danger',
    size: 'md'
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Ghost Button',
    variant: 'ghost',
    size: 'md'
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'sm'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Medium Button',
    variant: 'primary',
    size: 'md'
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'lg'
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disabled: true
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Loading...',
    variant: 'primary',
    size: 'md',
    loading: true
  }
}`,...y.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Saving...',
    variant: 'secondary',
    size: 'md',
    loading: true
  }
}`,...C.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Submit',
    variant: 'primary',
    size: 'lg'
  }
}`,...f.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Cancel',
    variant: 'ghost',
    size: 'md'
  }
}`,...k.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Confirm Delete',
    variant: 'danger',
    size: 'md'
  }
}`,...B.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    label: '+ Add Issue',
    variant: 'secondary',
    size: 'sm'
  }
}`,...w.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Click Me',
    variant: 'primary',
    size: 'md',
    onClick: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test button click
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();

    // Test button is in the document
    await expect(button).toBeInTheDocument();

    // Test button has correct label
    await expect(button).toHaveTextContent('Click Me');
  }
}`,...z.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Tab to Me',
    variant: 'primary',
    size: 'md',
    onClick: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test keyboard navigation
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Test Enter key press
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalled();
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled - No Click',
    variant: 'primary',
    size: 'md',
    disabled: true,
    onClick: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test disabled attribute
    await expect(button).toBeDisabled();

    // Test click does not trigger
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Loading...',
    variant: 'primary',
    size: 'md',
    loading: true,
    onClick: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test loading spinner is present
    const spinner = canvas.getByRole('button').querySelector('svg');
    await expect(spinner).toBeInTheDocument();

    // Test button is disabled when loading
    await expect(button).toBeDisabled();

    // Test click does not trigger when loading
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  }
}`,...x.parameters?.docs?.source}}};const K=["Primary","Secondary","Danger","Ghost","Small","Medium","Large","Disabled","Loading","LoadingSecondary","SubmitForm","CancelAction","ConfirmDelete","AddItem","ClickInteraction","KeyboardNavigation","DisabledNoClick","LoadingNoClick"];export{w as AddItem,k as CancelAction,z as ClickInteraction,B as ConfirmDelete,m as Danger,v as Disabled,S as DisabledNoClick,u as Ghost,h as KeyboardNavigation,b as Large,y as Loading,x as LoadingNoClick,C as LoadingSecondary,g as Medium,c as Primary,d as Secondary,p as Small,f as SubmitForm,K as __namedExportsOrder,O as default};
