
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Nelson-GPT
        </Link>
        <nav className="flex gap-4 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {user && (
            <>
              <Link to="/dosage-calculator" className="hover:underline">
                Dosage Calculator
              </Link>
              <Link to="/nelson-search" className="hover:underline">
                Nelson Search
              </Link>
            </>
          )}
          {user ? (
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="default">Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
