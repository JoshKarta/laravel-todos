import InputError from "@/Components/InputError";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Shadcn/ui/button";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import React from "react";
import { Toaster, toast } from "sonner";

export default function Index({ auth }: PageProps) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Categories" />

            <Toaster richColors position="top-right" />
            <section className="container-screen mt-10">
                <div className="bg-white rounded-lg p-4">
                    <AddCategory />
                </div>
            </section>
        </Authenticated>
    );
}

function AddCategory() {
    const { post, processing, setData, data, errors, reset } = useForm({
        category_name: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("categories.store"), {
            onSuccess: () => {
                reset(), toast.success("Category added");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
                value={data.category_name}
                placeholder="Category Name..."
                className="bg-neutral-50/70 border border-neutral-300 rounded-lg w-full"
                onChange={(e) => setData("category_name", e.target.value)}
            ></textarea>
            <InputError message={errors.category_name} />
            <Button
                disabled={processing}
                type="submit"
                className="w-fit self-end"
            >
                Add Category
            </Button>
        </form>
    );
}
