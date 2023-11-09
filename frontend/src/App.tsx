import { Copy, Search, Terminal } from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "./components/ui/card";

import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "./components/ui/dialog";

interface Command {
 id: number;
 name: string;
 description: string;
 comment?: string;
 command: string;
}

const getCommands = async () => {
 const { data } = await axios.get<Command[]>("http://localhost:8000/commands");
 return data;
};

function App() {
 const { data: commands, isLoading } = useQuery({
  queryKey: ["commands"],
  queryFn: getCommands,
 });

 return (
  <>
   <section className="bg-blue-950 w-full h-[40vh] flex items-center justify-center">
    <div className="max-w-lg w-full flex flex-col space-y-2">
     <h1 className="text-primary-foreground text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-center">
      Docker commands !
     </h1>
     <div className="flex gap-4 w-full">
      <div className="relative w-full">
       <Input className="w-full" placeholder="Search for a command ..." />
       <Search className="absolute text-gray-400 right-3 top-1/2 -translate-y-1/2" />
      </div>
      <Dialog>
       <DialogTrigger>
        <Button className="w-fit bg-primary mx-2">
         <span className="whitespace-nowrap">New command </span>
         <Terminal className="h-4 w-4 ml-2" />
        </Button>
       </DialogTrigger>
       <DialogContent>
        <DialogHeader>
         <DialogTitle>Create command</DialogTitle>
         <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
         </DialogDescription>
        </DialogHeader>
        <div>
          
        </div>
       </DialogContent>
      </Dialog>
     </div>
    </div>
   </section>
   <section className="w-full max-w-2xl mx-auto flex flex-col gap-5 mt-10">
    {commands?.map((command) => (
     <Card key={command.id}>
      <CardHeader>
       <CardTitle>{command.name}</CardTitle>
       <CardDescription>{command.description}</CardDescription>
      </CardHeader>
      <CardContent>
       <p className="bg-gray-100 text-zinc-700 pr-10 pl-5 py-3 rounded-xl border text-sm relative">
        {command.command}
        <Copy className="absolute h-4 w-4 text-gray-600 right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:text-gray-400 transition ease duration-200" />
       </p>
      </CardContent>
     </Card>
    ))}
   </section>
  </>
 );
}

export default App;
