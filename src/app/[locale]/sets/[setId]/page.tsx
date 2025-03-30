import SetDetailsView from '@/views/SetDetailsView'

interface Props {
  params: Promise<{
    setId: string
  }>
}

const SetInfo = async ({ params }: Props) => {
  const { setId } = await params
  return <SetDetailsView setId={parseInt(setId)} />
}

export default SetInfo
