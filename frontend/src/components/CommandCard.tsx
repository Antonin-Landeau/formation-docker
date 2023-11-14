import copy from "copy-to-clipboard";

import { Command } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface CommandCardProps {
  command: Command;
}

const CommandCard = ({ command }: CommandCardProps) => {
  const [hasBeenCopied, setHasBeenCopied] = useState(false);
  const copied = () => {
    toast.success("Command copied");
    setHasBeenCopied(true);
    setTimeout(() => {
      setHasBeenCopied(false);
    }, 3000);
  };
  return (
    <div>
      <Card key={command.id}>
        <CardHeader>
          <CardTitle>{command.name}</CardTitle>
          <CardDescription>{command.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="bg-gray-100 text-zinc-700 pr-10 pl-5 py-3 rounded-xl border text-sm relative">
            {command.command}
            {!hasBeenCopied && (
              <Copy
                onClick={() => {
                  copy(command.command);
                  copied();
                }}
                className="absolute h-4 w-4 text-gray-600 right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:text-gray-400 transition ease duration-200"
              />
            )}
            {hasBeenCopied && (
              <Check className="absolute h-4 w-4 text-green-400 right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:text-gray-400 transition ease duration-200" />
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommandCard;
