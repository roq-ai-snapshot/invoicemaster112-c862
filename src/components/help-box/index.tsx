import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Manager'];
  const roles = ['Manager', 'Legal', 'Finance', 'CFO', 'Guest'];
  const applicationName = 'invoiceMaster1121';
  const tenantName = 'Organisation';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Role: Manager

1. As a Manager, I want to be able to create and manage multiple organizations within the InvoiceMaster platform so that I can oversee invoicing and payments for all my businesses.

2. As a Manager, I want to be able to invite and assign roles (Legal, Finance, CFO) to members of my organization so that they can access and manage their respective responsibilities within the InvoiceMaster platform.

3. As a Manager, I want to be able to view and monitor all invoicing and payment activities across my organizations so that I can ensure smooth financial operations.

4. As a Manager, I want to be able to integrate InvoiceMaster with my existing accounting infrastructure so that I can streamline my financial processes.

5. As a Manager, I want to be able to customize payment requests and processing through the API so that I can tailor the platform to my organization's specific needs.

Role: Legal

1. As a Legal team member, I want to be able to review and approve invoices before they are sent to clients so that I can ensure compliance with legal and contractual requirements.

2. As a Legal team member, I want to be able to access and manage contracts and agreements related to invoicing and payments so that I can maintain accurate records and documentation.

3. As a Legal team member, I want to be able to collaborate with Finance and CFO team members on invoicing and payment matters so that we can work together efficiently.

Role: Finance

1. As a Finance team member, I want to be able to create, send, and manage invoices for my organization so that I can ensure timely and accurate billing.

2. As a Finance team member, I want to be able to track and manage payments received from clients so that I can maintain accurate financial records.

3. As a Finance team member, I want to be able to collaborate with Legal and CFO team members on invoicing and payment matters so that we can work together efficiently.

Role: CFO

1. As a CFO, I want to be able to oversee and manage the financial operations of my organization, including invoicing and payments, so that I can ensure financial stability and growth.

2. As a CFO, I want to be able to access and analyze financial data and reports related to invoicing and payments so that I can make informed decisions for my organization.

3. As a CFO, I want to be able to collaborate with Legal and Finance team members on invoicing and payment matters so that we can work together efficiently.

Role: Guest

1. As a Guest, I want to be able to view and pay invoices sent to me by an organization using InvoiceMaster so that I can fulfill my financial obligations.

2. As a Guest, I want to be able to access a secure payment portal to make payments so that my financial information is protected.

3. As a Guest, I want to be able to contact the organization's support team for any questions or issues related to my invoice or payment so that I can resolve any concerns quickly and efficiently.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="10" bottom="20%" zIndex={3}>
      <Popover>
        <PopoverTrigger>
          <IconButton aria-label="Help Info" icon={<FiInfo />} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="500px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
