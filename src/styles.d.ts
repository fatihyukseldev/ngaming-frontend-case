declare module '*.scss';
declare module '*.module.scss' {
  const classNames: Readonly<Record<string, string>>;
  export default classNames;
}
