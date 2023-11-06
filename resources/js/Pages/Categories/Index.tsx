import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
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
import { User } from "@/types";
import { TCategory } from "@/types/appTypes";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

export default function Index({
    auth,
    categories,
}: {
    auth: { user: User };
    categories: [];
}) {
    return (
        <Authenticated user={auth.user}>
            <Head title="Categories" />

            <Toaster richColors position="top-right" />
            <section className="container-screen mt-10">
                <div className="bg-white rounded-lg p-4">
                    <AddCategory />

                    <div className="mt-10">
                        <h2 className="text-xl font-medium">
                            Existing categories
                        </h2>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {categories?.map(
                                ({
                                    category_name,
                                    created_at,
                                    category_id,
                                    category_color,
                                }: TCategory) => (
                                    <SingleCategory
                                        key={category_id}
                                        category_id={category_id}
                                        created_at={created_at}
                                        category_name={category_name}
                                        category_color={category_color}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}

function AddCategory() {
    const { post, processing, setData, data, errors, reset } = useForm({
        category_name: "",
        category_color: "",
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
                <textarea
                    value={data.category_name}
                    placeholder="Category Name..."
                    className="bg-neutral-50/70 border border-neutral-300 rounded-lg w-full"
                    onChange={(e) => setData("category_name", e.target.value)}
                ></textarea>
                <InputError message={errors.category_name} />
            </div>

            <div className="">
                <div
                    className="w-full h-3 rounded-lg mb-2"
                    style={{ backgroundColor: data.category_color }}
                ></div>
                <TextInput
                    placeholder="Category color #..."
                    id="category_color"
                    type="text"
                    name="category_color"
                    value={data.category_color}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 bg-neutral-50/70 focus:!border-indigo-500 focus:!ring-indigo-500"
                    onChange={(e) => setData("category_color", e.target.value)}
                />
            </div>

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

function SingleCategory({
    category_id,
    category_name,
    created_at,
    category_color,
}: TCategory) {
    const date = new Date(created_at);
    const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    const formattedCreatedAt = date.toLocaleDateString(undefined, dateOptions);

    const form = useForm();
    const deleteCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.delete(route("categories.destroy", category_id));
    };

    return (
        <div className="border border-neutral-300 rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <div
                    className="w-full h-3 rounded-full"
                    style={{ backgroundColor: category_color }}
                ></div>
                <Dialog>
                    <DialogTrigger>&middot;&middot;&middot;</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Do you want to delete this category ?
                            </DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your Category and remove your
                                data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={deleteCategory}>
                            <DialogFooter className="justify-end">
                                <Button size={"sm"} type="submit">
                                    Confirm
                                </Button>
                                <DialogClose asChild>
                                    <Button
                                        size={"sm"}
                                        type="button"
                                        variant="secondary"
                                    >
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <p className="text-xs text-end">{formattedCreatedAt}</p>
            <p className="text-lg">{category_name}</p>
        </div>
    );
}
