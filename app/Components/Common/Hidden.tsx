interface IProp {
  children: React.ReactElement | React.ReactElement[];
  data: any;
}
export const Hidden = ({ children, data }: IProp) => {
  return !!data ? children : <></>;
};
