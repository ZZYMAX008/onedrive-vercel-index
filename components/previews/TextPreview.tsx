import FourOhFour from '../FourOhFour'
import Loading from '../Loading'
import DownloadButtonGroup from '../DownloadBtnGtoup'
import useAxiosGet from '../../utils/fetchOnMount'
import { DownloadBtnContainer, PreviewContainer } from './Containers'

const TextPreview = ({ file }) => {
  const { response: content, error, validating } = useAxiosGet(file['@microsoft.graph.downloadUrl'])
  if (error) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg={error} />
      </PreviewContainer>
    )
  }

  if (validating) {
    return (
      <PreviewContainer>
        <Loading loadingText="Loading file content..." />
      </PreviewContainer>
    )
  }

  if (!content) {
    return (
      <PreviewContainer>
        <FourOhFour errorMsg="File is empty." />
      </PreviewContainer>
    )
  }

  return (
    <div>
      <PreviewContainer>
        <pre className="overflow-x-scroll p-0 text-sm md:p-3">{content}</pre>
      </PreviewContainer>
      <DownloadBtnContainer>
        <DownloadButtonGroup downloadUrl={file['@microsoft.graph.downloadUrl']} />
      </DownloadBtnContainer>
    </div>
  )
}

export default TextPreview
