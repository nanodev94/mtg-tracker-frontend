interface Props {
  params: {
    cardId: string
  }
}

const CardInfo = ({ params }: Props) => {
  return <span>CardInfo {params.cardId}</span>
}

export default CardInfo
