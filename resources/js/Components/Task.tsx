import UpdateTaskForm from "@/Pages/Tasks/Partials/UpdateTaskForm";
import { Button } from "@/Shadcn/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Shadcn/ui/dialog";
import { Switch } from "@/Shadcn/ui/switch";
import { findCategory } from "@/lib/utils";
import { TCategory, TTask } from "@/types/appTypes";

export default function Task({
    task,
    categories,
}: {
    task: TTask;
    categories: TCategory[];
}) {
    return (
        <div className="border p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2 gap-4">
                <div
                    className="w-full h-3 rounded-full"
                    style={{
                        backgroundColor: findCategory(
                            categories,
                            task.category_id
                        )?.category_color,
                    }}
                ></div>
                <Dialog>
                    <DialogTrigger className="!p-0 !m-0">
                        <EditFormSvg />
                    </DialogTrigger>
                    <form>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Do you want to update your task ?
                                </DialogTitle>
                                <UpdateTaskForm
                                    categories={categories}
                                    task={task}
                                />
                            </DialogHeader>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
            <p className="text-neutral-400/70 text-lg">Task</p>
            <p>{task.task_name}</p>
            <Switch className="mt-2" checked={Boolean(task.completed)} />
        </div>
    );
}

function EditFormSvg() {
    return (
        <svg
            fill="rgb(115 115 115)"
            height="16px"
            width="16px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="-3.21 -3.21 38.48 38.48"
            xmlSpace="preserve"
            transform="rotate(180)"
            stroke="rgb(115 115 115)"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                    {" "}
                    <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"></path>{" "}
                </g>{" "}
            </g>
        </svg>
    );
}
