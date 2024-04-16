import { Logo } from "../../design-system/logo/Logo";
import { Container } from "../container/Container";
import { SocialNetworksButtons } from "./social-networks-buttons";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray mt-10 dark:bg-black dark-transition">
      <Container className="pt-12 pb-5 max-md:pt-8 max-md:pb-0 space-y-5 text-white">
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-10">
          <div className="absolute left-1/2 -translate-x-1/2 max-md:hidden">
            <Logo size="medium" />
          </div>

          <SocialNetworksButtons theme="gray" />
        </div>
      </Container>
      <Container className="py-6">
        <hr className="text-gray-700" />
        <p className="text-center text-caption2 pt-6 text-gray-600">
          Copyright &copy; {`${currentYear} `} | Réaliser par Brondone
          ANDRIAMBOLOLOMANANA
        </p>
      </Container>
    </div>
  );
};
