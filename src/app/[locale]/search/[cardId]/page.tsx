import CardDetailsView from '@/views/CardDetailsView'

interface Props {
  params: Promise<{
    cardId: string
  }>
}

const CardDetails = async ({ params }: Props) => {
  const { cardId } = await params
  return <CardDetailsView cardId={parseInt(cardId)} />
}

export default CardDetails
