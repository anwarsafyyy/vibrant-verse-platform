import React from "react";
import { 
  Code, Database, Globe, Smartphone, Cloud, Server, 
  Cpu, Monitor, Wifi, Shield, Layers, GitBranch,
  Terminal, Braces, Hash, Box
} from "lucide-react";

const techIcons = [
  { Icon: Code, top: "5%", left: "8%" },
  { Icon: Database, top: "15%", right: "12%" },
  { Icon: Globe, top: "25%", left: "3%" },
  { Icon: Smartphone, top: "35%", right: "5%" },
  { Icon: Cloud, top: "45%", left: "6%" },
  { Icon: Server, top: "55%", right: "8%" },
  { Icon: Cpu, top: "65%", left: "4%" },
  { Icon: Monitor, top: "75%", right: "10%" },
  { Icon: Wifi, top: "85%", left: "7%" },
  { Icon: Shield, top: "10%", left: "92%" },
  { Icon: Layers, top: "30%", left: "95%" },
  { Icon: GitBranch, top: "50%", left: "93%" },
  { Icon: Terminal, top: "70%", left: "94%" },
  { Icon: Braces, top: "20%", left: "50%" },
  { Icon: Hash, top: "60%", left: "48%" },
  { Icon: Box, top: "80%", left: "52%" },
];

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Static Tech Icons */}
      {techIcons.map((item, index) => {
        const { Icon, ...position } = item;
        return (
          <div
            key={index}
            className="absolute text-[hsl(262,45%,35%)]/30"
            style={{
              ...position,
            }}
          >
            <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1} />
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedBackground;
