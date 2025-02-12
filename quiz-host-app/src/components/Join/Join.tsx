import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./Join.css";
import { useEffect, useState } from "react";
import useUserStore from '../../store';
import { UserStore } from "@/store";

type JoinProps = {
  onJoin: (name: string) => void;
};

export const Join: React.FC<JoinProps> = ({ onJoin }) => {
  const [name, setName] = useState("");
  const user = useUserStore((state: UserStore) => state.user);

  useEffect(() => {
    document.dispatchEvent(new CustomEvent("ADD_USER", { detail: user }));
  }, [user]);

  return user.id ? (
    <h2>Welcome {user.name}</h2>
  ) : (
    <Popover onOpenChange={(open) => !open && setName('')}>
      <PopoverTrigger asChild>
        <Button variant="outline">Join Game</Button>
      </PopoverTrigger>
      <PopoverContent className="popContent">
        <Input placeholder="Name" value={name} onChange={({ target }) => setName(target.value)} />
        <Button onClick={() => onJoin(name)}>Join</Button>
      </PopoverContent>
    </Popover>
  );
};
