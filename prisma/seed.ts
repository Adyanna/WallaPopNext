import { Tag } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  // Limpiar la base de datos antes de insertar nuevos datos
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.ad.deleteMany();
  await prisma.user.deleteMany();

  //creamos los usuarios

  const passwordHash = await bcrypt.hash("123456", 10);

  const ana = await prisma.user.create({
    data: {
      name: "Ana López",
      username: "ana",
      email: "ana@wallapop.com",
      passwordHash,
    },
  });

  const carlos = await prisma.user.create({
    data: {
      name: "Carlos Pérez",
      username: "carlos",
      email: "carlos@wallapop.com",
      passwordHash,
    },
  });

  const maria = await prisma.user.create({
    data: {
      name: "María García",
      username: "maria",
      email: "maria@wallapop.com",
      passwordHash,
    },
  });

  console.log("Usuarios creados:");
  console.log({ ana, carlos, maria });

  // Crear anuncios
  const createdAds = await Promise.all(
    ads.map((ad, index) =>
      prisma.ad.create({
        data: {
          ...ad,
          ownerId: index < 10 ? ana.id : carlos.id,
        },
      }),
    ),
  );

  const comments = [
    // María comenta anuncios de Ana
    {
      message: "¡Se ve increíble!",
      userId: maria.id,
      ad: 0,
    },
    {
      message: "¿Sigue disponible?",
      userId: maria.id,
      ad: 2,
    },
    {
      message: "Me interesa bastante.",
      userId: maria.id,
      ad: 4,
    },
    {
      message: "¿Aceptas ofertas?",
      userId: maria.id,
      ad: 6,
    },
    {
      message: "Excelente precio.",
      userId: maria.id,
      ad: 8,
    },

    // María comenta anuncios de Carlos
    {
      message: "Muy bonito.",
      userId: maria.id,
      ad: 10,
    },
    {
      message: "¿Tiene garantía?",
      userId: maria.id,
      ad: 12,
    },
    {
      message: "Lo compraría.",
      userId: maria.id,
      ad: 14,
    },
    {
      message: "¿Haces envíos?",
      userId: maria.id,
      ad: 16,
    },
    {
      message: "Está en muy buen estado.",
      userId: maria.id,
      ad: 18,
    },

    // Ana comenta anuncios de Carlos
    {
      message: "Muy interesante.",
      userId: ana.id,
      ad: 11,
    },
    {
      message: "¿Podemos negociar el precio?",
      userId: ana.id,
      ad: 15,
    },

    // Carlos comenta anuncios de Ana
    {
      message: "Me gusta bastante.",
      userId: carlos.id,
      ad: 1,
    },
    {
      message: "Se ve como nuevo.",
      userId: carlos.id,
      ad: 5,
    },
  ];

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      message: comment.message,
      userId: comment.userId,
      adId: createdAds[comment.ad].id,
    })),
  });

  console.log("Comentarios creados");

  const likes = [
    // María da like a los 10 primeros anuncios
    { userId: maria.id, ad: 0 },
    { userId: maria.id, ad: 1 },
    { userId: maria.id, ad: 2 },
    { userId: maria.id, ad: 3 },
    { userId: maria.id, ad: 4 },
    { userId: maria.id, ad: 5 },
    { userId: maria.id, ad: 6 },
    { userId: maria.id, ad: 7 },
    { userId: maria.id, ad: 8 },
    { userId: maria.id, ad: 9 },

    // Ana da like a anuncios de Carlos
    { userId: ana.id, ad: 10 },
    { userId: ana.id, ad: 11 },
    { userId: ana.id, ad: 12 },
    { userId: ana.id, ad: 13 },
    { userId: ana.id, ad: 14 },

    // Carlos da like a anuncios de Ana
    { userId: carlos.id, ad: 0 },
    { userId: carlos.id, ad: 1 },
    { userId: carlos.id, ad: 2 },
    { userId: carlos.id, ad: 3 },
    { userId: carlos.id, ad: 4 },
  ];
  await prisma.like.createMany({
    data: likes.map((like) => ({
      userId: like.userId,
      adId: createdAds[like.ad].id,
    })),
  });

  console.log("Likes creados");
}

