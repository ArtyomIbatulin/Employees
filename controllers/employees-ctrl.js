const { prisma } = require("../prisma/prisma-client");

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ message: "Не получить всех сотрудников" });
  }
};

const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.age || !data.address) {
      return res.status(400).json({ message: "Заполните поля" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    return res.status(201).json(employee);
  } catch (err) {
    return res.status(500).json({ message: "Не удалось добавить сотрудника" });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(204).json(deleted);
  } catch (err) {
    return res.status(500).json({ message: "Не удалось удалить сотрудника" });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    const edited = await prisma.employee.update({
      where: { id },
      data,
    });
    res.status(204).json(edited);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Не удалось отредактировать сотрудника" });
  }
};

const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ message: "Не удалось получить сотрудника" });
  }
};

module.exports = { all, add, remove, edit, employee };
