import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <Button variant="elevated" className="w-fit">
        Hello Button
      </Button>
      <Input placeholder="hey input" />
      <div>
        <Textarea>hello textarea</Textarea>
      </div>
      <div>
        <Progress value={70} />
      </div>
      <span className="text-lg">Hello World</span>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    </div>
  );
}
