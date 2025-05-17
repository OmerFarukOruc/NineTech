import { SectionContainer } from '@/components/layout/SectionContainer';
import { ServiceCard } from '@/components/shared/ServiceCard';
import type { Service } from '@/lib/types';
import { Cpu, Wifi, Binary } from 'lucide-react'; // Removed CodeXml

const services: Service[] = [
  {
    id: 'embedded',
    icon: Cpu,
    title: 'Embedded Systems Development',
    description: 'Expert design and development of embedded software and hardware, from microcontrollers to complex SoCs.',
    technologies: ['C/C++', 'RTOS', 'ARM Cortex-M/A', 'Linux', 'Device Drivers'],
  },
  {
    id: 'iot',
    icon: Wifi,
    title: 'IoT Solutions',
    description: 'End-to-end Internet of Things solutions, including sensor integration, connectivity, and cloud platforms.',
    technologies: ['MQTT', 'LoRaWAN', 'Bluetooth LE', 'AWS IoT', 'Azure IoT'],
  },
  {
    id: 'firmware',
    icon: Binary,
    title: 'Firmware Engineering',
    description: 'Robust firmware development, including bootloaders, OTA updates, and ensuring system stability and performance.',
    technologies: ['Bare-metal', 'Zephyr RTOS', 'FreeRTOS', 'Secure Boot', 'Yocto'],
  },
  // Removed Full-Stack Web Development service
];

export function ServicesSection() {
  return (
    <SectionContainer id="services">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Services Offered</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Providing a wide range of technical expertise to meet your project needs.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionContainer>
  );
}
