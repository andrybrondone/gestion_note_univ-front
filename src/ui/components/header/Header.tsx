import img from "../../../assets/images/logoENI.png";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";

interface Props {
  name: string;
  info: string;
}

export default function Header({ name, info }: Props) {
  return (
    <div className="py-6 bg-primary-200 mb-11">
      <Container className="flex items-center justify-center gap-7">
        <img src={img} alt="" width={180} />
        <div className="w-[700px]">
          <Typography variant="h2" component="h2" theme="gray">
            Bienvenue
          </Typography>
          <Typography variant="h1" component="h1" className=" text-gray-900">
            {name} .
          </Typography>
          <Typography variant="caption1" className="mt-2" theme="gray">
            {info}
          </Typography>
        </div>
      </Container>
    </div>
  );
}
