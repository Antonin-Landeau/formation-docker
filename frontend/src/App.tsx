import { Copy, Search, Terminal } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Command } from "./types";
import CommandCard from "./components/CommandCard";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import toast from "react-hot-toast";

const getCommands = async () => {
  const { data } = await axios.get<Command[]>("http://localhost:8000/commands");
  return data;
};

const createCommand = async (command: Omit<Command, "id">) => {
  return axios.post("http://localhost:8000/command", command);
};

function App() {
  const [isCreateCommandDialogOpen, setIsCreateCommandDialogOpen] =
    useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [command, setCommand] = useState("");

  const queryClient = useQueryClient();

  const { data: commands, isLoading } = useQuery({
    queryKey: ["commands"],
    queryFn: getCommands,
  });

  const mutation = useMutation({
    mutationKey: ["commands"],
    mutationFn: createCommand,
    onSuccess: (data, variables, context) => {
      toast.success("Command created succesfuly");
      setIsCreateCommandDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["commands"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCommand: Omit<Command, "id"> = {
      command,
      name,
      comment,
      description,
    };
    mutation.mutate(newCommand);
  };

  return (
    <>
      <section className="bg-blue-950 w-full h-[35vh] flex items-center justify-center">
        <div className="max-w-lg w-full flex flex-col space-y-2">
          <h1 className="text-primary-foreground text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-center">
            Docker commands !
          </h1>
          <div className="flex gap-4 w-full">
            <div className="relative w-full">
              <Input
                className="w-full"
                placeholder="Search for a command ..."
              />
              <Search className="absolute text-gray-400 right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            </div>
            <Button
              className="w-fit bg-primary mx-2"
              onClick={() => setIsCreateCommandDialogOpen(true)}
            >
              <span className="whitespace-nowrap">New command </span>
              <Terminal className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto flex flex-col gap-5 py-10">
        {commands?.map((command) => (
          <CommandCard key={command.id} command={command} />
        ))}
      </section>
      <Dialog
        open={isCreateCommandDialogOpen}
        onOpenChange={setIsCreateCommandDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create command</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <Label className="block pb-2">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label className="block pb-2">Command</Label>
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
            </div>
            <div>
              <Label className="block pb-2">Comment</Label>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div>
              <Label className="block pb-2">Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <p></p>
              <Button type="submit" className="w-fit ml-auto">
                Create command
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
