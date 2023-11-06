import { TCategory, TTask } from "@/types/appTypes";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const findCategory = (categories: TCategory[], id: number) => {
    return categories.find((cat: any) => cat.category_id === id);
};

export const selectedValueLabel = (categories: TCategory[], data: any) => {
    return categories.find(
        (el: TCategory) => el.category_id === data.category_id
    );
};

export const selectCategories = (categories: any) => {
    return categories.map(
        ({
            category_id,
            category_name,
        }: {
            category_id: number;
            category_name: string;
        }) => ({
            value: category_id,
            label: category_name,
        })
    );
};
