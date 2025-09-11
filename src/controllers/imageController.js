const classInfo = {
  "biodegradable": {
    recyclable: true,
    instructions: "Dispose of biodegradable waste in compost bins or organic waste collection points.",
    tip: "Biodegradable materials enrich soil and reduce landfill usage.",
    impact: "Helps maintain ecological balance by turning waste into natural resources."
  },
  "non biodegradable": {
    recyclable: false,
    instructions: "Do not burn or bury. Dispose of properly at waste management centers.",
    tip: "Reduce usage by preferring reusable or recyclable alternatives.",
    impact: "If not managed, they persist in the environment for centuries and pollute land and water."
  },
  "ewaste": {
    recyclable: "special",
    instructions: "Take e-waste to certified recycling centers. Do not dispose with regular trash.",
    tip: "Many e-waste items contain valuable metals like gold and copper which can be recovered.",
    impact: "Improper disposal releases toxic substances like lead and mercury into the environment."
  }
};



const imageClassify = async (req,res) => {
    try {
        const {pred} = req.body;
        const info = classInfo[pred];
        if (!info) {
            return res.status(400).send("Invalid prediction category");
        }
        res.json({
            pred,...info
        })
    } catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
}
module.exports = imageClassify 