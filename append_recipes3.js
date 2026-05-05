const fs = require('fs');

const newRecipes = [
  {
    "id": "ceviche-camaron-1",
    "title": "Ceviche de Camarón Chapín",
    "description": "Frescura del Pacífico en tu mesa. El ceviche guatemalteco se caracteriza por su abundante 'caldito' oscuro a base de tomate, salsa inglesa y soya, combinado con la acidez del jugo de limón, la cebolla morada crujiente y hierbabuena fresca. Ideal para un sábado al mediodía.",
    "basePortions": 4,
    "category": "Mariscos / Entrada",
    "difficulty": "Fácil",
    "prepTime": "30 min",
    "cookTime": "0 min",
    "temperature": "Frío",
    "rating": 5,
    "author": "Costa del Pacífico",
    "utensils": ["Tazón grande de vidrio", "Exprimidor de limones", "Cuchillo afilado"],
    "tips": "El secreto del color oscuro y el sabor umami está en la salsa inglesa (tipo Lea & Perrins). Si no consigues camarones súper frescos, puedes darles un ligerísimo hervor de 1 minuto antes de curtirlos en el limón.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Camarones medianos crudos (pelados y limpios)", "qty": 1.5, "unit": "lb", "price": 60.00, "store": "Pescadería" },
      { "name": "Jugo de limón recién exprimido", "qty": 1.5, "unit": "taza", "price": 10.00, "store": "Mercado" },
      { "name": "Tomates de cocina firmes", "qty": 5, "unit": "unidades", "price": 8.00, "store": "Mercado" },
      { "name": "Cebolla morada grande", "qty": 1, "unit": "unidad", "price": 4.00, "store": "Mercado" },
      { "name": "Cilantro y Hierbabuena fresca", "qty": 1, "unit": "manojo", "price": 4.00, "store": "Mercado" },
      { "name": "Salsa inglesa", "qty": 0.5, "unit": "taza", "price": 8.00, "store": "Supermercado" },
      { "name": "Salsa de soya", "qty": 2, "unit": "cda", "price": 2.00, "store": "Supermercado" },
      { "name": "Jugo de tomate (tipo V8 o Kermato)", "qty": 1, "unit": "taza", "price": 5.00, "store": "Supermercado" },
      { "name": "Galletas soda", "qty": 1, "unit": "paquete", "price": 5.00, "store": "Abarrotería" }
    ],
    "steps": [
      {
        "title": "El Curtido del Camarón",
        "description": "Lava muy bien los camarones. Si son muy grandes, pártelos por la mitad. Colócalos en el tazón de vidrio y báñalos completamente con el jugo de limón y abundante sal. Déjalos reposar en el refrigerador hasta que cambien a un color rosado opaco.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Curtir en limón", "minutes": 25 }
      },
      {
        "title": "El Picado Fino",
        "description": "Mientras el camarón se curte, pica finamente la cebolla morada, los tomates (quitándoles el exceso de semillas) y las hojas de cilantro y hierbabuena. Entre más fino el picado, mejor la textura del ceviche.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "La Mezcla de Sabores",
        "description": "Saca los camarones del refrigerador. No botes el jugo de limón. Agrega la cebolla, el tomate y las hierbas. Vierte la salsa inglesa, la soya y el jugo de tomate frío.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      },
      {
        "title": "Ajuste y Servicio",
        "description": "Mezcla todo con cuidado. Prueba y ajusta la sal y el limón. Debe quedar jugoso (con bastante 'caldito'). Sirve en copas grandes de vidrio y acompaña con galletas soda, salsa picante y aguacate partido.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      }
    ]
  },
  {
    "id": "ceviche-conchas-1",
    "title": "Ceviche de Conchas Negras",
    "description": "Un manjar del Pacífico guatemalteco. Este ceviche tiene un sabor a mar muy pronunciado y un característico color negro azabache proveniente de la sangre de la concha negra. Es famoso por sus propiedades revitalizantes.",
    "basePortions": 2,
    "category": "Mariscos / Entrada",
    "difficulty": "Media",
    "prepTime": "20 min",
    "cookTime": "0 min",
    "temperature": "Frío",
    "rating": 4.9,
    "author": "Costa Sur",
    "utensils": ["Cuchillo especial para ostras/conchas", "Tazón hondo", "Cuchara sopera"],
    "tips": "Abrir las conchas requiere técnica: busca la pequeña hendidura en la parte superior, inserta el cuchillo corto y gira. Recolecta CADA GOTA del jugo negro que sueltan, esa es la esencia del ceviche.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Conchas negras frescas (Pata de mula)", "qty": 24, "unit": "unidades", "price": 45.00, "store": "Pescadería" },
      { "name": "Jugo de limón", "qty": 6, "unit": "limones", "price": 3.00, "store": "Mercado" },
      { "name": "Cebolla morada picada", "qty": 1, "unit": "taza", "price": 3.00, "store": "Mercado" },
      { "name": "Tomate finamente picado", "qty": 2, "unit": "unidades", "price": 3.00, "store": "Mercado" },
      { "name": "Cilantro y Hierbabuena picada", "qty": 0.5, "unit": "taza", "price": 2.00, "store": "Mercado" },
      { "name": "Salsa inglesa", "qty": 2, "unit": "cda", "price": 1.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Apertura y Extracción",
        "description": "Lava muy bien las conchas por fuera con un cepillo. Ábrelas cuidadosamente con un cuchillo fuerte. Vierte el interior (la carne y el líquido negro) directamente en el tazón. Raspa bien las valvas.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Abrir conchas", "minutes": 15 }
      },
      {
        "title": "La Curación Ácida",
        "description": "Una vez toda la carne y jugo esté en el tazón, agrega el jugo de limón y sal. Revuelve suavemente. Verás que la carne de la concha se encoge ligeramente por la acidez.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "Vegetales y Servir",
        "description": "Inmediatamente agrega la cebolla, tomate y hierbas picadas. Añade unas gotas de salsa inglesa (no demasiada para no ocultar el sabor a mar). Mezcla bien, añade unas gotas de chile cobanero y sirve rápido con galletas saladas.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  },
  {
    "id": "subanik-1",
    "title": "Subanik Ceremonial",
    "description": "El 'Tamal de Dios'. Un guiso prehispánico originario de San Martín Jilotepeque. Consiste en tres carnes bañadas en un recado rojo y picante, cocidas al vapor dentro de un nido de hojas de maxán en forma de corona. Se amarra con cibaque y se desata en la mesa.",
    "basePortions": 8,
    "category": "Plato fuerte festivo",
    "difficulty": "Avanzada",
    "prepTime": "45 min",
    "cookTime": "120 min",
    "temperature": "Vapor profundo",
    "rating": 5,
    "author": "Chimaltenango",
    "utensils": ["Olla inmensa tipo tamalera", "Hojas de maxán", "Cibaque", "Licuadora", "Comal"],
    "tips": "El nido de hojas (la corona) debe ser hermético. Se colocan las hojas en el fondo de la olla formando una flor o canasta, se vierte la carne cruda y el recado, y se amarran todas las puntas hacia arriba.",
    "isPublic": true,
    "isContestEntry": true,
    "ingredients": [
      { "name": "Carne de res (bolovique cortado en trozos)", "qty": 1, "unit": "lb", "price": 30.00, "store": "Carnicería" },
      { "name": "Carne de cerdo (posta o costilla)", "qty": 1, "unit": "lb", "price": 25.00, "store": "Carnicería" },
      { "name": "Pollo (piezas deshuesadas)", "qty": 1, "unit": "lb", "price": 15.00, "store": "Carnicería" },
      { "name": "Tomates asados", "qty": 1.5, "unit": "lb", "price": 8.00, "store": "Mercado" },
      { "name": "Miltomate asado", "qty": 0.5, "unit": "lb", "price": 4.00, "store": "Mercado" },
      { "name": "Chiles pimientos y chile guaque asados", "qty": 4, "unit": "unidades", "price": 5.00, "store": "Mercado" },
      { "name": "Chile chiltepe o cobanero", "qty": 1, "unit": "porción", "price": 2.00, "store": "Mercado" },
      { "name": "Hojas de maxán grandes", "qty": 10, "unit": "unidades", "price": 10.00, "store": "Mercado" },
      { "name": "Masa de maíz (para espesar un poco)", "qty": 0.5, "unit": "taza", "price": 2.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "El Recado Subanik",
        "description": "Asa muy bien los tomates, miltomates, cebolla, ajos y toda la variedad de chiles. Licúa todo hasta obtener una salsa roja fina. Si deseas, añade un poco de masa diluida para darle cuerpo, aunque el tradicional es más líquido.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Asar vegetales", "minutes": 20 }
      },
      {
        "title": "Formar el Nido (La Corona)",
        "description": "En una olla muy grande y ancha, coloca las hojas de maxán (previamente limpias y suavizadas al fuego) desde el centro hacia afuera, solapándolas en forma de flor, dejando que las puntas cuelguen fuera de la olla.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "El Relleno Trío",
        "description": "Corta todas las carnes CRUDAS en trozos medianos y sazónalas con sal y pimienta. Colócalas en el centro de la flor de hojas. Vierte todo el recado licuado sobre las carnes crudas.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "El Amarre Ceremonial",
        "description": "Con ayuda de otra persona, levanten todas las puntas de las hojas de maxán hacia el centro, encerrando la carne y los jugos. Aten fuertemente el penacho con tiras de cibaque para formar un gran paquete hermético dentro de la olla.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800"
      },
      {
        "title": "Cocción Oculta",
        "description": "Agrega agua a la olla (por fuera del paquete de hojas) hasta alcanzar unos 10 cm de altura. Tapa la olla y cocina al vapor. El paquete de hojas retendrá la presión, cociendo la carne en sus propios jugos.",
        "imageUrl": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800",
        "timer": { "name": "Cocción al vapor", "minutes": 120 }
      }
    ]
  },
  {
    "id": "revolcado-1",
    "title": "Revolcado de Cerdo",
    "description": "Un guiso denso e intenso que aprovecha la cabeza y los menudos del cerdo, bañados en un recado espeso que combina el sabor del tomate, miltomate y el achiote. Es un manjar de los mercados populares.",
    "basePortions": 8,
    "category": "Plato fuerte",
    "difficulty": "Avanzada",
    "prepTime": "30 min",
    "cookTime": "150 min",
    "temperature": "Hervor lento",
    "rating": 4.5,
    "author": "Cocina de Mercado",
    "utensils": ["Olla grande", "Licuadora", "Comal", "Sartén"],
    "tips": "La cocción de la cabeza de cerdo es crucial. Lávala exhaustivamente con limón y sal antes de hervirla. Pide al carnicero que la parta en trozos manejables.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Cabeza de cerdo en trozos (y algo de hígado si se desea)", "qty": 3, "unit": "lb", "price": 45.00, "store": "Carnicería" },
      { "name": "Tomate maduro", "qty": 1.5, "unit": "lb", "price": 8.00, "store": "Mercado" },
      { "name": "Miltomate", "qty": 0.5, "unit": "lb", "price": 4.00, "store": "Mercado" },
      { "name": "Chile guaque", "qty": 3, "unit": "unidades", "price": 3.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Masa de maíz (para espesar)", "qty": 1, "unit": "taza", "price": 2.00, "store": "Molino" },
      { "name": "Achiote", "qty": 1, "unit": "cda", "price": 1.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Limpieza y Hervor de la Carne",
        "description": "Lava muy bien las carnes con limón. Hierve en abundante agua con sal, cebolla y ajo hasta que la carne esté suave y se desprenda del hueso de la cabeza. Retira del caldo, pica la carne finamente y reserva el caldo.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Cocer cabeza", "minutes": 120 }
      },
      {
        "title": "El Recado Rojo",
        "description": "Asa en el comal el tomate, miltomate, cebolla, chiles guaque (sin semillas) y ajos. Licúa y pasa por un colador.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Asar y licuar", "minutes": 15 }
      },
      {
        "title": "Sofreír el Recado",
        "description": "En una olla honda, calienta aceite o manteca de cerdo y sofríe el recado licuado. Disuelve el achiote para darle más color.",
        "imageUrl": "https://images.unsplash.com/photo-1559181567-c3190cb9959b?q=80&w=800"
      },
      {
        "title": "El 'Revolcado'",
        "description": "Agrega la carne picada al recado. Disuelve la masa de maíz en un poco del caldo reservado (fresco) y agrégala a la olla. Mueve constantemente a fuego lento. El recado debe volverse muy espeso y abrazar por completo la carne.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Espesar revolcado", "minutes": 20 }
      }
    ]
  },
  {
    "id": "iguaxte-1",
    "title": "Iguaxte (Iguaste)",
    "description": "Una receta ancestral puramente vegetariana (aunque a veces se le añade pollo). Su base es la pepitoria tostada molida combinada con miltomate y vegetales como ejotes y papas. Es un recado rústico, verde pálido, espeso y con un sabor increíble a semillas.",
    "basePortions": 4,
    "category": "Plato fuerte / Vegetariano",
    "difficulty": "Fácil",
    "prepTime": "20 min",
    "cookTime": "30 min",
    "temperature": "Fuego bajo",
    "rating": 4.3,
    "author": "Recetas Indígenas",
    "utensils": ["Comal", "Licuadora", "Olla"],
    "tips": "El alma del plato es la pepitoria. Debes tostarla muy bien a fuego lento, sin dejarla quemar. El Iguaxte tiende a espesar mucho, así que ten agua caliente o caldo de vegetales a mano.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Pepitoria (semilla de calabaza)", "qty": 8, "unit": "oz", "price": 10.00, "store": "Mercado" },
      { "name": "Miltomate verde", "qty": 1, "unit": "lb", "price": 6.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Ajo", "qty": 2, "unit": "dientes", "price": 1.00, "store": "Mercado" },
      { "name": "Papas", "qty": 1, "unit": "lb", "price": 4.00, "store": "Mercado" },
      { "name": "Ejotes", "qty": 0.5, "unit": "lb", "price": 3.00, "store": "Mercado" },
      { "name": "Chile verde picante (opcional)", "qty": 1, "unit": "unidad", "price": 1.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "Tostar y Moler Pepitoria",
        "description": "En un comal caliente a fuego bajo, tuesta la pepitoria removiéndola hasta que se infle y dore. Pásala a la licuadora en seco y muélela hasta obtener un polvo fino.",
        "imageUrl": "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800",
        "timer": { "name": "Tostar pepitoria", "minutes": 10 }
      },
      {
        "title": "El Caldito Verde",
        "description": "Hierve los miltomates, cebolla, ajo y el chile en poca agua. Licúa estos vegetales junto con el agua de cocción.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Vegetales Base",
        "description": "En una olla aparte, cuece las papas cortadas en cuadros y los ejotes partidos por la mitad, con un poco de sal.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "La Unión del Iguaxte",
        "description": "A la olla con los vegetales cocidos, agrégales el miltomate licuado y el polvo de pepitoria. Revuelve bien. Hervirá y espesará casi inmediatamente. Salpimienta y sirve con tortillas de maíz salidas del comal.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
        "timer": { "name": "Espesar", "minutes": 5 }
      }
    ]
  },
  {
    "id": "frijoles-blancos-1",
    "title": "Frijoles Blancos con Espinazo de Cerdo",
    "description": "Un guiso casero espectacular, espeso y aromático. Los frijoles blancos se cuecen lentamente hasta crear una crema suave, acompañados de costilla o espinazo de cerdo y un recado de tomate y ajo. Clásico de los jueves o domingos.",
    "basePortions": 6,
    "category": "Sopa / Plato fuerte",
    "difficulty": "Media",
    "prepTime": "Cargar noche anterior",
    "cookTime": "120 min",
    "temperature": "Hervor lento",
    "rating": 4.8,
    "author": "Recetario Central",
    "utensils": ["Olla de presión", "Sartén", "Licuadora"],
    "tips": "Remojar los frijoles blancos desde la noche anterior en abundante agua fría es mandatorio. Usa espinazo de cerdo, ya que los huesos aportan una gelatina natural que espesa el caldo divinamente.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Frijol blanco seco", "qty": 1, "unit": "lb", "price": 10.00, "store": "Mercado" },
      { "name": "Espinazo o costilla de cerdo", "qty": 1.5, "unit": "lb", "price": 35.00, "store": "Carnicería" },
      { "name": "Tomate", "qty": 1, "unit": "lb", "price": 5.00, "store": "Mercado" },
      { "name": "Cebolla", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Ajo", "qty": 4, "unit": "dientes", "price": 1.00, "store": "Mercado" },
      { "name": "Miltomate", "qty": 2, "unit": "oz", "price": 2.00, "store": "Mercado" },
      { "name": "Orégano seco", "qty": 1, "unit": "pizca", "price": 1.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Cocción Base",
        "description": "Después del remojo nocturno, lava los frijoles y ponlos en la olla de presión junto con el espinazo de cerdo, abundante agua, media cebolla y sal. Cocina a presión hasta que el frijol y la carne estén muy suaves.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Olla de presión", "minutes": 45 }
      },
      {
        "title": "El Recado",
        "description": "Mientras tanto, asa el tomate, miltomate, la otra media cebolla y los ajos en un comal. Licúalos bien y fríe esta salsa en una sartén con una pizca de orégano.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800",
        "timer": { "name": "Sofreír salsa", "minutes": 10 }
      },
      {
        "title": "Espesado Final",
        "description": "Abre la olla de presión con cuidado. Agrega la salsa frita a los frijoles y la carne. Deja hervir a fuego lento y sin tapadera para que el caldo se evapore un poco y el guiso quede espeso.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Hervor abierto", "minutes": 15 }
      }
    ]
  },
  {
    "id": "pollo-crema-loroco-1",
    "title": "Pollo en Crema con Loroco",
    "description": "Una fusión delicada y muy aromática originaria del oriente de Guatemala. Pechugas o piezas de pollo bañadas en una crema blanca espesa, enriquecida con la inconfundible flor de loroco y rodajas de cebolla.",
    "basePortions": 4,
    "category": "Plato fuerte",
    "difficulty": "Fácil",
    "prepTime": "15 min",
    "cookTime": "35 min",
    "temperature": "Fuego lento",
    "rating": 4.6,
    "author": "Oriente",
    "utensils": ["Sartén honda con tapadera", "Cuchara de madera"],
    "tips": "Agrega el loroco en los últimos 5 minutos de cocción; si hierve demasiado, perderá su aroma y se volverá amargo. La crema debe ser crema pura de vaca (no ácida ni artificial).",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Pechugas de pollo enteras o en trozos", "qty": 1.5, "unit": "lb", "price": 25.00, "store": "Pollería" },
      { "name": "Crema pura y espesa (nata)", "qty": 1, "unit": "taza", "price": 12.00, "store": "Lácteos" },
      { "name": "Loroco fresco (flores enteras o ligeramente picadas)", "qty": 0.5, "unit": "lb", "price": 15.00, "store": "Mercado" },
      { "name": "Cebolla blanca en julianas", "qty": 1, "unit": "unidad", "price": 2.00, "store": "Mercado" },
      { "name": "Mantequilla", "qty": 2, "unit": "cda", "price": 4.00, "store": "Supermercado" },
      { "name": "Ajo finamente picado", "qty": 2, "unit": "dientes", "price": 1.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Sellado del Pollo",
        "description": "En la sartén honda, derrite la mantequilla. Sazona el pollo con sal y pimienta y dóralo bien por todos sus lados a fuego medio-alto.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Sellar pollo", "minutes": 10 }
      },
      {
        "title": "Cocción con Cebolla",
        "description": "Agrega la cebolla en julianas y el ajo al sartén con el pollo. Baja el fuego, tapa el sartén y deja que la cebolla sude y el pollo se termine de cocer en sus propios jugos.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800",
        "timer": { "name": "Sudar", "minutes": 15 }
      },
      {
        "title": "La Crema y el Loroco",
        "description": "Destapa el sartén, agrega la taza de crema y mezcla bien. Inmediatamente echa el loroco fresco esparcido por toda la crema. Deja calentar a fuego muy bajo sin que hierva fuerte para que la crema no se corte.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800",
        "timer": { "name": "Infundir loroco", "minutes": 5 }
      }
    ]
  },
  {
    "id": "tayuyos-1",
    "title": "Tayuyos Tradicionales",
    "description": "Tortillas de masa de maíz más gruesas de lo normal, que esconden en su centro un corazón oscuro de frijoles volteados o chicharrón molido. Son el desayuno de campeones en el altiplano guatemalteco.",
    "basePortions": 8,
    "category": "Desayuno / Acompañamiento",
    "difficulty": "Media",
    "prepTime": "20 min",
    "cookTime": "15 min",
    "temperature": "Comal muy caliente",
    "rating": 4.4,
    "author": "Altiplano Central",
    "utensils": ["Comal de barro o hierro", "Plástico limpio para palmear"],
    "tips": "El frijol debe estar excepcionalmente espeso (duro) para que no rompa la masa al momento de palmear la tortilla. Humedece ligeramente tus dedos con agua para cerrar las grietas de la masa.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Masa de maíz fina", "qty": 1.5, "unit": "lb", "price": 8.00, "store": "Molino" },
      { "name": "Frijoles negros muy volteados (fritos y espesos)", "qty": 1, "unit": "taza", "price": 5.00, "store": "Casa" },
      { "name": "Chicharrón de cerdo molido (opcional, para mixtos)", "qty": 0.5, "unit": "taza", "price": 8.00, "store": "Carnicería" },
      { "name": "Manteca de cerdo o aceite", "qty": 2, "unit": "cda", "price": 2.00, "store": "Casa" },
      { "name": "Sal", "qty": 1, "unit": "cda", "price": 0.50, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "Amasado",
        "description": "Amasa la masa de maíz con un poco de sal, agua tibia y las dos cucharadas de manteca derretida para darle más flexibilidad y sabor.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "El Relleno",
        "description": "Toma una bola de masa grande, haz un hueco en el centro con tu pulgar, parecido a un pequeño tazón. Rellena el hueco con frijol espeso (o chicharrón). Cierra la masa sobre el relleno pellizcándola.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "El Palmeo y Cocción",
        "description": "Usando un trozo de plástico (como de bolsa limpia) o tus manos mojadas, palmea suavemente la bola hasta aplanarla en forma de tortilla gruesa, con cuidado de no exponer el frijol. Ponla en el comal bien caliente.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      },
      {
        "title": "Dar Vuelta",
        "description": "Voltea el tayuyo cuando los bordes cambien de color. Debe quedar con costras tostadas por fuera pero suave y húmedo por dentro.",
        "imageUrl": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
        "timer": { "name": "Cocer al comal", "minutes": 8 }
      }
    ]
  },
  {
    "id": "tortillas-harina-1",
    "title": "Tortillas de Harina (Estilo Puerto Barrios)",
    "description": "A diferencia de la pequeña tortilla del centro del país, en el caribe guatemalteco dominan estas gigantes, delgadas y elásticas tortillas de harina de trigo, base indispensable para las 'baleadas' o para acompañar frijoles fritos y coco.",
    "basePortions": 10,
    "category": "Acompañamiento",
    "difficulty": "Media",
    "prepTime": "45 min",
    "cookTime": "15 min",
    "temperature": "Comal a fuego medio",
    "rating": 4.7,
    "author": "Izabal",
    "utensils": ["Comal grande", "Rodillo", "Tazón grande", "Paño limpio"],
    "tips": "El éxito está en el reposo. La masa debe descansar al menos 30 minutos cubierta con un paño para que el gluten se relaje; si no lo haces, la masa se encogerá al estirarla como un elástico.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Harina de trigo suave", "qty": 1, "unit": "lb", "price": 8.00, "store": "Supermercado" },
      { "name": "Manteca vegetal (o aceite o aceite de coco)", "qty": 0.25, "unit": "taza", "price": 4.00, "store": "Abarrotería" },
      { "name": "Polvo de hornear (royal)", "qty": 1, "unit": "cucharadita", "price": 1.00, "store": "Casa" },
      { "name": "Sal", "qty": 1, "unit": "cucharadita", "price": 0.50, "store": "Casa" },
      { "name": "Leche tibia (o agua tibia)", "qty": 0.75, "unit": "taza", "price": 3.00, "store": "Casa" }
    ],
    "steps": [
      {
        "title": "La Mezcla Seca y Grasa",
        "description": "En un tazón, mezcla la harina, el polvo de hornear y la sal. Agrega la manteca vegetal y con las manos deshazla contra la harina hasta formar una textura arenosa.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "El Amasado y Reposo",
        "description": "Vierte la leche tibia poco a poco, amasando hasta que la masa ya no se pegue a las manos ni al tazón (unos 10 minutos de amasado). Forma bolas del tamaño de una pelota de golf. Úntalas con un poquito de aceite, cúbrelas con un paño y déjalas reposar.",
        "imageUrl": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800",
        "timer": { "name": "Reposo de masa", "minutes": 30 }
      },
      {
        "title": "Estirado",
        "description": "Toma una bola reposada. Estírala sobre una superficie ligeramente enharinada usando un rodillo (o usando los nudillos y estirando los bordes con los dedos) hasta que quede muy, muy delgada y grande.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "Al Comal",
        "description": "Coloca la tortilla extendida en el comal caliente. En segundos empezarán a salir burbujas. Voltéala inmediatamente. Cocínala unos segundos más por el otro lado. Guárdalas en una servilleta de tela gruesa para que no se resequen.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
      }
    ]
  },
  {
    "id": "dobladas-queso-1",
    "title": "Dobladas Tradicionales",
    "description": "Básicamente la empanada frita guatemalteca, pero de masa de maíz. Consiste en tortillas rellenas de queso, papa o carne, dobladas por la mitad, selladas y fritas en abundante aceite hasta quedar crujientes. Servidas con repollo y salsa de tomate.",
    "basePortions": 10,
    "category": "Antojito",
    "difficulty": "Fácil",
    "prepTime": "20 min",
    "cookTime": "15 min",
    "temperature": "Fritura caliente",
    "rating": 4.5,
    "author": "Antojitos de Feria",
    "utensils": ["Prensa para tortillas (opcional)", "Sartén", "Plástico"],
    "tips": "El relleno no debe estar jugoso, si usas carne cocínala bien seca. Si usas queso fresco, asegúrate de desmoronarlo bien. Para que no se abran en el aceite, presiona firmemente los bordes.",
    "isPublic": true,
    "isContestEntry": false,
    "ingredients": [
      { "name": "Masa de maíz", "qty": 1.5, "unit": "lb", "price": 8.00, "store": "Molino" },
      { "name": "Queso fresco (desmoronado) o Quesillo", "qty": 1, "unit": "lb", "price": 15.00, "store": "Lácteos" },
      { "name": "Papa cocida machacada con cebolla picada", "qty": 1, "unit": "taza", "price": 5.00, "store": "Mercado" },
      { "name": "Aceite para freír", "qty": 2, "unit": "tazas", "price": 10.00, "store": "Supermercado" },
      { "name": "Repollo picado y salsa de tomate (para acompañar)", "qty": 1, "unit": "mix", "price": 8.00, "store": "Mercado" }
    ],
    "steps": [
      {
        "title": "La Tortilla Fina",
        "description": "Haz una bola de masa. Usando una tortillera de metal y dos trozos de plástico, aplasta la bola hasta formar una tortilla delgada y uniforme.",
        "imageUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800"
      },
      {
        "title": "Rellenar y Doblar",
        "description": "Aún sobre el plástico, pon una cucharada de la papa o el queso en el centro de la tortilla. Con ayuda del plástico, levanta un lado de la tortilla y dóblalo sobre el otro, formando una media luna. Presiona los bordes para sellar.",
        "imageUrl": "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=800"
      },
      {
        "title": "Freír Crujiente",
        "description": "Desprende el plástico con cuidado. Desliza la doblada en el aceite bien caliente. Fríe de ambos lados hasta que la masa quede dorada y súper crujiente.",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
        "timer": { "name": "Freír dobladas", "minutes": 6 }
      },
      {
        "title": "Servicio Callejero",
        "description": "Escúrrelas paradas sobre papel. Sírvelas acostadas, cúbrelas con curtido de repollo blanco, báñalas en salsa de tomate rojo y espolvorea queso seco por encima.",
        "imageUrl": "https://images.unsplash.com/photo-1587339144367-f1cac9c17e58?q=80&w=800"
      }
    ]
  }
];

const filePath = 'src/lib/data/recipes.json';
const data = fs.readFileSync(filePath, 'utf8');
let currentRecipes = [];
try {
  currentRecipes = JSON.parse(data);
} catch (e) {
  console.error("Error parsing JSON:", e);
}

const newIds = newRecipes.map(r => r.id);
const filteredCurrent = currentRecipes.filter(r => !newIds.includes(r.id));
const combined = [...filteredCurrent, ...newRecipes];

fs.writeFileSync(filePath, JSON.stringify(combined, null, 2));
console.log(`Successfully appended batch 3. Total recipes now: ${combined.length}`);
