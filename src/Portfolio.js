import { css } from '@emotion/react';
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  Stack,
  Image,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useBreakpointValue,
  Center,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  IconButton,
  SimpleGrid,
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';
import backgroundImage from './images/5172658.jpg';
import axios from 'axios';

const projects = [
  {
    id: 1,
    title: 'E-commerce',
    description: 'An ecommerce website that allows users to sign up to buy and sell clothes. email: user@gmail.com, \n password: password123',
    imageUrl: '/images/Screen Shot 2023-06-19 at 7.01.46 AM.png',
    link: 'https://www.cdubbstore.shop/',
  },
  {
    id: 2,
    title: 'StonyTube',
    description: 'A youtube clone that allows users to watch videos, while still having the full youtube experience.',
    imageUrl: '/images/Screen Shot 2023-06-19 at 7.02.19 AM.png',
    link: 'https://www.stonytube.website/',
  },
  {
    id: 3,
    title: ' NotaryNotes',
    description: ' Stay organized and keep track of all your important thoughts and ideas with ease. Allows use to add tasks to planners, message other users, and post blogs about progress. email: user@gmail.com, password: password123',
    imageUrl: '/images/Screen Shot 2023-06-19 at 7.03.29 AM.png',
    link: 'https://notarynotes.online/',
  },
  {
    id: 4,
    title: 'FamventWeb',
    description: 'A beta site for an upcoming social media app called famvent. Users can sign up using their college emails and post their vents about college, communicate without students and post anonymously for privacy. email: user@gmail.com, password: password123',
    imageUrl: '/images/Screen Shot 2023-09-27 at 8.34.19 AM.png',
    link: 'https://famventweb.net/login',
  },
  // Add more projects here
];

export default function Portfolio() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/contact', { email, name, message })
      .then((response) => {
        console.log(response);
        toast({
          title: 'Success',
          description: 'Your message has been sent.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // Reset the form fields
        setEmail('');
        setName('');
        setMessage('');
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        toast({
          title: 'Error',
          description: 'There was an error sending your message.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const imageSize = useBreakpointValue({ base: '200px', md: '250px' });
  const imageBoxSize = useBreakpointValue({ base: '200px', md: '450px',});
  const headingSize = useBreakpointValue({ base: 'lg', md: '2xl' });
  const textSize = useBreakpointValue({ base: 'sm', md: 'xl' });
  const imageWidth = useBreakpointValue({ base: '350px', md: '400px' });

  const ProjectBox = ({ project }) => (
    <Box
      key={project.id}
      p={4}
      borderWidth="1px"
      borderColor="transparent"
      borderRadius="md"
      boxShadow="sm"
      css={css`
        transition: 0.3s;
        :hover {
          transform: translateY(-10px);
        }
      `}
    >
      <Link href={project.link} target="_blank" rel="noopener noreferrer">
      <Image
        src={project.imageUrl}
        alt={project.title}
        mb={4}
        transition="transform 0.3s"
        width={imageWidth}
        _hover={{
            transform: 'scale(1.1)',
        }}
        />
      </Link>
      <Heading as="h2" size="lg" mb={2} textColor={'white'}>
        {project.title}
      </Heading>
      <Text
        textColor={'white'}
        mb={4}
        css={css`
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 7; /* Adjust the number of lines here */
          -webkit-box-orient: vertical;
        `}
        maxW={imageWidth}
      >
        {project.description}
      </Text>
      <Link color="blue.500" href={project.link} target="_blank" rel="noopener noreferrer">
        View Project
      </Link>
    </Box>
  );

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      w="100%"
      h="100%"
      minHeight="150vh"
      maxW="100%"
      mx="auto"
      p={4}
    >
      <Flex justify="space-between" align="center" px={4} py={2} bgColor="transparentx">
        <IconButton
          aria-label="Toggle navigation"
          icon={<HiMenu />}
          onClick={() => setIsDrawerOpen(true)}
          display={{ base: 'block', md: 'row' }}
          bg = "transparent"
          color={"white"}
        />

        <Drawer isOpen={isDrawerOpen} placement="left" onClose={() => setIsDrawerOpen(false)}>
          <DrawerOverlay>
            <DrawerContent bgImage={`url(${backgroundImage})`}>
              <DrawerCloseButton color={"white"} />
              <DrawerBody >
                <VStack spacing={4} bgImage={`url(${backgroundImage})`}>
                  {/* Add your navigation links here */}
                  <Link mt = "20" color = "white"href="Christian.resume.pdf">About</Link>
                  <Link color = "white" href="#projects">Projects</Link>
                  <Link color = "white" href="#contact">Contact</Link>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
      <Flex direction="column" align="center" mb={8} >
      <Flex direction={{ base: 'column', md: 'row' }} align="center" mb={4} justifyContent={"space-between"}>
       
      <Box
        bgColor="transparent"
        p={4}
        borderRadius="md"
        ml={{ base: 0, md: 20 }} // Add margin-left property for smaller screens
        my={{ base: 4, md: 2 }}
        maxW={{ base: '100%', md: '500px' }}
        
      >
        <Flex direction={stackDirection} align="center" mb={4} justifyContent={"space-between"}>
          <Box pr={{ base: 0, md: 16 }}>
            <Heading as="h1" size={headingSize} color="white" mb={{base:4, md: 10}} ml={{base: 0, md: -350}} mr={{base: 0, md: 250}}>
              Hi, I'm Christian 
            </Heading>
            <Text color="white" fontSize={textSize} ml={{base: 0, md: -350}} mb={{base:10}}>
              I am a web developer, that enjoys making fullstack websites. I currently attend The New Jersey Institute of Technology for Computer Science.
            </Text>
          </Box>
          <Image
            src="/images/IMG_4341.jpg"
            alt="Christian"
            borderRadius="full"
            boxSize={imageSize}
            ml={{ base: 0, md: "200px" }}  // Increased margin-left here
          />
        </Flex>
      </Box>

        </Flex>
        <Heading as="h2" size={headingSize} color="white" mb={7} mt={"25"} >
          Projects
        </Heading>
        <Center ml={"5"}> {/* Wrap SimpleGrid with Center */}
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{base:10,md:40}} mt={"10"} justifyItems="center" alignItems="center">
            {projects.map((project) => (
              <ProjectBox key={project.id} project={project} />
            ))}
          </SimpleGrid>
        </Center>


        <Heading as="h2" size={headingSize} color="white" mb={4}>
          Contact Me
        </Heading>
        <Box bgColor="transparent" p={4} borderRadius="md" width={{ base: '100%', md: '500px' }}>
          <FormControl color="white" id="name" mb={2}>
            <FormLabel color={'white'}>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl color={'white'} id="email" mb={2}>
            <FormLabel color={'white'}>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl color={'white'} id="message">
            <FormLabel color={'white'}>Message</FormLabel>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </FormControl>
          <Button mt={2} onClick={handleSubmit}>
            Send
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
