import CreateTask from "@/Components/CreateTask";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Toaster } from "sonner";

export default function Index({ auth, categories }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Tasks" />

            <Toaster richColors position="top-right" />
            <section className="container-screen mt-10">
                <div className="p-4 bg-white rounded-lg">
                    <CreateTask categories={categories} auth={auth.user} />
                </div>
            </section>
        </Authenticated>
    );
}
