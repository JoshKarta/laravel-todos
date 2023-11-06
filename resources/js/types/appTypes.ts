export type TTask = {
    id: number;
    user_id: number;
    task_name: string;
    due_date: string;
    completed: number;
    category_id: number;
};

export type TCategory = {
    category_id?: number;
    category_name: string;
    category_color?: string;
    created_at: string;
};
