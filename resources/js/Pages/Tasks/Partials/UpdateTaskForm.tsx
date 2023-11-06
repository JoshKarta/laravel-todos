import InputLabel from "@/Components/InputLabel";
import { Button } from "@/Shadcn/ui/button";
import { DialogClose, DialogFooter } from "@/Shadcn/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Shadcn/ui/select";
import { Switch } from "@/Shadcn/ui/switch";
import { findCategory, selectCategories } from "@/lib/utils";
import { TCategory, TTask } from "@/types/appTypes";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Toaster, toast } from "sonner";

export default function UpdateTaskForm({
    categories,
    task,
}: {
    categories: TCategory[];
    task: TTask;
}) {
    const { data, progress, setData, patch } = useForm({
        category_id: task.category_id,
        task_name: task.task_name,
        completed: task.completed,
        user_id: task.user_id,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(
            route("tasks.update", task, {
                onSuccess: () => {
                    toast.success("Task updated");
                },
            })
        );
    };
    return (
        <div className="my-4">
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mt-2">
                    <Select
                        onValueChange={(value) =>
                            setData("category_id", parseInt(value))
                        }
                        // defaultValue={field.value}
                    >
                        <SelectTrigger>
                            <SelectValue
                                placeholder={
                                    findCategory(categories, task.category_id)
                                        ?.category_name
                                }
                            >
                                {
                                    findCategory(categories, data.category_id)
                                        ?.category_name
                                }
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {selectCategories(categories).map(
                                (
                                    {
                                        value,
                                        label,
                                    }: { value: string; label: string },
                                    i: number
                                ) => (
                                    <SelectItem value={value} key={i}>
                                        {label}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                    <textarea
                        defaultValue={task.task_name}
                        className="rounded-lg border-neutral-300 w-full"
                        onChange={(e) => setData("task_name", e.target.value)}
                    ></textarea>
                    <div className="flex items-center gap-2">
                        <Switch
                            name="completed"
                            id="completed"
                            className="bg-indigo-500"
                            checked={Boolean(data.completed)}
                            onCheckedChange={(value) =>
                                setData("completed", Number(value))
                            }
                        />
                        <InputLabel htmlFor="completed" value="Completed" />
                    </div>
                </div>
                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <div className="flex items-center gap-4">
                            <Button size={"sm"} type="submit">
                                Update
                            </Button>
                            <Button
                                size={"sm"}
                                type="button"
                                variant="secondary"
                            >
                                Close
                            </Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </form>
        </div>
    );
}
