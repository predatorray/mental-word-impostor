export default function CountryFlag(props: {
  code: string;
}) {
  const codeInLowerCase = props.code.toLowerCase();
  return (
    <img
      loading="lazy"
      width="20"
      srcSet={`https://flagcdn.com/w40/${codeInLowerCase}.png 2x`}
      src={`https://flagcdn.com/w20/${codeInLowerCase}.png`}
      alt=""
    />
  );
}
