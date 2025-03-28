interface Props {
  params: {
    setId: string
  }
}

const SetInfo = ({ params }: Props) => {
  return <span>SetInfo {params.setId}</span>
}

export default SetInfo
