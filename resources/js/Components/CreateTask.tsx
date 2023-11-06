import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Shadcn/ui/select";
import InputError from "./InputError";
import { Button } from "@/Shadcn/ui/button";
import { useForm } from "@inertiajs/react";
import { Switch } from "@/Shadcn/ui/switch";
import InputLabel from "./InputLabel";
import { FormEvent } from "react";
import { toast } from "sonner";
import { User } from "@/types";
import { findCategory, selectCategories } from "@/lib/utils";

type TCatergory = {
    category_id: number;
    category_name: string;
};

export default function CreateTask({
    categories,
    auth,
}: {
    categories: any;
    auth: User;
}) {
    const { data, post, processing, errors, setData, reset } = useForm({
        user_id: auth.id,
        task_name: "",
        category_id: null || 0,
        completed: false,
    });

    const selectedValueLabel = categories.find(
        (el: TCatergory) => el.category_id === data.category_id
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(
            route("tasks.store", {
                onSuccess: () => {
                    reset(), toast.success("Category added");
                },
            })
        );
    };

    return (
        <div className="w-full rounded-lg">
            <h1 className="text-center font-medium text-xl">
                Create a new Task
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="flex w-full items-center gap-4 mt-4">
                    <div className="flex flex-col w-full gap-2">
                        <textarea
                            value={data.task_name}
                            placeholder="Task..."
                            className="bg-neutral-50/70 border border-neutral-300 rounded-lg w-full"
                            onChange={(e) =>
                                setData("task_name", e.target.value)
                            }
                        ></textarea>
                        <InputError message={errors.task_name} />
                        <div className="flex items-center gap-2 mt-2">
                            <Switch
                                name="completed"
                                id="completed"
                                className="bg-indigo-500"
                                checked={data.completed}
                                onCheckedChange={(value) =>
                                    setData("completed", value)
                                }
                            />
                            <InputLabel htmlFor="completed" value="Completed" />
                        </div>
                    </div>

                    <Select
                        onValueChange={(value) =>
                            setData("category_id", parseInt(value))
                        }
                    >
                        <SelectTrigger className="w-[200px] focus:ring-indigo-500 self-start border-neutral-300">
                            <SelectValue
                                placeholder={
                                    findCategory(categories, data.category_id)
                                        ?.category_name
                                }
                            >
                                {data.category_id !== 0
                                    ? selectedValueLabel.category_name
                                    : "Category"}
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
                </div>
                <Button disabled={processing} type="submit" className="mt-4">
                    Save
                </Button>
            </form>
        </div>
    );
}
