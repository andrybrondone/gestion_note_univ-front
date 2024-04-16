import clsx from "clsx";
import { RiFacebookCircleFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../design-system/button/Button";
import { footerSocialNetworksLink } from "./app-links";

interface Props {
  theme?: "gray" | "accent" | "secondary";
  className?: string;
}
export const SocialNetworksButtons = ({
  className,
  theme = "accent",
}: Props) => {
  const icoList = footerSocialNetworksLink.map((socialNetwork) => (
    <Button
      key={uuidv4()}
      variant="ico"
      iconTheme={theme}
      icon={{
        icon: socialNetwork.icon ? socialNetwork.icon : RiFacebookCircleFill,
      }}
      baseUrl={socialNetwork.baseUrl}
      linkType={socialNetwork.type}
    />
  ));

  return (
    <div className={clsx(className, "flex items-center gap-2.5")}>
      {icoList}
    </div>
  );
};
