import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { useLoaderData } from 'remix';
import type { LoaderFunction, MetaFunction, LinksFunction } from 'remix';
import { FiLinkedin, FiMail, FiInstagram, FiSend } from 'react-icons/fi';
import SocialButton from '../../components/SocialButton';
import styles from '~/styles/app.css';

// Load env variables
export const loader: LoaderFunction = () => {
  return {
    instagramProfile: process.env.INSTAGRAM_PROFILE,
    linkedinProfile: process.env.LINKEDIN_PROFILE,
    telegramProfile: process.env.TELEGRAM_PROFILE,
    email: process.env.PERSONAL_EMAIL,
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
};

export const meta: MetaFunction = ({ parentsData }) => {
  return {
    title: `Home | ${parentsData.root.appName}`,
  };
};

export default function Index() {
  const data = useLoaderData();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      rowGap="10"
      p="10"
      h="100%"
      minH="100%"
    >
      <Box display="flex" columnGap="2" className="rythm-bass">
        <Heading
          fontSize="3xl"
          style={{
            animation: 'shake 0.5s',
            animationIterationCount: 'infinite',
            userSelect: 'none',
          }}
        >
          👋
        </Heading>
        <Heading fontSize="3xl">Hey, sono Jerry!</Heading>
      </Box>

      <Image
        src="./me.jpg"
        borderRadius="full"
        objectFit="cover"
        boxSize="150px"
        className="rythm-bass"
      />
      <Text className="rythm-bass">
        Sono un Full Stack Developer e vivo a Milano, Italia
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        rowGap="2"
        className="rythm-bass"
      >
        <Heading fontSize="xl">Seguimi sui miei social:</Heading>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          columnGap="3"
        >
          <SocialButton link={`mailto:${data.email}`} icon={<FiMail />} />
          <SocialButton link={data.linkedinProfile} icon={<FiLinkedin />} />
          <SocialButton link={data.telegramProfile} icon={<FiSend />} />
          <SocialButton link={data.instagramProfile} icon={<FiInstagram />} />
        </Box>
      </Box>
    </Box>
  );
}
