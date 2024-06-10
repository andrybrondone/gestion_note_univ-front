import { RiMailFill, RiPhoneFill, RiUserLocationFill } from "react-icons/ri";
import { Logo } from "../../design-system/logo/Logo";
import { Typography } from "../../design-system/typography/Typography";
import { Container } from "../container/Container";
import { SocialNetworksButtons } from "./social-networks-buttons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray mt-10 dark:bg-black">
      <Container className="flex justify-between items-center max-md:flex-col p-5 max-md:pb-0 space-y-5 text-white">
        <div className="flex items-center gap-2">
          <Logo size="medium" className="max-md:w-[75px]" />
          <div className="flex flex-col justify-start">
            <Typography
              weight="bold"
              variant="h1"
              component="h2"
              className="text-white dark:text-white max-[418px]:hidden"
            >
              Gestion de note
            </Typography>
            <Typography
              variant="body-sm"
              component="p"
              className="text-gray-600 dark:text-gray-600"
            >
              D'un établissement universitaire
            </Typography>
          </div>
        </div>
        <Typography
          variant="caption1"
          component="div"
          className=" flex flex-col max-md:items-center gap-4 text-white"
        >
          <Typography
            variant="lead"
            component="p"
            className="text-white underline-offset-8 underline pb-3"
          >
            Coordonnée de l'ENI :
          </Typography>
          <p className="flex items-center gap-2">
            <RiUserLocationFill className="text-sm" /> 1487 Tanambao,
            Fianarantsoa(301)
          </p>
          <p className="flex items-center gap-2">
            <RiPhoneFill className="text-sm" /> +261 34 05 733 36 / +261 32 15
            204 28
          </p>
          <p className="flex items-center gap-2">
            <RiMailFill className="text-sm" /> scolarite@eni.mg
          </p>
        </Typography>
      </Container>
      <Container className="py-6">
        <hr className="text-gray-700" />
        <div className="flex items-center justify-between mt-6 gap-5 max-md:flex-col">
          <Typography
            variant="caption2"
            component="p"
            className="text-center text-gray-600"
          >
            Copyright &copy; {`${currentYear} `} | Réaliser par Brondone
            ANDRIAMBOLOLOMANANA
          </Typography>
          <SocialNetworksButtons theme="gray" />
        </div>
      </Container>
    </div>
  );
};
