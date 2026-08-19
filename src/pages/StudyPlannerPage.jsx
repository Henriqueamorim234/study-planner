import { useState } from "react";
import { EmptyState, ThemeToggle } from "../components/UI";
import { AddTaskModal, EditTaskModal } from "../components/Modal";
import { TaskSection } from "../components/Task";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../store/slices/themeSlice";
import {
  selectCompletedTasks,
  selectPendingTasks,
  selectTasks,
  addTask,
  toggleTaskCompleted,
  editTask,
  deleteTask,
} from "../store/slices/taskSlice";

function StudyPlannerPage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const tasks = useSelector(selectTasks);
  const pendingTasks = useSelector(selectPendingTasks);
  const completedTasks = useSelector(selectCompletedTasks);

  const theme = useSelector(selectTheme);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddNewTask = (newTask) => {
    dispatch(addTask(newTask));
  };

  const handleToggleComplete = (taskId) => {
    dispatch(toggleTaskCompleted(taskId));
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const handleSaveEditTask = (taskId, updatedTask) => {
    dispatch(editTask({ taskId, updatedTask }));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: theme.background,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-purple-header rounded-t-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-icons text-white text-lg">school</span>
              <h1 className="text-white font-medium text-lg">
                Plano de Estudos
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-b-2xl p-6`}>
          {tasks.length === 0 ? (
            <EmptyState onAddTask={handleAddTask} />
          ) : (
            <div>
              <TaskSection
                title="Para estudar"
                tasks={pendingTasks}
                borderColor="gray-600"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <TaskSection
                title="Concluído"
                tasks={completedTasks}
                borderColor="purple-header"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleAddTask}
                  className="w-12 h-12 bg-purple-header hover:bg-purple-dark transition-colors rounded-full flex items-center justify-center"
                  aria-label="Adicionar tarefa"
                >
                  <span className="material-icons text-white text-xl">add</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTask={handleAddNewTask}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditTask={handleSaveEditTask}
        task={taskToEdit}
      />
    </div>
  );
}

export default StudyPlannerPage;
