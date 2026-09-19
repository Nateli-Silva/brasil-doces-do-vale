import { PrismaClient, Category } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin padrão ---
  const passwordHash = await bcrypt.hash("brasil2024", 10);
  await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: { username: "admin", password: passwordHash },
  });

  // --- Horários de entrega ---
  const slots = [
    { label: "Quinta-feira, 08:00 - 12:00", dayOfWeek: "Quinta-feira", startTime: "08:00", endTime: "12:00" },
    { label: "Quinta-feira, 14:00 - 18:00", dayOfWeek: "Quinta-feira", startTime: "14:00", endTime: "18:00" },
    { label: "Sexta-feira, 08:00 - 12:00", dayOfWeek: "Sexta-feira", startTime: "08:00", endTime: "12:00" },
    { label: "Sábado, 09:00 - 13:00", dayOfWeek: "Sábado", startTime: "09:00", endTime: "13:00" },
  ];
  for (const slot of slots) {
    const exists = await prisma.deliverySlot.findFirst({ where: { label: slot.label } });
    if (!exists) await prisma.deliverySlot.create({ data: slot });
  }

  // --- Produtos de exemplo (inspirados no catálogo da marca) ---
  const products = [
    {
      name: "Mini Trufas Irresistíveis",
      description: "Caixa de mini trufas artesanais, feitas com amor e o verdadeiro sabor do Brasil.",
      price: 24.9,
      category: Category.TRUFAS,
      featured: true,
      imageUrl: "",
    },
    {
      name: "Brigadeiros Gourmet",
      description: "Brigadeiros irresistíveis, cobertura crocante e recheio cremoso.",
      price: 2.5,
      category: Category.BRIGADEIROS,
      featured: true,
      imageUrl: "",
    },
    {
      name: "Cones Trufados",
      description: "Cones trufados recheados, feitos no Brasil com produto premium.",
      price: 12.0,
      category: Category.CONES,
      featured: true,
      imageUrl: "",
    },
    {
      name: "Alfajores Artesanais",
      description: "Alfajores macios recheados com doce de leite e cobertura de chocolate.",
      price: 8.5,
      category: Category.ALFAJORES,
      featured: false,
      imageUrl: "",
    },
    {
      name: "Combo Revenda 50un",
      description: "Combo ideal para revenda: 50 brigadeiros variados, preço especial de atacado.",
      price: 89.9,
      category: Category.COMBOS,
      featured: false,
      imageUrl: "",
    },
    {
      name: "Kit Revenda Trufas 30un",
      description: "Kit fechado para revenda com 30 trufas sortidas. Ideal para pequenos negócios.",
      price: 99.9,
      category: Category.REVENDA,
      featured: false,
      imageUrl: "",
    },
  ];

  for (const p of products) {
    const exists = await prisma.product.findFirst({ where: { name: p.name } });
    if (!exists) await prisma.product.create({ data: p });
  }

  console.log("Seed concluído. Usuário admin: admin / senha: brasil2024");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
