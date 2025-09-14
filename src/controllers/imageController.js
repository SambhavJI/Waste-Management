const classInfo = {
  "ewaste": {
    recyclable: "special",
    instructions:
      "Take e-waste to certified recycling centers. Never mix with household trash. Ensure batteries and circuit boards are separated if possible.",
    tip: "🔋 Remove batteries before disposal.\n💡 Donate working devices to reduce waste.\n♻️ Many e-waste items contain valuable metals like gold and copper.",
    impact:
      "Improper disposal releases toxic substances like lead and mercury, contaminates soil and water, and harms both human and ecological health."
  },

  "dry waste": {
    recyclable: true,
    instructions:
      "Segregate dry waste such as plastics, paper, cardboard, and glass. Clean them before disposal. Drop them at designated dry waste collection centers or recycling bins.",
    tip: "📦 Flatten cardboard boxes to save space.\n🥤 Rinse containers before recycling.\n🛍️ Prefer reusable bags over single-use plastics.",
    impact:
      "Recycling dry waste conserves raw materials, reduces pollution, and prevents overfilling of landfills."
  },

  "wet waste": {
    recyclable: false,
    instructions:
      "Dispose of wet waste like food scraps, peels, and other organic matter in green bins. Avoid mixing with dry waste. Compost if possible.",
    tip: "🍌 Keep a separate kitchen bin for food scraps.\n🌱 Start home composting to reduce wet waste.\n🚫 Avoid plastic liners in wet waste bins.",
    impact:
      "If unmanaged, wet waste produces foul odors and methane gas. Proper composting reduces greenhouse emissions and enriches soil."
  },

  "unidentified": {
    recyclable: false,
    instructions:
      "This item could not be clearly classified. Handle with caution – it may include hazardous, chemical, medical, human, or animal waste. Dispose only at authorized hazardous waste facilities.",
    tip: "⚠️ Do not touch unidentified waste with bare hands.\n🚑 Contact local waste authorities for guidance.\n🧪 Treat all unidentified waste as potentially dangerous.",
    impact:
      "Unidentified waste can be highly harmful to human health, animals, and the environment. Mishandling may cause contamination, infections, or toxic exposure."
  }
};

const imageClassify = async (req, res) => {
  try {
    let { pred } = req.body;

    const key = pred.trim().toLowerCase();

    const info = classInfo[key];
    if (!info) {
      return res.status(400).send("Invalid prediction category");
    }

    res.json({
      pred: pred.trim(),
      ...info
    });
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
};

module.exports = imageClassify;
