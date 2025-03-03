import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/system';

type CustomNavLinkProps = {
	to: string;
	children: ReactNode;
}

const StyledNavLink = styled(NavLink)(
	({ theme }) => `
  font-size: 1rem;
  color: ${theme.palette.text.primary};
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: ${theme.palette.grey[200]};
    color: ${theme.palette.primary.dark};
  }
  `
);

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children }) => {
	return <StyledNavLink to={to}>{children}</StyledNavLink>;
};