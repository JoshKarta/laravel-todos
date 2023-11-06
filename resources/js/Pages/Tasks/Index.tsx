import CreateTask from "@/Components/CreateTask";
import Task from "@/Components/Task";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { TCategory, TTask } from "@/types/appTypes";
import { Head } from "@inertiajs/react";
import { Toaster } from "sonner";

export default function Index({
    auth,
    categories,
    tasks,
}: {
    auth: { user: User };
    categories: TCategory[];
    tasks: TTask[];
}) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Tasks" />

            <Toaster richColors position="top-right" />
            <section className="container-screen mt-10">
                <div className="p-6 bg-white rounded-lg">
                    <CreateTask categories={categories} auth={auth.user} />

                    <div className="mt-10">
                        <p className="text-neutral-500 text-lg">
                            Current tasks
                        </p>
                        <div className="grid gap-4 mt-2">
                            {tasks.map((task) => (
                                <Task
                                    key={task.id}
                                    task={task}
                                    categories={categories}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
