import {
  RiFacebookCircleFill,
  RiGithubFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { AppLinks } from "../../../types/app-links";

const footerApplicationLinks: AppLinks[] = [
  {
    label: "Home",
    baseUrl: "/",
    type: "internal",
  },
  {
    label: "About me",
    baseUrl: "/a-propos",
    type: "internal",
  },
  {
    label: "My project",
    baseUrl: "/projet",
    type: "internal",
  },
];

export const footerSocialNetworksLink: AppLinks[] = [
  {
    label: "Facebook",
    baseUrl: "https://facebook.com/bron.don.714",
    type: "external",
    icon: RiFacebookCircleFill,
  },
  {
    label: "LinkedIn",
    baseUrl: "https://linkedin.com/in/brondone-andriambololomanana",
    type: "external",
    icon: RiLinkedinFill,
  },
  {
    label: "Github",
    baseUrl: "https://github.com/andrybrondone",
    type: "external",
    icon: RiGithubFill,
  },
];

export const footerLinks = [
  {
    label: "Application",
    links: footerApplicationLinks,
  },
  /* {
    label: "Utilisateur",
    links: footerUsersLinks,
  },
  {
    label: "Information",
    links: fooInformationLink,
  },*/
  {
    label: "Social Media",
    links: footerSocialNetworksLink,
  },
];
