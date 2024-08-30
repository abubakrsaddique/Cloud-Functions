import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";

export function DeleteProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-none w-full flex  justify-start"
        >
          Delete Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription className="pt-3">
            Are you sure you want to delete this Profile
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button className="bg-gray-300 text-black px-4 py-2   hover:bg-blue-600">
            Cancel
          </Button>
          <Button className="bg-red-500 text-white px-4 py-2  hover:bg-red-600">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
