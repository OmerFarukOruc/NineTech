
import type { CaseStudy } from '@/lib/types'; // Removed BlogPost type import

export const caseStudies: CaseStudy[] = [
  {
    id: 'smart-home',
    title: 'Smart Home Automation Hub',
    description: 'A centralized hub for controlling various smart home devices, featuring a responsive web interface and real-time updates.',
    longDescription: 'This project involved the design and implementation of a comprehensive Smart Home Automation Hub. The system allows users to seamlessly connect, monitor, and control a wide array of smart home devices, including lighting, thermostats, security cameras, and smart appliances, all through a unified and intuitive web interface. Key features include real-time device status updates, customizable scenes and automation routines, and secure remote access. We focused on building a robust and scalable backend infrastructure capable of handling numerous concurrent device connections and user interactions. Challenges included ensuring interoperability across different device manufacturers and protocols, optimizing for low latency, and implementing stringent security measures to protect user data and device integrity. The front-end was developed using modern web technologies to deliver a responsive and user-friendly experience across various devices.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'smart home',
    projectUrl: '#',
    githubUrl: '#',
    technologiesUsed: ['React', 'Node.js', 'TypeScript', 'WebSocket', 'MQTT', 'PostgreSQL', 'Docker', 'AWS IoT'],
  },
  {
    id: 'iot-sensor-network',
    title: 'Industrial IoT Sensor Network',
    description: 'Developed a low-power wireless sensor network for monitoring environmental conditions in industrial settings.',
    longDescription: 'The Industrial IoT Sensor Network project focused on creating a durable and efficient solution for monitoring critical environmental parameters in demanding industrial environments. This involved developing custom low-power sensor nodes capable of measuring temperature, humidity, air quality, and vibration. These nodes communicate wirelessly using LoRaWAN technology to a central gateway, ensuring long-range communication and minimal power consumption. The data collected is then relayed to a cloud platform for real-time analysis, visualization, and alerting. Significant effort was dedicated to optimizing sensor accuracy, extending battery life for multi-year operation, and ensuring the physical robustness of the hardware to withstand harsh conditions. The platform provides actionable insights for predictive maintenance, operational efficiency, and safety compliance.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'industrial sensor',
    projectUrl: '#',
    technologiesUsed: ['C/C++', 'LoRaWAN', 'MQTT', 'Python (Gateway)', 'InfluxDB', 'Grafana', 'Embedded Linux'],
  },
  {
    id: 'wearable-health-monitor',
    title: 'Wearable Health Monitor Firmware',
    description: 'Firmware for a wearable device tracking vital signs, with optimized battery life and BLE connectivity.',
    longDescription: 'This project centered on the development of firmware for a sophisticated wearable health monitoring device. The firmware is responsible for accurately tracking a range of vital signs, including heart rate, SpO2, activity levels, and sleep patterns. A primary focus was aggressive power optimization to achieve extended battery life, critical for user convenience. Bluetooth Low Energy (BLE) connectivity was implemented for seamless data synchronization with a companion mobile application. The firmware also includes algorithms for data processing and anomaly detection directly on the device. Challenges included managing real-time sensor data acquisition, implementing power-saving modes effectively, and ensuring reliable BLE communication while maintaining data integrity and security. The device aims to provide users with valuable health insights and promote a proactive approach to personal well-being.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'wearable health',
    githubUrl: '#',
    technologiesUsed: ['C', 'ARM Cortex-M', 'FreeRTOS', 'Bluetooth LE', 'Sensor Fusion', 'Power Management ICs'],
  },
   {
    id: 'portfolio-cms-platform',
    title: 'Portfolio CMS Platform',
    description: 'A full-stack web application enabling creatives to easily build and manage their online portfolios.',
    longDescription: 'The Portfolio CMS Platform is a dynamic full-stack web application designed to empower creative professionals—such as designers, photographers, and artists—to effortlessly create, customize, and manage their online portfolios. Users can choose from various templates, upload their work, write project descriptions, and organize their content without needing any coding knowledge. The platform features a user-friendly admin dashboard for content management and a public-facing site that showcases the portfolio in a visually appealing and responsive manner. Technical aspects included developing a secure authentication system, a flexible content modeling system, and an optimized image handling pipeline. The goal was to provide a seamless experience for creatives to present their work professionally to the world.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'portfolio website',
    projectUrl: '#',
    githubUrl: '#',
    technologiesUsed: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'Cloudinary'],
  },
];

// Removed the blogPosts array export const blogPosts: BlogPost[] = [...];
