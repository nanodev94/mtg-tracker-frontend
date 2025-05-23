interface Props {
  text: string
}

const Chip = ({ text }: Props) => {
  return <span className='py-1 px-2 border-2 rounded-full'>{text}</span>
}

export default Chip
