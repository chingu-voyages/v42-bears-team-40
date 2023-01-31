import Link from 'next/link';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  link: string;
  style?: string;
};

const Button = ({ link, style, children }: Props) => {
  return (
    <Link className={style} href={link}>
      {children}
    </Link>
  );
};

export default Button;