const ads = [
  {
    title: "MacBook Pro M3",
    description:
      "Portátil Apple con 16 GB de RAM y 512 GB SSD, excelente estado.",
    price: 1800,
    imageUrl: "/uploads/laptop.jpg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: "iPhone 15 Pro",
    description: "Como nuevo, batería al 100%, incluye caja y cargador.",
    price: 950,
    imageUrl: "/uploads/phone.jpeg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: "Bicicleta de montaña",
    description: "Rodado 29, suspensión delantera, muy poco uso.",
    price: 420,
    imageUrl: "/uploads/bike.jpeg",
    tags: [Tag.SPORTS],
  },
  {
    title: "Sofá de 3 plazas",
    description: "Muy cómodo, color gris, ideal para sala.",
    price: 350,
    imageUrl: "/uploads/sofa.jpeg",
    tags: [Tag.HOME],
  },
  {
    title: 'Smart TV Samsung 55"',
    description: "Resolución 4K UHD con control remoto.",
    price: 650,
    imageUrl: "/uploads/tv.jpeg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: "Cámara Canon EOS",
    description: "Perfecta para fotografía y video.",
    price: 780,
    imageUrl: "/uploads/camera.jpeg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: "Auriculares Bluetooth",
    description: "Cancelación de ruido y gran autonomía.",
    price: 120,
    imageUrl: "/uploads/headphones.jpg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: "Teclado Mecánico RGB",
    description: "Switches azules, retroiluminación RGB.",
    price: 95,
    imageUrl: "/uploads/keyboard.jpeg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: 'Monitor LG 27"',
    description: "Pantalla IPS Full HD de 27 pulgadas.",
    price: 260,
    imageUrl: "/uploads/monitor.jpg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: "Reloj Inteligente",
    description: "Monitorea actividad física y notificaciones.",
    price: 180,
    imageUrl: "/uploads/watch.jpeg",
    tags: [Tag.ELECTRONICS],
  },
  {
    title: "Colección de libros",
    description: "10 novelas clásicas en excelente estado.",
    price: 60,
    imageUrl: "/uploads/book.jpeg",
    tags: [Tag.BOOKS],
  },
  {
    title: "Guitarra acústica Yamaha",
    description: "Sonido excelente para principiantes y profesionales.",
    price: 290,
    imageUrl: "/uploads/guitar.jpg",
    tags: [Tag.OTHERS],
  },
  {
    title: "Taladro inalámbrico",
    description: "Incluye batería y cargador.",
    price: 140,
    imageUrl: "/uploads/drill.jpeg",
    tags: [Tag.HOME],
  },
  {
    title: "Aspiradora Robot",
    description: "Limpieza automática con programación.",
    price: 330,
    imageUrl: "/uploads/vacuum.jpeg",
    tags: [Tag.HOME],
  },
  {
    title: "Microondas LG",
    description: "20 litros, excelente funcionamiento.",
    price: 110,
    imageUrl: "/uploads/microwave.jpeg",
    tags: [Tag.HOME],
  },
  {
    title: "Auto de juguete RC",
    description: "Control remoto y batería recargable.",
    price: 45,
    imageUrl: "/uploads/toy-car.jpeg",
    tags: [Tag.TOYS],
  },
  {
    title: "Casa para perro",
    description: "Madera tratada para exteriores.",
    price: 150,
    imageUrl: "/uploads/dog-house.jpeg",
    tags: [Tag.PETS],
  },
  {
    title: "Llanta para automóvil",
    description: "Rin 16, poco uso.",
    price: 90,
    imageUrl: "/uploads/car-tire.jpeg",
    tags: [Tag.VEHICLES],
  },
  {
    title: "Silla de oficina ergonómica",
    description: "Respaldo lumbar y altura regulable.",
    price: 240,
    imageUrl: "/uploads/office-chair.jpg",
    tags: [Tag.HOME],
  },
  {
    title: "Balón de fútbol Adidas",
    description: "Balón oficial, tamaño 5.",
    price: 35,
    imageUrl: "/uploads/football.jpg",
    tags: [Tag.SPORTS],
  },
];

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
