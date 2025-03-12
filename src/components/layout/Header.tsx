
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Bot, Pill } from "lucide-react";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span className="hidden sm:inline">Nelson</span>-GPT
        </Link>
        <nav className="flex gap-4 items-center">
          <Link to="/" className="hover:underline text-sm sm:text-base">
            Home
          </Link>
          {user && (
            <>
              <Link to="/ai-assistant" className="hover:underline flex items-center gap-1 text-sm sm:text-base">
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">AI Assistant</span>
              </Link>
              <Link to="/dosage-calculator" className="hover:underline flex items-center gap-1 text-sm sm:text-base">
                <Pill className="h-4 w-4" />
                <span className="hidden sm:inline">Dosage Calculator</span>
              </Link>
            </>
          )}
          {user ? (
            <Button variant="outline" onClick={signOut} size="sm" className="text-sm">
              Sign Out
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="text-sm">Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
