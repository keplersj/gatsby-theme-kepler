import * as React from "react";
import {
  FaGithub,
  FaTwitter,
  FaKeybase,
  FaEnvelope,
  FaKey,
  FaLinkedin,
  FaInstagram,
  FaExternalLinkSquareAlt
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
  Instagram: FaInstagram
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

export const SocialLink = (props: Props): React.ReactElement => {
  const Icon = getIcon(props.name);

  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={props.url}
      key={props.name}
      {...props}
    >
      <Icon size={LinkSize} title={`${props.name}: ${props.id}`} />
    </Link>
  );
};
