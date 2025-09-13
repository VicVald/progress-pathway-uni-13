import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      {/* Platform Logo */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary">
          Unimar<span className="text-accent">+</span>
        </h1>
      </div>

      {/* User Avatar */}
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-avatar.jpg" alt="Foto do usuário" />
        <AvatarFallback className="bg-primary text-primary-foreground">
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    </header>
  );
};

export default Header;