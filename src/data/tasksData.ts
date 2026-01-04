// Data layer for tasks, keep MVC structure, and test-friendly.

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

const defaultTasks: Task[] = [
  { id: 1, title: "Buy milk", done: false },
  { id: 2, title: "Walk dog", done: true },
];

export let tasks: Task[] = [...defaultTasks];
