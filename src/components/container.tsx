interface Props {
  children: React.ReactNode
}

const Container: React.FC<Props> = ({ children }) => {
  return <div className='max-w-7xl mx-auto px-2 md:px-4'>{children}</div>
}

export default Container
