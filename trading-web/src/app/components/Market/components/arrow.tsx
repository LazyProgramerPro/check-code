import IconSvg from 'app/assets/img/icon';

export function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <IconSvg name="prev" />
      </div>
    </>
  );
}
export function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <>
      <div className={className} style={{ ...style }} onClick={onClick}>
        <IconSvg name="next" />
      </div>
    </>
  );
}
