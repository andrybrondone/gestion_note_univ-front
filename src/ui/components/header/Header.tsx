import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";
import img from "/assets/images/logoENI.png";

interface Props {
  name: string;
  info: string;
}

export default function Header({ name, info }: Props) {
  return (
    <div className="py-6 bg-primary-200 dark:bg-secondary/10 mb-11">
      <Container className="flex items-center justify-center gap-7 max-lg:gap-4 max-sm:flex-col">
        <img
          src={img}
          alt=""
          width={160}
          className="max-md:w-[130px] max-sm:hidden"
        />
        <div className="w-[700px] flex flex-col gap-2 max-sm:w-full max-sm:text-center">
          <Typography
            weight="medium"
            variant="h2"
            component="div"
            theme="gray"
            className="max-sm:flex max-sm:items-center max-sm:justify-center max-sm:gap-3 max-sm:flex-wrap"
          >
            Bienvenue
            <Typography
              weight="bold"
              variant="h1"
              component="h1"
              className=" text-gray-900"
            >
              {name}
            </Typography>
          </Typography>
          <Typography variant="caption1" theme="gray">
            {info}
          </Typography>
        </div>
      </Container>
    </div>
  );
}
