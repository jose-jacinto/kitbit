import { FC } from 'react'
import { Logo } from '@components/ui'

interface Props {}

const ImageView: FC<Props> = () => {
  return (
    <form className="w-80 flex flex-col justify-between p-3">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>

      <div className="flex flex-col space-y-3">
        <h1>IMAGE</h1>
      </div>
    </form>
  )
}

export default ImageView
