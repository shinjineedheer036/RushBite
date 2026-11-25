const MenuItem = require("../models/MenuItem");
const PickupSlot = require("../models/PickupSlot");

const menuItems = [
  {
    id: "item_001",
    name: "Veg Burger",
    price: 50,
    category: "Snacks",
    image: "",
    available: true
  },
  {
    id: "item_002",
    name: "Cheese Sandwich",
    price: 60,
    category: "Snacks",
    image: "",
    available: true
  },
  {
    id: "item_003",
    name: "Masala Dosa",
    price: 70,
    category: "Meals",
    image: "",
    available: true
  },
  {
    id: "item_004",
    name: "Veg Noodles",
    price: 65,
    category: "Meals",
    image: "",
    available: true
  },
  {
    id: "item_005",
    name: "Cold Coffee",
    price: 40,
    category: "Drinks",
    image: "",
    available: true
  },
  {
    id: "item_006",
    name: "Samosa",
    price: 20,
    category: "Snacks",
    image: "",
    available: true
  }
];

const generateSlots = () => {
  const slots = [];

  // 12:00 PM to 2:00 PM, in 15-minute intervals.
  for (let minutes = 12 * 60; minutes < 14 * 60; minutes += 15) {
    const endMinutes = minutes + 15;

    const formatTime = (time) => {
      const hours = Math.floor(time / 60);
      const mins = time % 60;

      return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    };

    slots.push({
      id: formatTime(minutes),
      startTime: formatTime(minutes),
      endTime: formatTime(endMinutes),
      capacity: 20,
      booked: 0
    });
  }

  return slots;
};

const seedDatabase = async () => {
  for (const item of menuItems) {
    await MenuItem.updateOne(
      { id: item.id },
      { $setOnInsert: item },
      { upsert: true }
    );
  }

  const slots = generateSlots();

  for (const slot of slots) {
    await PickupSlot.updateOne(
      { id: slot.id },
      { $setOnInsert: slot },
      { upsert: true }
    );
  }

  console.log("Menu and pickup slots seeded successfully!");
};

module.exports = seedDatabase;