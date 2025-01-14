declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}
