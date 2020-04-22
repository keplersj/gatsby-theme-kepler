import * as React from "react";
import {
  FaGithub,
  FaTwitter,
  FaKeybase,
  FaEnvelope,
  FaKey,
  FaLinkedin,
  FaInstagram,
  FaExternalLinkSquareAlt,
} from "react-icons/fa";
import { IconType } from "react-icons";
import styled from "@emotion/styled";

const LinkSize = "1.5em";

const Link = styled.a`
  padding: 0.5em;
`;

const Icons: { [index: string]: IconType } = {
  Email: FaEnvelope,
  PGP: FaKey,
  GitHub: FaGithub,
  Twitter: FaTwitter,
  LinkedIn: FaLinkedin,
  Keybase: FaKeybase,
  Instagram: FaInstagram,
};

function getIcon(name: string): IconType {
  return Icons[name] || FaExternalLinkSquareAlt;
}

type Props = {
  url: string;
  name: string;
  id: string;
} & React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const SocialLink = (properties: Props): React.ReactElement => {
  const Icon = getIcon(properties.name);

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={properties.url}
      key={properties.name}
      {...properties}
    >
      <Icon size={LinkSize} title={`${properties.name}: ${properties.id}`} />
    </Link>
  );
};
