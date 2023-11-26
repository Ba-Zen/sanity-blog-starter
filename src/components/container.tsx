interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto my-20 px-5 pb-[20px] md:max-w-[83%] md:pb-[30px] lg:max-w-[1220px]">
      {children}
    </div>
  );
};

export default Container;
