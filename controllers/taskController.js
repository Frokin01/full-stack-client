const { DELETE } = require('sequelize/lib/query-types');
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      userId: req.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании задачи' });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.userId } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении задач' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status,} = req.body;
  
  try {
      const task = await Task.findByPk(id);
      if (!task || task.userId !== req.userId) {
        return res.status(404).json({ 
            error: 'Задача не найдена или не принадлежит пользователю',
            userId: req.userId, 
            taskUserId: task ? task.userId : null 
        });}

      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      task.status = status;
      await task.save();

      res.json({ message: 'Задача обновлена'});
  } catch (error) {
      res.status(500).json({ error: 'Не удалось обновить задачу' });
  }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params; 
    console.log('ID задачи для удаления:', id);
    console.log('ID текущего пользователя:', req.userId);

    try {
        const task = await Task.findByPk(id); 
        if (!task) {
            console.log('Задача не найдена');
            return res.status(404).json({ error: 'Задача не найдена' });
        }

        if (task.userId !== req.userId) {
            console.log('Задача не принадлежит текущему пользователю');
            return res.status(403).json({ error: 'Нет доступа к удалению этой задачи' });
        }

        await task.destroy(); // Удаление задачи
        res.json({ message: 'Задача успешно удалена' });
    } catch (error) {
        console.error('Ошибка при удалении задачи:', error);
        res.status(500).json({ error: 'Не удалось удалить задачу' });
    }
};


// Выполнить задачу
exports.completeTask = async (req, res) => {
  const { id } = req.params;

  try {
      const task = await Task.findByPk(id);
      if (!task || task.userId !== req.userId) {
        return res.status(404).json({ 
            error: 'Задача не найдена или не принадлежит пользователю',
            userId: req.userId, 
            taskUserId: task ? task.userId : null 
        });}

      task.status = true; 
      await task.save();

      res.json({ message: 'Задача выполнена'});
  } catch (error) {
      res.status(500).json({ error: 'Не удалось выполнить задачу' });
  }
};