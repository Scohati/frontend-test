import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Toolbar = ({
  lists,
}: Readonly<{ lists: Readonly<{ label: string; value: string }[]> }>) => {
  return (
    <div className="flex gap-2">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a list" />
        </SelectTrigger>
        <SelectContent>
          {lists?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-10 bg-greenBlue hover:bg-[#4DC9D7]">
        <span>
          <PlusCircle size={16}/>
        </span>
      </Button>
    </div>
  );
};

export default Toolbar;
