import s from './LoadingDots.module.css'

export interface Props {
  className?: string
}

const LoadingDots: React.FC<Props> = (props: any) => {
  return (
    <span className={s.root}>
      <span className={props.className ? props.className : 'bg-accents-6'} />
      <span className={props.className ? props.className : 'bg-accents-6'} />
      <span className={props.className ? props.className : 'bg-accents-6'} />
    </span>
  )
}

export default LoadingDots
