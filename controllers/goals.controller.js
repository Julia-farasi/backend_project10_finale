import Goals from "../models/Goals.js";

// POST /api/goals
export const createGoal = async (req, res) => {
  try {
    const newGoal = await Goals.create(req.body);
    res.status(201).json(newGoal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Erstellen des Ziels" });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goals.findAll(); // Sequelize Model
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Laden der Ziele" });
  }
};

///PUT
// PUT /api/goals/:id
export const editGoal = async (req, res) => {
  try {
    const goal = await Goals.findByPk(req.params.id);
    if (!goal) return res.status(404).json({ error: "Ziel nicht gefunden" });

    await goal.update(req.body);
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Aktualisieren des Ziels" });
  }
};

// DELETE /api/goals/:id
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goals.findByPk(req.params.id);
    if (!goal) return res.status(404).json({ error: "Ziel nicht gefunden" });

    await goal.destroy();
    res.status(204).send(); // Kein Inhalt zurück, aber erfolgreich
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Löschen des Ziels" });
  }
};
